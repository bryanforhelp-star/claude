#!/usr/bin/env python3
"""
YouTube Niche Scraper — Uses YouTube Data API v3 via direct HTTP requests.
Bypasses SSL issues in restricted environments.

Usage:
    python3 scripts/youtube_scraper.py search "court case documentary"
    python3 scripts/youtube_scraper.py channel @fern-tv
    python3 scripts/youtube_scraper.py compare "betrayal revenge" "court drama" "AI tools" "english learning"
    python3 scripts/youtube_scraper.py videos @fern-tv --limit 50
"""

import argparse
import csv
import json
import os
import re
import ssl
import sys
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime


API_BASE = "https://www.googleapis.com/youtube/v3"


def get_api_key():
    key = os.environ.get("YOUTUBE_API_KEY")
    if not key:
        print("ERROR: Set YOUTUBE_API_KEY environment variable.")
        print("  export YOUTUBE_API_KEY='your-key-here'")
        sys.exit(1)
    return key


# Create SSL context that skips verification (for sandboxed environments)
SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE


def api_get(endpoint, params):
    """Make a GET request to the YouTube API."""
    params["key"] = get_api_key()
    url = f"{API_BASE}/{endpoint}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url)
    try:
        with urllib.request.urlopen(req, context=SSL_CTX, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"API Error {e.code}: {body[:500]}")
        sys.exit(1)


def fmt(n):
    """Format large numbers."""
    if n is None: return "N/A"
    n = int(n)
    if n >= 1_000_000_000: return f"{n/1e9:.1f}B"
    if n >= 1_000_000: return f"{n/1e6:.1f}M"
    if n >= 1_000: return f"{n/1e3:.1f}K"
    return str(n)


def parse_duration(d):
    """Parse ISO 8601 duration to seconds."""
    m = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', d or '')
    if not m: return 0
    return int(m.group(1) or 0)*3600 + int(m.group(2) or 0)*60 + int(m.group(3) or 0)


def resolve_handle(handle):
    """Resolve @handle to channel ID."""
    handle = handle.lstrip("@")
    # Try forHandle first
    data = api_get("channels", {"part": "id", "forHandle": handle})
    if data.get("items"):
        return data["items"][0]["id"]
    # Fallback to search
    data = api_get("search", {"part": "snippet", "q": handle, "type": "channel", "maxResults": 1})
    if data.get("items"):
        return data["items"][0]["snippet"]["channelId"]
    return None


def get_channel(channel_id):
    """Get channel details."""
    data = api_get("channels", {"part": "snippet,statistics,contentDetails", "id": channel_id})
    return data["items"][0] if data.get("items") else None


def get_videos(channel_id, limit=50):
    """Get recent videos with stats."""
    ch = api_get("channels", {"part": "contentDetails", "id": channel_id})
    if not ch.get("items"): return []
    uploads = ch["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    video_ids = []
    page = None
    while len(video_ids) < limit:
        params = {"part": "contentDetails", "playlistId": uploads, "maxResults": min(50, limit - len(video_ids))}
        if page: params["pageToken"] = page
        data = api_get("playlistItems", params)
        for item in data.get("items", []):
            video_ids.append(item["contentDetails"]["videoId"])
        page = data.get("nextPageToken")
        if not page: break

    videos = []
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i:i+50]
        data = api_get("videos", {"part": "snippet,statistics,contentDetails", "id": ",".join(batch)})
        videos.extend(data.get("items", []))
    return videos


def search_channels(query, max_results=15):
    """Search for channels."""
    data = api_get("search", {"part": "snippet", "q": query, "type": "channel", "maxResults": max_results, "order": "relevance"})
    ids = [item["snippet"]["channelId"] for item in data.get("items", [])]
    if not ids: return []
    data = api_get("channels", {"part": "snippet,statistics", "id": ",".join(ids)})
    return data.get("items", [])


# ─── COMMANDS ───────────────────────────────────────────────────────

def cmd_search(args):
    channels = search_channels(args.query, args.limit)
    channels.sort(key=lambda c: int(c.get("statistics", {}).get("subscriberCount", 0)), reverse=True)

    print(f"\nSearch: '{args.query}' — {len(channels)} channels found")
    print(f"{'Channel':<45} {'Subs':>10} {'Views':>12} {'Videos':>7}")
    print("-" * 78)
    for ch in channels:
        s = ch.get("statistics", {})
        print(f"{ch['snippet']['title'][:44]:<45} {fmt(s.get('subscriberCount')):>10} {fmt(s.get('viewCount')):>12} {s.get('videoCount','?'):>7}")


