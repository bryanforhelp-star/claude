#!/usr/bin/env python3
"""
YouTube Niche Scraper — Uses YouTube Data API v3 to pull real channel
and video data for competitor analysis and niche opportunity scoring.

Usage:
    # Search for channels in a niche
    python3 scripts/youtube_scraper.py search "court case documentary"

    # Analyze a specific channel by handle or ID
    python3 scripts/youtube_scraper.py channel @fern-tv
    python3 scripts/youtube_scraper.py channel UCODHrzPMGbNv67e84WDZhQQ

    # Compare multiple niches (searches each, compares stats)
    python3 scripts/youtube_scraper.py compare "betrayal revenge story" "court case documentary" "AI tools tutorial" "english learning"

    # Export channel video data for Step 1 analysis
    python3 scripts/youtube_scraper.py videos @fern-tv --limit 50

Setup:
    1. Go to https://console.cloud.google.com/
    2. Create a project (or select existing)
    3. Enable "YouTube Data API v3"
    4. Create an API key (APIs & Services > Credentials > Create Credentials > API Key)
    5. Set the key: export YOUTUBE_API_KEY="your-key-here"

Quota: 10,000 units/day free. Each search = 100 units, each channel = 5 units,
each video list = 3 units. This script is designed to stay well within limits.
"""

import argparse
import csv
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


def get_api_key():
    key = os.environ.get("YOUTUBE_API_KEY")
    if not key:
        print("ERROR: YOUTUBE_API_KEY environment variable not set.")
        print()
        print("Setup instructions:")
        print("  1. Go to https://console.cloud.google.com/")
        print("  2. Create a project (or select existing)")
        print("  3. Enable 'YouTube Data API v3'")
        print("  4. Create an API key (APIs & Services > Credentials)")
        print("  5. Run: export YOUTUBE_API_KEY='your-key-here'")
        sys.exit(1)
    return key


def build_youtube(api_key):
    return build("youtube", "v3", developerKey=api_key)


def format_number(n):
    """Format large numbers for display."""
    if n is None:
        return "N/A"
    n = int(n)
    if n >= 1_000_000_000:
        return f"{n / 1_000_000_000:.1f}B"
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K"
    return str(n)


def parse_duration(duration_str):
    """Parse ISO 8601 duration to seconds."""
    import re
    match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', duration_str)
    if not match:
        return 0
    hours = int(match.group(1) or 0)
    minutes = int(match.group(2) or 0)
    seconds = int(match.group(3) or 0)
    return hours * 3600 + minutes * 60 + seconds


def get_channel_id_from_handle(youtube, handle):
    """Resolve a @handle to a channel ID."""
    handle = handle.lstrip("@")
    try:
        resp = youtube.channels().list(
            part="id",
            forHandle=handle
        ).execute()
        if resp.get("items"):
            return resp["items"][0]["id"]
    except HttpError:
        pass

    # Fallback: search for the handle
    resp = youtube.search().list(
        part="snippet",
        q=handle,
        type="channel",
        maxResults=1
    ).execute()
    if resp.get("items"):
        return resp["items"][0]["snippet"]["channelId"]
    return None


def get_channel_stats(youtube, channel_id):
    """Get detailed channel statistics."""
    resp = youtube.channels().list(
        part="snippet,statistics,contentDetails,brandingSettings",
        id=channel_id
    ).execute()
    if not resp.get("items"):
        return None
    return resp["items"][0]


