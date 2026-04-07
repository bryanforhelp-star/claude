# YouTube Monetization Automation System

The exact AI-powered system, prompts, and production workflow to replicate profitable YouTube channels — spending less than 8 hours per week, without filming or editing a single video.

---

## The 6-Step System

Every step connects. The output of each phase becomes the input for the next — creating a compounding chain of data-backed decisions that turns a single competitor channel into a repeatable content production machine.

| Step | Action | Tool |
|------|--------|------|
| 1 | Analyse the Competitor Channel | Claude in Chrome (Opus 4.6) |
| 2 | Research Trending Topics | Google Trends |
| 3 | Generate Viral Video Titles | Claude AI |
| 4 | Build the Script Blueprint | Claude AI |
| 5 | Generate a Full Video Outline | Claude AI |
| 6 | Hand Off to Production | Upwork.com |

## Project Structure

```
├── prompts/
│   ├── step1-channel-analysis.md      # 16-step forensic title analysis prompt
│   ├── step3-title-generation.md      # Viral title generation prompt
│   ├── step4-script-blueprint.md      # 10-phase script extraction prompt
│   └── step5-video-outline.md         # Full video outline prompt
├── workflows/
│   ├── step1-analyse-channel.md       # How to run competitor analysis
│   ├── step2-google-trends.md         # How to export trending topics
│   ├── step3-generate-titles.md       # How to generate viral titles
│   ├── step4-script-blueprint.md      # How to build the script blueprint
│   ├── step5-video-outline.md         # How to generate video outlines
│   └── step6-production-handoff.md    # How to delegate to freelancers
├── scripts/
│   └── youtube_scraper.py             # YouTube API scraper for real channel data
├── templates/
│   ├── channel-config.yaml            # Channel configuration template
│   ├── video-tracker.csv              # Production tracking spreadsheet
│   └── upwork-job-posts.md            # Freelancer job post templates
└── docs/
    ├── system-overview.md             # Full system documentation
    └── niche-opportunities.md         # Niche analysis with real data
```

## Requirements

| Tool | Purpose | Cost |
|------|---------|------|
| Claude AI Pro Plan + Chrome Extension | Deep analysis, title generation, script blueprints, outlines (Steps 1, 3, 4, 5) | ~$20/month |
| Google Trends | Real-time trending topic data export (Step 2) | Free |
| Upwork | Freelancer production team (Step 6) | ~$75/video |

## The Numbers

| Metric | Value |
|--------|-------|
| Total Earnings | $25K+ in 4 months |
| Time Investment | 8 hrs/week max |
| Total Views | 3.8M |
| Cost Per Video | ~$75 |

> One single video cost $75 to produce and generated $16,656 in ad revenue from 1.6 million views. That is a 22,000% return on a single piece of content.

## Quick Start

1. **Configure your channel** — Copy `templates/channel-config.yaml` and fill in your niche details
2. **Run Step 1** — Open a competitor channel, use Claude Chrome Extension with the prompt from `prompts/step1-channel-analysis.md`
3. **Run Step 2** — Export Google Trends CSV (Trending Now > US > Past 24 hours)
4. **Run Step 3** — Feed analysis + trends CSV to Claude with `prompts/step3-title-generation.md`
5. **Run Step 4** — Copy 3 outlier transcripts, send to Claude with `prompts/step4-script-blueprint.md`
6. **Run Step 5** — Pick a title, attach Script Blueprint, send `prompts/step5-video-outline.md`
7. **Hand off** — Send outline to your Upwork production team

Total research time: under 1 hour. Then your team handles production.