def cmd_channel(args):
    cid = args.channel
    if cid.startswith("@") or not cid.startswith("UC"):
        cid = resolve_handle(cid)
        if not cid:
            print(f"ERROR: Channel not found: {args.channel}")
            return

    ch = get_channel(cid)
    if not ch:
        print(f"ERROR: Could not fetch channel: {cid}")
        return

    snip = ch["snippet"]
    stats = ch["statistics"]
    total_views = int(stats.get("viewCount", 0))
    total_vids = int(stats.get("videoCount", 0))
    total_subs = int(stats.get("subscriberCount", 0))

    print("=" * 70)
    print(f"CHANNEL: {snip['title']}")
    print(f"Created: {snip['publishedAt'][:10]}")
    print(f"Description: {snip.get('description','')[:150]}...")
    print("-" * 70)
    print(f"Subscribers:    {fmt(total_subs)}")
    print(f"Total Views:    {fmt(total_views)}")
    print(f"Total Videos:   {total_vids}")
    if total_vids > 0:
        print(f"Avg Views/Vid:  {fmt(total_views // total_vids)}")
    if total_subs > 0:
        print(f"Views/Sub:      {total_views / total_subs:.1f}x")

    # Videos
    print(f"\n{'='*70}\nRECENT VIDEOS (up to 50)\n{'='*70}")
    videos = get_videos(cid, limit=50)
    if not videos:
        print("No videos found.")
        return

    vdata = []
    for v in videos:
        vs = v.get("statistics", {})
        vdata.append({
            "title": v["snippet"]["title"],
            "views": int(vs.get("viewCount", 0)),
            "likes": int(vs.get("likeCount", 0)),
            "comments": int(vs.get("commentCount", 0)),
            "duration": parse_duration(v["contentDetails"].get("duration", "")),
            "published": v["snippet"]["publishedAt"][:10],
            "id": v["id"]
        })

    vdata.sort(key=lambda x: x["views"], reverse=True)
    view_list = [v["views"] for v in vdata]
    avg_v = sum(view_list) // len(view_list)
    med_v = sorted(view_list)[len(view_list)//2]
    durs = [v["duration"] for v in vdata if v["duration"] > 0]
    avg_dur = sum(durs) // len(durs) if durs else 0

    print(f"\nView Stats ({len(vdata)} videos):")
    print(f"  Average:    {fmt(avg_v)}")
    print(f"  Median:     {fmt(med_v)}")
    print(f"  Max:        {fmt(max(view_list))}")
    print(f"  Min:        {fmt(min(view_list))}")
    print(f"  Avg Length: {avg_dur//60}m {avg_dur%60}s")

    breakouts = [v for v in vdata if v["views"] >= avg_v * 3]
    print(f"  Breakouts (3x+ avg): {len(breakouts)}/{len(vdata)} ({len(breakouts)*100//len(vdata)}%)")

    dates = sorted(v["published"] for v in vdata)
    if len(dates) >= 2:
        d0 = datetime.strptime(dates[0], "%Y-%m-%d")
        d1 = datetime.strptime(dates[-1], "%Y-%m-%d")
        span = max((d1 - d0).days, 1)
        freq = len(vdata) / (span / 7)
        print(f"  Upload Freq: {freq:.1f} vids/week")

    print(f"\nTOP 10 VIDEOS:")
    print(f"{'Views':>10}  {'Likes':>8}  {'Dur':>6}  {'Date':>12}  Title")
    print("-" * 100)
    for v in vdata[:10]:
        d = f"{v['duration']//60}:{v['duration']%60:02d}"
        print(f"{fmt(v['views']):>10}  {fmt(v['likes']):>8}  {d:>6}  {v['published']:>12}  {v['title'][:55]}")

    print(f"\nBOTTOM 5 VIDEOS:")
    for v in vdata[-5:]:
        d = f"{v['duration']//60}:{v['duration']%60:02d}"
        print(f"{fmt(v['views']):>10}  {fmt(v['likes']):>8}  {d:>6}  {v['published']:>12}  {v['title'][:55]}")

    # Title analysis
    wc = [len(v["title"].split()) for v in vdata]
    caps = sum(1 for v in vdata if sum(c.isupper() for c in v["title"]) > len(v["title"])*0.3)
    qs = sum(1 for v in vdata if "?" in v["title"])
    nums = sum(1 for v in vdata if any(c.isdigit() for c in v["title"]))
    print(f"\nTITLE PATTERNS:")
    print(f"  Avg Length:    {sum(wc)/len(wc):.1f} words")
    print(f"  Heavy CAPS:   {caps} ({caps*100//len(vdata)}%)")
    print(f"  Questions:    {qs} ({qs*100//len(vdata)}%)")
    print(f"  With Numbers: {nums} ({nums*100//len(vdata)}%)")


def cmd_videos(args):
    cid = args.channel
    if cid.startswith("@") or not cid.startswith("UC"):
        cid = resolve_handle(cid)
        if not cid:
            print(f"ERROR: Channel not found: {args.channel}")
            return

    ch = get_channel(cid)
    if not ch: return
    name = ch["snippet"]["title"]
    videos = get_videos(cid, limit=args.limit)

    os.makedirs("data", exist_ok=True)
    safe = re.sub(r'[^\w\s-]', '', name).strip().replace(' ', '_')
    out = args.output or f"data/{safe}_videos.csv"

    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Video Title", "View Count", "Likes", "Comments", "Duration (sec)", "Published Date", "Video ID"])
        for v in videos:
            vs = v.get("statistics", {})
            w.writerow([
                v["snippet"]["title"],
                vs.get("viewCount", 0), vs.get("likeCount", 0), vs.get("commentCount", 0),
                parse_duration(v["contentDetails"].get("duration", "")),
                v["snippet"]["publishedAt"][:10], v["id"]
            ])

    print(f"Exported {len(videos)} videos to: {out}")
    print(f"Channel: {name}")
    print(f"\nUse this CSV with the Step 1 Channel Analysis Prompt.")


def cmd_compare(args):
    print("=" * 90)
    print("NICHE COMPARISON — Real YouTube Data")
    print("=" * 90)

    results = []
    for q in args.niches:
        print(f"\nSearching: '{q}'...")
        channels = search_channels(q, max_results=10)
        if not channels:
            print(f"  No channels found.")
            results.append({"query": q})
            continue

        subs = [int(c["statistics"].get("subscriberCount", 0)) for c in channels if int(c["statistics"].get("subscriberCount", 0)) > 0]
        views = [int(c["statistics"].get("viewCount", 0)) for c in channels if int(c["statistics"].get("viewCount", 0)) > 0]
        vids = [int(c["statistics"].get("videoCount", 0)) for c in channels if int(c["statistics"].get("videoCount", 0)) > 0]

        avg_subs = sum(subs)//len(subs) if subs else 0
        med_subs = sorted(subs)[len(subs)//2] if subs else 0
        avg_views = sum(views)//len(views) if views else 0
        avg_vids = sum(vids)//len(vids) if vids else 0
        avg_vpv = avg_views // avg_vids if avg_vids else 0

        small = sum(1 for s in subs if s < 100_000)
        big = sum(1 for s in subs if s >= 1_000_000)

        r = {"query": q, "n": len(channels), "avg_subs": avg_subs, "med_subs": med_subs,
             "avg_views": avg_views, "avg_vpv": avg_vpv, "small": small, "big": big}
        results.append(r)

        top = sorted(channels, key=lambda c: int(c["statistics"].get("subscriberCount", 0)), reverse=True)
        for ch in top[:5]:
            s = ch["statistics"]
            print(f"    {ch['snippet']['title'][:42]:<44} Subs:{fmt(s.get('subscriberCount')):>8}  Views:{fmt(s.get('viewCount')):>10}  Vids:{s.get('videoCount','?'):>6}")

    print(f"\n{'='*90}")
    print("SUMMARY")
    print(f"{'='*90}")
    print(f"{'Niche':<32} {'#Ch':>4} {'Avg Subs':>10} {'Med Subs':>10} {'Avg Views':>12} {'Views/Vid':>10} {'<100K':>6} {'>1M':>5}")
    print("-" * 90)
    for r in results:
        if "avg_subs" not in r: continue
        print(f"{r['query'][:31]:<32} {r['n']:>4} {fmt(r['avg_subs']):>10} {fmt(r['med_subs']):>10} {fmt(r['avg_views']):>12} {fmt(r['avg_vpv']):>10} {r['small']:>6} {r['big']:>5}")

    print(f"\n{'='*90}")
    print("OPPORTUNITY SIGNALS")
    print(f"{'='*90}")
    for r in results:
        if "avg_subs" not in r: continue
        print(f"\n  {r['query']}:")
        if r["small"] >= 7:
            print(f"    → HIGH opportunity — {r['small']}/{r['n']} channels under 100K subs")
        elif r["small"] >= 4:
            print(f"    → MODERATE opportunity — mix of small and established")
        else:
            print(f"    → COMPETITIVE — dominated by large channels ({r['big']} with 1M+)")
        if r["avg_vpv"] > 500_000:
            print(f"    → HIGH view potential: {fmt(r['avg_vpv'])} avg views/video")
        elif r["avg_vpv"] > 100_000:
            print(f"    → GOOD view potential: {fmt(r['avg_vpv'])} avg views/video")
        elif r["avg_vpv"] > 10_000:
            print(f"    → MODERATE view potential: {fmt(r['avg_vpv'])} avg views/video")
        else:
            print(f"    → LOW view potential: {fmt(r['avg_vpv'])} avg views/video")


def main():
    p = argparse.ArgumentParser(description="YouTube Niche Scraper")
    sp = p.add_subparsers(dest="cmd")

    s1 = sp.add_parser("search")
    s1.add_argument("query")
    s1.add_argument("--limit", type=int, default=15)

    s2 = sp.add_parser("channel")
    s2.add_argument("channel")

    s3 = sp.add_parser("videos")
    s3.add_argument("channel")
    s3.add_argument("--limit", type=int, default=50)
    s3.add_argument("--output")

    s4 = sp.add_parser("compare")
    s4.add_argument("niches", nargs="+")

    args = p.parse_args()
    if not args.cmd:
        p.print_help()
        sys.exit(1)

    {"search": cmd_search, "channel": cmd_channel, "videos": cmd_videos, "compare": cmd_compare}[args.cmd](args)


if __name__ == "__main__":
    main()