def get_channel_videos(youtube, channel_id, limit=50):
    """Get recent videos from a channel with their stats."""
    # Get uploads playlist
    channel = youtube.channels().list(
        part="contentDetails",
        id=channel_id
    ).execute()

    if not channel.get("items"):
        return []

    uploads_id = channel["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    # Get video IDs from uploads playlist
    video_ids = []
    next_page = None
    while len(video_ids) < limit:
        batch_size = min(50, limit - len(video_ids))
        resp = youtube.playlistItems().list(
            part="contentDetails",
            playlistId=uploads_id,
            maxResults=batch_size,
            pageToken=next_page
        ).execute()

        for item in resp.get("items", []):
            video_ids.append(item["contentDetails"]["videoId"])

        next_page = resp.get("nextPageToken")
        if not next_page:
            break

    # Get video details in batches of 50
    videos = []
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i:i+50]
        resp = youtube.videos().list(
            part="snippet,statistics,contentDetails",
            id=",".join(batch)
        ).execute()
        videos.extend(resp.get("items", []))

    return videos


def search_channels(youtube, query, max_results=15):
    """Search for channels matching a query."""
    resp = youtube.search().list(
        part="snippet",
        q=query,
        type="channel",
        maxResults=max_results,
        order="relevance"
    ).execute()

    channel_ids = [item["snippet"]["channelId"] for item in resp.get("items", [])]

    if not channel_ids:
        return []

    # Get full stats for each channel
    channels = []
    resp = youtube.channels().list(
        part="snippet,statistics",
        id=",".join(channel_ids)
    ).execute()

    for item in resp.get("items", []):
        channels.append(item)

    return channels


