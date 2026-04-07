#!/usr/bin/env python3
"""
YouTube Niche Scanner — Scans 30+ niches automatically, pulls real data
from YouTube API, and ranks them by opportunity score.

Usage:
    # Full scan across all built-in niches
    python3 scripts/niche_scanner.py scan

    # Scan specific niches only
    python3 scripts/niche_scanner.py scan --niches "cat facts" "dog training" "truck reviews"

    # Scan with more channels per niche (uses more API quota)
    python3 scripts/niche_scanner.py scan --depth 20

    # Deep dive: scan + pull top 3 channels' video data per niche
    python3 scripts/niche_scanner.py deep

    # Export everything to CSV
    python3 scripts/niche_scanner.py scan --csv results/niche_scan.csv

Setup:
    export YOUTUBE_API_KEY="your-key-here"

Quota: Each niche search = ~110 units. Full 30-niche scan = ~3,300 units.
Deep scan adds ~150 units per niche. You have 10,000/day free.
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
from datetime import datetime

API_BASE = "https://www.googleapis.com/youtube/v3"

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

# ─── Built-in niche queries to scan ─────────────────────────────────
# Each entry: (search_query, category_label, ai_production_score)
# ai_production_score: 1-5 how feasible is 100% AI production
#   5 = fully AI (text/slides/stock footage + AI voice)
#   4 = mostly AI (some custom graphics needed)
#   3 = partial AI (needs real footage or complex editing)
#   2 = hard to automate (needs real demos/footage)
#   1 = not suitable for AI production

BUILT_IN_NICHES = [
    # Animals / Pets
    ("cat facts interesting", "Pets - Cats", 5),
    ("dog training tips", "Pets - Dogs", 3),
    ("animal facts you didn't know", "Pets - Animal Facts", 5),
    ("ocean creatures deep sea", "Animals - Ocean/Nature", 5),

    # Cars / Auto
    ("toyota hidden features", "Auto - Toyota", 5),
    ("tesla news update", "Auto - Tesla", 5),
    ("BMW tips tricks", "Auto - BMW", 5),
    ("truck review comparison", "Auto - Trucks", 4),
    ("car facts you didn't know", "Auto - Car Facts", 5),

    # History
    ("history facts you didn't know", "History - General", 5),
    ("ancient civilization documentary", "History - Ancient", 5),
    ("world war documentary explained", "History - Wars", 5),
    ("history's biggest mysteries", "History - Mysteries", 5),

    # Celebrity / Drama / Pop Culture
    ("celebrity drama news exposed", "Celebrity Drama", 5),
    ("celebrity gossip explained", "Celebrity Gossip", 5),
    ("hollywood scandal exposed", "Hollywood Scandals", 5),
    ("rapper beef drama explained", "Hip-Hop Drama", 5),

    # Facts / Lists / Explainers
    ("facts you didn't know", "Facts - General", 5),
    ("top 10 interesting facts", "Facts - Top 10 Lists", 5),
    ("things you didn't know existed", "Facts - Mind-Blowing", 5),
    ("comparison video how much", "Facts - Comparisons", 5),

    # Stories / Narratives
    ("scary story creepypasta narration", "Stories - Horror", 5),
    ("true scary stories narrated", "Stories - True Scary", 5),
    ("revenge story narrated", "Stories - Revenge", 5),
    ("reddit stories narrated", "Stories - Reddit", 5),

    # Children / Kids
    ("kids learning videos", "Kids - Educational", 4),
    ("children nursery rhymes animation", "Kids - Nursery Rhymes", 3),
    ("kids science experiments fun", "Kids - Science", 3),

    # Finance / Money
    ("personal finance tips beginner", "Finance - Personal", 5),
    ("make money online 2026", "Finance - MMO", 5),
    ("passive income ideas", "Finance - Passive Income", 5),
    ("crypto explained beginner", "Finance - Crypto", 5),

    # Technology / AI
    ("AI tools tutorial review", "Tech - AI Tools", 5),
    ("tech gadget review 2026", "Tech - Gadgets", 3),
    ("no code automation tutorial", "Tech - No-Code", 5),

    # Self-improvement
    ("stoicism philosophy explained", "Self-Improvement - Stoicism", 5),
    ("productivity tips motivation", "Self-Improvement - Productivity", 5),

    # Health / Wellness
    ("health tips you didn't know", "Health - General", 5),
    ("weight loss tips science", "Health - Weight Loss", 4),

    # Gaming
    ("gaming facts you didn't know", "Gaming - Facts", 5),
    ("game lore explained", "Gaming - Lore", 5),

    # World / Geography / Travel
    ("country facts you didn't know", "Geography - Country Facts", 5),
    ("places you won't believe exist", "Geography - Places", 5),

    # Crime / Legal
    ("true crime documentary case", "Crime - True Crime", 5),
    ("court case explained legal", "Crime - Legal Drama", 5),

    # Military / Geopolitics
    ("military technology explained", "Military - Tech", 5),
    ("geopolitics explained conflict", "Military - Geopolitics", 5),

    # Food
    ("food facts you didn't know", "Food - Facts", 5),
    ("restaurant review exposed", "Food - Reviews", 3),

    # Space / Science
    ("space facts universe", "Science - Space", 5),
    ("science explained simply", "Science - Explainers", 5),
]


def get_api_key():
    key = os.environ.get("YOUTUBE_API_KEY")
    if not key:
        print("ERROR: Set YOUTUBE_API_KEY")
        print("  export YOUTUBE_API_KEY='your-key-here'")
        sys.exit(1)
    return key


def api_get(endpoint, params):
    params["key"] = get_api_key()
    url = f"{API_BASE}/{endpoint}?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(urllib.request.Request(url), context=SSL_CTX, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            err = json.loads(body)
            reason = err.get("error", {}).get("message", body[:200])
        except Exception:
            reason = body[:200]
        print(f"  API Error {e.code}: {reason}")
        return None


def fmt(n):
    if n is None: return "N/A"
    n = int(n)
    if n >= 1_000_000_000: return f"{n/1e9:.1f}B"
    if n >= 1_000_000: return f"{n/1e6:.1f}M"
    if n >= 1_000: return f"{n/1e3:.1f}K"
    return str(n)


def scan_niche(query, max_channels=10):
    """Search for channels in a niche and return aggregated stats."""
    data = api_get("search", {
        "part": "snippet", "q": query, "type": "channel",
        "maxResults": max_channels, "order": "relevance"
    })
    if not data or not data.get("items"):
        return None

    channel_ids = [item["snippet"]["channelId"] for item in data["items"]]
    ch_data = api_get("channels", {
        "part": "snippet,statistics",
        "id": ",".join(channel_ids)
    })
    if not ch_data or not ch_data.get("items"):
        return None

    channels = ch_data["items"]
    subs_list = []
    views_list = []
    vids_list = []
    channel_details = []

    for ch in channels:
        s = ch.get("statistics", {})
        subs = int(s.get("subscriberCount", 0))
        views = int(s.get("viewCount", 0))
        vids = int(s.get("videoCount", 0))

        if subs > 0:
            subs_list.append(subs)
        if views > 0:
            views_list.append(views)
        if vids > 0:
            vids_list.append(vids)

        created = ch["snippet"].get("publishedAt", "")[:10]
        age_days = 0
        if created:
            try:
                age_days = (datetime.now() - datetime.strptime(created, "%Y-%m-%d")).days
            except ValueError:
                pass

        channel_details.append({
            "name": ch["snippet"]["title"],
            "subs": subs,
            "views": views,
            "vids": vids,
            "created": created,
            "age_days": age_days,
            "views_per_vid": views // vids if vids > 0 else 0,
            "views_per_sub": views / subs if subs > 0 else 0,
        })

    if not subs_list:
        return None

    # Calculate stats
    avg_subs = sum(subs_list) // len(subs_list)
    med_subs = sorted(subs_list)[len(subs_list) // 2]
    avg_views = sum(views_list) // len(views_list) if views_list else 0
    avg_vids = sum(vids_list) // len(vids_list) if vids_list else 0
    avg_vpv = avg_views // avg_vids if avg_vids > 0 else 0

    under_100k = sum(1 for s in subs_list if s < 100_000)
    under_10k = sum(1 for s in subs_list if s < 10_000)
    over_1m = sum(1 for s in subs_list if s >= 1_000_000)

    # Find newest channels (under 2 years old) with decent subs
    young_successful = [c for c in channel_details if c["age_days"] < 730 and c["subs"] > 10_000]

    return {
        "n_channels": len(channels),
        "avg_subs": avg_subs,
        "med_subs": med_subs,
        "avg_views": avg_views,
        "avg_vids": avg_vids,
        "avg_vpv": avg_vpv,
        "under_100k": under_100k,
        "under_10k": under_10k,
        "over_1m": over_1m,
        "young_successful": len(young_successful),
        "top_channels": sorted(channel_details, key=lambda x: x["subs"], reverse=True)[:5],
        "all_channels": channel_details,
    }


def calculate_opportunity_score(stats, ai_score):
    """
    Calculate opportunity score (0-100) based on:
    - Views per video (demand signal)
    - % of small channels (entry difficulty)
    - Young successful channels (proof new channels can grow)
    - AI production feasibility
    """
    if not stats:
        return 0

    # Views per video score (0-30)
    vpv = stats["avg_vpv"]
    if vpv >= 500_000: vpv_score = 30
    elif vpv >= 100_000: vpv_score = 25
    elif vpv >= 50_000: vpv_score = 20
    elif vpv >= 20_000: vpv_score = 15
    elif vpv >= 10_000: vpv_score = 10
    elif vpv >= 5_000: vpv_score = 5
    else: vpv_score = 2

    # Competition score (0-25) — more small channels = easier entry
    small_pct = stats["under_100k"] / stats["n_channels"] if stats["n_channels"] > 0 else 0
    comp_score = int(small_pct * 25)

    # New channel success score (0-20)
    new_score = min(stats["young_successful"] * 7, 20)

    # AI production score (0-25)
    ai_prod_score = ai_score * 5

    total = vpv_score + comp_score + new_score + ai_prod_score
    return min(total, 100)


def cmd_scan(args):
    """Scan all niches and rank by opportunity."""
    if args.niches:
        niches = [(n, n, 4) for n in args.niches]  # custom niches default to AI score 4
    else:
        niches = BUILT_IN_NICHES

    print("=" * 100)
    print(f"YOUTUBE NICHE SCANNER — Scanning {len(niches)} niches")
    print("=" * 100)

    results = []
    for i, (query, label, ai_score) in enumerate(niches):
        print(f"\n[{i+1}/{len(niches)}] Scanning: {label} ('{query}')...")
        stats = scan_niche(query, max_channels=args.depth)

        if not stats:
            print(f"  ⚠ No data found")
            continue

        opp_score = calculate_opportunity_score(stats, ai_score)

        result = {
            "label": label,
            "query": query,
            "ai_score": ai_score,
            "opp_score": opp_score,
            **stats
        }
        results.append(result)

        # Print quick summary
        print(f"  Channels: {stats['n_channels']} | Avg Subs: {fmt(stats['avg_subs'])} | "
              f"Views/Vid: {fmt(stats['avg_vpv'])} | <100K: {stats['under_100k']}/{stats['n_channels']} | "
              f"Score: {opp_score}/100")

    if not results:
        print("\nNo results found. Check your API key.")
        return

    # Sort by opportunity score
    results.sort(key=lambda x: x["opp_score"], reverse=True)

    # Print ranked results
    print("\n" + "=" * 100)
    print("RANKED RESULTS — By Opportunity Score")
    print("=" * 100)
    print(f"{'Rank':<5} {'Niche':<30} {'Score':>6} {'AI':>3} {'Views/Vid':>10} {'Avg Subs':>10} {'<100K':>6} {'New':>4} {'Top Channel':<30}")
    print("-" * 100)

    for i, r in enumerate(results):
        top_ch = r["top_channels"][0]["name"][:29] if r["top_channels"] else "N/A"
        print(f"{i+1:<5} {r['label'][:29]:<30} {r['opp_score']:>5}/100 {r['ai_score']:>2}/5 "
              f"{fmt(r['avg_vpv']):>10} {fmt(r['avg_subs']):>10} "
              f"{r['under_100k']}/{r['n_channels']:>3}   {r['young_successful']:>3} {top_ch:<30}")

    # Top 10 breakdown
    print("\n" + "=" * 100)
    print("TOP 10 NICHES — Detailed Breakdown")
    print("=" * 100)

    for i, r in enumerate(results[:10]):
        print(f"\n{'─'*80}")
        print(f"#{i+1} — {r['label']} (Score: {r['opp_score']}/100)")
        print(f"  Search query: '{r['query']}'")
        print(f"  AI Production: {'★' * r['ai_score']}{'☆' * (5-r['ai_score'])} ({r['ai_score']}/5)")
        print(f"  Avg Views/Video: {fmt(r['avg_vpv'])}  |  Avg Subs: {fmt(r['avg_subs'])}  |  Median Subs: {fmt(r['med_subs'])}")
        print(f"  Competition: {r['under_100k']}/{r['n_channels']} under 100K  |  {r['over_1m']} over 1M")
        print(f"  New channels succeeding (< 2yr, > 10K subs): {r['young_successful']}")
        print(f"  Top channels:")
        for ch in r["top_channels"][:3]:
            age_str = f"{ch['age_days']//365}y" if ch['age_days'] > 365 else f"{ch['age_days']//30}mo"
            print(f"    {ch['name'][:40]:<42} Subs: {fmt(ch['subs']):>8}  Views/Vid: {fmt(ch['views_per_vid']):>8}  Age: {age_str}")

    # Opportunity matrix
    print("\n" + "=" * 100)
    print("OPPORTUNITY MATRIX")
    print("=" * 100)
    print("\n  High Views + Low Competition (BEST):")
    sweet_spot = [r for r in results if r["avg_vpv"] >= 20_000 and r["under_100k"] >= r["n_channels"] * 0.6]
    if sweet_spot:
        for r in sweet_spot[:5]:
            print(f"    ★ {r['label']:<30} Views/Vid: {fmt(r['avg_vpv']):>8}  Competition: {r['under_100k']}/{r['n_channels']} small")
    else:
        print("    None found with these criteria. Try --depth 20 for more data.")

    print("\n  High Views (regardless of competition):")
    high_views = sorted(results, key=lambda x: x["avg_vpv"], reverse=True)
    for r in high_views[:5]:
        print(f"    → {r['label']:<30} Views/Vid: {fmt(r['avg_vpv']):>8}")

    print("\n  Lowest Competition:")
    low_comp = sorted(results, key=lambda x: x["under_100k"] / max(x["n_channels"], 1), reverse=True)
    for r in low_comp[:5]:
        print(f"    → {r['label']:<30} {r['under_100k']}/{r['n_channels']} channels under 100K")

    print("\n  Best for AI Production (5/5 + High Score):")
    ai_best = [r for r in results if r["ai_score"] == 5]
    ai_best.sort(key=lambda x: x["opp_score"], reverse=True)
    for r in ai_best[:5]:
        print(f"    → {r['label']:<30} Score: {r['opp_score']}/100  Views/Vid: {fmt(r['avg_vpv']):>8}")

    print("\n  New Channels Succeeding (proof you can break in):")
    new_wins = sorted(results, key=lambda x: x["young_successful"], reverse=True)
    for r in new_wins[:5]:
        print(f"    → {r['label']:<30} {r['young_successful']} new channels growing")

    # Export CSV if requested
    if args.csv:
        os.makedirs(os.path.dirname(args.csv) if os.path.dirname(args.csv) else "results", exist_ok=True)
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["Rank", "Niche", "Score", "AI Score", "Avg Views/Vid", "Avg Subs",
                        "Median Subs", "Channels Found", "Under 100K", "Over 1M",
                        "New Channels Succeeding", "Top Channel", "Top Channel Subs"])
            for i, r in enumerate(results):
                top = r["top_channels"][0] if r["top_channels"] else {"name": "N/A", "subs": 0}
                w.writerow([i+1, r["label"], r["opp_score"], r["ai_score"],
                           r["avg_vpv"], r["avg_subs"], r["med_subs"],
                           r["n_channels"], r["under_100k"], r["over_1m"],
                           r["young_successful"], top["name"], top["subs"]])
        print(f"\n✓ Results exported to: {args.csv}")


def cmd_deep(args):
    """Deep scan — also pulls video data from top channels per niche."""
    print("Deep scan pulls video-level data from top channels. This uses more API quota.")
    print("Running standard scan first...\n")

    # Run standard scan
    args.csv = args.csv or None
    args.niches = None
    cmd_scan(args)
    print("\n[Deep scan video analysis coming in future update]")


def main():
    p = argparse.ArgumentParser(description="YouTube Niche Scanner")
    sp = p.add_subparsers(dest="cmd")

    s1 = sp.add_parser("scan", help="Scan niches and rank by opportunity")
    s1.add_argument("--niches", nargs="+", help="Custom niche queries (overrides built-in list)")
    s1.add_argument("--depth", type=int, default=10, help="Channels to analyze per niche (default: 10)")
    s1.add_argument("--csv", help="Export results to CSV file")

    s2 = sp.add_parser("deep", help="Deep scan with video-level data")
    s2.add_argument("--depth", type=int, default=10)
    s2.add_argument("--csv", help="Export results to CSV")

    args = p.parse_args()
    if not args.cmd:
        p.print_help()
        sys.exit(1)

    {"scan": cmd_scan, "deep": cmd_deep}[args.cmd](args)


if __name__ == "__main__":
    main()