def analyze_channel(youtube, channel_identifier):
    """Full channel analysis with video-level data."""
    # Resolve handle to ID if needed
    if channel_identifier.startswith("@") or not channel_identifier.startswith("UC"):
        channel_id = get_channel_id_from_handle(youtube, channel_identifier)
        if not channel_id:
            print(f"ERROR: Could not find channel: {channel_identifier}")
            return
    else:
        channel_id = channel_identifier

    # Get channel stats
    channel = get_channel_stats(youtube, channel_id)
    if not channel:
        print(f"ERROR: Could not fetch channel data for: {channel_id}")
        return

    snippet = channel["snippet"]
    stats = channel["statistics"]

    print("=" * 70)
    print(f"CHANNEL: {snippet['title']}")
    print(f"Handle: @{snippet.get('customUrl', 'N/A')}")
    print(f"Created: {snippet['publishedAt'][:10]}")
    print(f"Description: {snippet.get('description', '')[:200]}...")
    print("-" * 70)
    print(f"Subscribers:  {format_number(stats.get('subscriberCount'))}")
    print(f"Total Views:  {format_number(stats.get('viewCount'))}")
    print(f"Total Videos: {stats.get('videoCount', 'N/A')}")

    total_views = int(stats.get("viewCount", 0))
    total_videos = int(stats.get("videoCount", 0))
    total_subs = int(stats.get("subscriberCount", 0))

    if total_videos > 0:
        print(f"Avg Views/Video: {format_number(total_views // total_videos)}")
    if total_subs > 0:
        print(f"Views/Sub Ratio: {total_views / total_subs:.1f}x")

    # Get recent videos
    print("\n" + "=" * 70)
    print("RECENT VIDEOS (last 50)")
    print("=" * 70)

    videos = get_channel_videos(youtube, channel_id, limit=50)

    if not videos:
        print("No videos found.")
        return

    # Analyze videos
    video_data = []
    for v in videos:
        vsnip = v["snippet"]
        vstats = v.get("statistics", {})
        duration = parse_duration(v["contentDetails"].get("duration", "PT0S"))

        views = int(vstats.get("viewCount", 0))
        likes = int(vstats.get("likeCount", 0))
        comments = int(vstats.get("commentCount", 0))
        published = vsnip["publishedAt"][:10]

        video_data.append({
            "title": vsnip["title"],
            "views": views,
            "likes": likes,
            "comments": comments,
            "duration_sec": duration,
            "published": published,
            "id": v["id"]
        })

    # Sort by views descending
    video_data.sort(key=lambda x: x["views"], reverse=True)

    # Calculate stats
    view_counts = [v["views"] for v in video_data]
    avg_views = sum(view_counts) // len(view_counts) if view_counts else 0
    median_views = sorted(view_counts)[len(view_counts) // 2] if view_counts else 0
    max_views = max(view_counts) if view_counts else 0
    min_views = min(view_counts) if view_counts else 0

    durations = [v["duration_sec"] for v in video_data if v["duration_sec"] > 0]
    avg_duration = sum(durations) // len(durations) if durations else 0

    print(f"\nView Stats (last {len(video_data)} videos):")
    print(f"  Average:  {format_number(avg_views)}")
    print(f"  Median:   {format_number(median_views)}")
    print(f"  Max:      {format_number(max_views)}")
    print(f"  Min:      {format_number(min_views)}")
    print(f"  Avg Duration: {avg_duration // 60}m {avg_duration % 60}s")

    # Breakout ratio
    breakout_threshold = avg_views * 3
    breakouts = [v for v in video_data if v["views"] >= breakout_threshold]
    print(f"\n  Breakout Videos (3x+ avg): {len(breakouts)} / {len(video_data)} ({len(breakouts)*100//len(video_data)}%)")

    # Upload frequency
    dates = sorted([v["published"] for v in video_data])
    if len(dates) >= 2:
        first = datetime.strptime(dates[0], "%Y-%m-%d")
        last = datetime.strptime(dates[-1], "%Y-%m-%d")
        span_days = max((last - first).days, 1)
        vids_per_week = len(video_data) / (span_days / 7)
        print(f"  Upload Frequency: {vids_per_week:.1f} videos/week")

    # Top 10 videos
    print(f"\nTOP 10 VIDEOS:")
    print(f"{'Views':>10}  {'Likes':>8}  {'Dur':>6}  {'Date':>12}  Title")
    print("-" * 100)
    for v in video_data[:10]:
        dur_str = f"{v['duration_sec']//60}:{v['duration_sec']%60:02d}"
        title = v["title"][:55]
        print(f"{format_number(v['views']):>10}  {format_number(v['likes']):>8}  {dur_str:>6}  {v['published']:>12}  {title}")

    # Bottom 5 videos
    print(f"\nBOTTOM 5 VIDEOS:")
    for v in video_data[-5:]:
        dur_str = f"{v['duration_sec']//60}:{v['duration_sec']%60:02d}"
        title = v["title"][:55]
        print(f"{format_number(v['views']):>10}  {format_number(v['likes']):>8}  {dur_str:>6}  {v['published']:>12}  {title}")

    # Title analysis
    print(f"\nTITLE PATTERNS:")
    word_counts = [len(v["title"].split()) for v in video_data]
    avg_words = sum(word_counts) / len(word_counts)
    print(f"  Avg Title Length: {avg_words:.1f} words")

    # Check for common patterns
    caps_titles = sum(1 for v in video_data if sum(1 for c in v["title"] if c.isupper()) > len(v["title"]) * 0.3)
    question_titles = sum(1 for v in video_data if "?" in v["title"])
    number_titles = sum(1 for v in video_data if any(c.isdigit() for c in v["title"]))

    print(f"  Heavy CAPS titles: {caps_titles} ({caps_titles*100//len(video_data)}%)")
    print(f"  Question titles: {question_titles} ({question_titles*100//len(video_data)}%)")
    print(f"  Titles with numbers: {number_titles} ({number_titles*100//len(video_data)}%)")

    return video_data


def export_videos_csv(youtube, channel_identifier, limit=50, output_file=None):
    """Export channel videos to CSV for Step 1 analysis."""
    if channel_identifier.startswith("@") or not channel_identifier.startswith("UC"):
        channel_id = get_channel_id_from_handle(youtube, channel_identifier)
        if not channel_id:
            print(f"ERROR: Could not find channel: {channel_identifier}")
            return
    else:
        channel_id = channel_identifier

    channel = get_channel_stats(youtube, channel_id)
    if not channel:
        print(f"ERROR: Could not fetch channel: {channel_id}")
        return

    channel_name = channel["snippet"]["title"]
    videos = get_channel_videos(youtube, channel_id, limit=limit)

    if not output_file:
        safe_name = "".join(c if c.isalnum() or c in "-_ " else "" for c in channel_name)
        output_file = f"data/{safe_name.strip().replace(' ', '_')}_videos.csv"

    os.makedirs(os.path.dirname(output_file) if os.path.dirname(output_file) else "data", exist_ok=True)

    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Video Title", "View Count", "Likes", "Comments", "Duration (sec)", "Published Date", "Video ID"])
        for v in videos:
            vstats = v.get("statistics", {})
            duration = parse_duration(v["contentDetails"].get("duration", "PT0S"))
            writer.writerow([
                v["snippet"]["title"],
                vstats.get("viewCount", 0),
                vstats.get("likeCount", 0),
                vstats.get("commentCount", 0),
                duration,
                v["snippet"]["publishedAt"][:10],
                v["id"]
            ])

    print(f"Exported {len(videos)} videos to: {output_file}")
    print(f"Channel: {channel_name}")
    print(f"\nThis CSV can be used directly with the Step 1 Channel Analysis Prompt.")
    return output_file


def compare_niches(youtube, queries):
    """Compare multiple niche searches side by side."""
    print("=" * 90)
    print("NICHE COMPARISON")
    print("=" * 90)

    results = []

    for query in queries:
        print(f"\nSearching: '{query}'...")
        channels = search_channels(youtube, query, max_results=10)

        if not channels:
            print(f"  No channels found for '{query}'")
            results.append({"query": query, "channels": 0})
            continue

        subs = []
        views = []
        video_counts = []

        for ch in channels:
            s = ch.get("statistics", {})
            sub_count = int(s.get("subscriberCount", 0))
            view_count = int(s.get("viewCount", 0))
            vid_count = int(s.get("videoCount", 0))
            if sub_count > 0:
                subs.append(sub_count)
            if view_count > 0:
                views.append(view_count)
            if vid_count > 0:
                video_counts.append(vid_count)

        avg_subs = sum(subs) // len(subs) if subs else 0
        avg_views = sum(views) // len(views) if views else 0
        median_subs = sorted(subs)[len(subs) // 2] if subs else 0
        total_channels = len(channels)

        # Check for small channels (opportunity signal)
        small_channels = sum(1 for s in subs if s < 100_000)
        big_channels = sum(1 for s in subs if s >= 1_000_000)

        avg_vids = sum(video_counts) // len(video_counts) if video_counts else 0
        avg_views_per_vid = avg_views // avg_vids if avg_vids > 0 else 0

        result = {
            "query": query,
            "channels": total_channels,
            "avg_subs": avg_subs,
            "median_subs": median_subs,
            "avg_views": avg_views,
            "avg_views_per_vid": avg_views_per_vid,
            "small_channels": small_channels,
            "big_channels": big_channels,
            "top_channel": max(channels, key=lambda c: int(c.get("statistics", {}).get("subscriberCount", 0))),
        }
        results.append(result)

        # Print top channels for this niche
        sorted_channels = sorted(channels, key=lambda c: int(c.get("statistics", {}).get("subscriberCount", 0)), reverse=True)
        print(f"\n  Top channels for '{query}':")
        for ch in sorted_channels[:5]:
            s = ch.get("statistics", {})
            name = ch["snippet"]["title"]
            print(f"    {name:40s}  Subs: {format_number(s.get('subscriberCount')):>8}  Views: {format_number(s.get('viewCount')):>8}  Videos: {s.get('videoCount', 'N/A'):>6}")

    # Summary comparison table
    print("\n" + "=" * 90)
    print("COMPARISON SUMMARY")
    print("=" * 90)
    print(f"{'Niche':<35} {'Channels':>8} {'Avg Subs':>10} {'Med Subs':>10} {'Avg Views':>10} {'Views/Vid':>10} {'<100K':>6} {'>1M':>5}")
    print("-" * 90)

    for r in results:
        if "avg_subs" in r:
            print(f"{r['query']:<35} {r['channels']:>8} {format_number(r['avg_subs']):>10} {format_number(r['median_subs']):>10} {format_number(r['avg_views']):>10} {format_number(r['avg_views_per_vid']):>10} {r['small_channels']:>6} {r['big_channels']:>5}")

    # Opportunity analysis
    print("\n" + "=" * 90)
    print("OPPORTUNITY SIGNALS")
    print("=" * 90)
    for r in results:
        if "avg_subs" not in r:
            continue
        signals = []
        if r["small_channels"] >= 7:
            signals.append("HIGH opportunity — mostly small channels, room to grow")
        elif r["small_channels"] >= 4:
            signals.append("MODERATE opportunity — mix of established and growing channels")
        else:
            signals.append("COMPETITIVE — dominated by large established channels")

        if r["avg_views_per_vid"] > 500_000:
            signals.append("HIGH view potential per video")
        elif r["avg_views_per_vid"] > 100_000:
            signals.append("GOOD view potential per video")

        print(f"\n  {r['query']}:")
        for s in signals:
            print(f"    → {s}")


def cmd_search(args):
    youtube = build_youtube(get_api_key())
    channels = search_channels(youtube, args.query, max_results=args.limit)

    print(f"\nSearch results for: '{args.query}'")
    print(f"{'Channel':<40} {'Subs':>10} {'Views':>10} {'Videos':>8}")
    print("-" * 70)

    sorted_channels = sorted(channels, key=lambda c: int(c.get("statistics", {}).get("subscriberCount", 0)), reverse=True)
    for ch in sorted_channels:
        s = ch.get("statistics", {})
        print(f"{ch['snippet']['title']:<40} {format_number(s.get('subscriberCount')):>10} {format_number(s.get('viewCount')):>10} {s.get('videoCount', 'N/A'):>8}")


def cmd_channel(args):
    youtube = build_youtube(get_api_key())
    analyze_channel(youtube, args.channel)


def cmd_videos(args):
    youtube = build_youtube(get_api_key())
    export_videos_csv(youtube, args.channel, limit=args.limit, output_file=args.output)


def cmd_compare(args):
    youtube = build_youtube(get_api_key())
    compare_niches(youtube, args.niches)


def main():
    parser = argparse.ArgumentParser(
        description="YouTube Niche Scraper — Pull real data for channel analysis",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # Search command
    p_search = subparsers.add_parser("search", help="Search for channels in a niche")
    p_search.add_argument("query", help="Search query (e.g., 'court case documentary')")
    p_search.add_argument("--limit", type=int, default=15, help="Max results (default: 15)")
    p_search.set_defaults(func=cmd_search)

    # Channel command
    p_channel = subparsers.add_parser("channel", help="Analyze a specific channel")
    p_channel.add_argument("channel", help="Channel handle (@name) or ID (UCxxx)")
    p_channel.set_defaults(func=cmd_channel)

    # Videos command
    p_videos = subparsers.add_parser("videos", help="Export channel videos to CSV")
    p_videos.add_argument("channel", help="Channel handle (@name) or ID (UCxxx)")
    p_videos.add_argument("--limit", type=int, default=50, help="Number of videos (default: 50)")
    p_videos.add_argument("--output", help="Output CSV file path")
    p_videos.set_defaults(func=cmd_videos)

    # Compare command
    p_compare = subparsers.add_parser("compare", help="Compare multiple niches")
    p_compare.add_argument("niches", nargs="+", help="Niche search queries to compare")
    p_compare.set_defaults(func=cmd_compare)

    args = parser.parse_args()
    if not args.command:
        parser.print_help()
        sys.exit(1)

    args.func(args)


if __name__ == "__main__":
    main()
