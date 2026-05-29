# Fruit Drama — Complete Production Pipeline

> End-to-end workflow for producing and posting AI fruit drama videos.
> Target: 3–5 videos per day, ~25–45 minutes per video.

---

## Overview

```
┌──────────────────────────┐
│  1. Story Generation      │ ← Claude AI (~10 min)
│  5 episode scripts        │   prompts/fruit-story-generation.md
│  Output: 5 scripts        │
└──────────┬───────────────┘
           │
┌──────────▼───────────────┐
│  2. Character Images      │ ← Nano Banana / Midjourney (~10 min)
│  Per-scene character      │   prompts/fruit-character-creation.md
│  renders                  │
└──────────┬───────────────┘
           │
┌──────────▼───────────────┐
│  3. Video Animation       │ ← Kling AI 3.0 (~15 min render)
│  2–4 clips per video      │   prompts/fruit-video-generation.md
│  Output: raw clips        │
└──────────┬───────────────┘
           │
┌──────────▼───────────────┐
│  4. Edit + Captions       │ ← CapCut (~10 min)
│  Assemble, add captions,  │   See editing settings in
│  SFX, and music           │   prompts/fruit-video-generation.md
└──────────┬───────────────┘
           │
┌──────────▼───────────────┐
│  5. Post Everywhere       │ ← TikTok + Reels + Shorts
│  Same video, all 3        │   See posting strategy below
│  platforms same day       │
└──────────────────────────┘
```

---

## Step 1 — Story Generation

**Time:** ~10 minutes  
**Tool:** Claude AI  
**Prompt:** [`prompts/fruit-story-generation.md`](../prompts/fruit-story-generation.md)

Use the batch generation variant at the bottom of the prompt to get 5 scripts in one go. This covers your full day of posting.

**What you get back:**
- 5 complete episode scripts
- Each with: scene header, numbered dialogue, camera note, caption style suggestion, audio recommendation

**Tips:**
- Rotate your emotional formula (betrayal / revenge / conflict / absurd / cliffhanger)
- Keep all episodes in the same universe — characters reference earlier episodes
- End every episode with a cliffhanger to drive Part 2 views

---

## Step 2 — Character Images

**Time:** ~10 minutes  
**Tool:** Nano Banana (nanobana.ai), Midjourney v6, or DALL-E 3  
**Prompt:** [`prompts/fruit-character-creation.md`](../prompts/fruit-character-creation.md)

For each scene in your 5 scripts, generate:
- The character(s) in the correct pose/expression for that beat
- Use your saved character sheets as style seeds for consistency

**One-time setup (do this first):**
1. Generate a character sheet for each main character (6-expression grid)
2. Save these sheets — they are your style seeds forever
3. Never generate without attaching the style seed

---

## Step 3 — Animation

**Time:** ~5 minutes to submit, ~10–15 minutes render time  
**Tool:** Kling AI 3.0  
**Prompt:** [`prompts/fruit-video-generation.md`](../prompts/fruit-video-generation.md)

**Per video, submit 2–4 clips:**

| Clip | Beat | Duration |
|------|------|----------|
| Clip 1 | Hook — shock or betrayal | 2–3s |
| Clip 2 | Escalation | 3–4s |
| Clip 3 | Peak / punchline | 2–3s |
| Clip 4 | Cliffhanger freeze | 2s |

Submit all clips for a single video at once — Kling renders in parallel.  
While Kling renders video 1, generate images for video 2.

---

## Step 4 — Edit in CapCut

**Time:** ~10 minutes per video  
**Tool:** CapCut (free)

**Editing checklist:**
- [ ] Assemble clips in order (hook → escalation → peak → cliffhanger)
- [ ] Add aggressive captions from [`prompts/fruit-titles.md`](../prompts/fruit-titles.md) Part B
- [ ] Apply shake/zoom effects to key words
- [ ] Add sound effects per the table in `fruit-video-generation.md`
- [ ] Add music bed at 20–30% volume
- [ ] Add voiceover if using ElevenLabs (optional but high-retention)
- [ ] Insert speed ramp: slow on emotional peak, snap back on cut
- [ ] Final check: first 2 seconds must be impossible to scroll past

**Export:** 1080×1920 (9:16 vertical), MP4, under 50MB

---

## Step 5 — Post Everywhere

**Post the same video to all three platforms same day.**

| Platform | Best Time | Caption Length | Hashtags |
|----------|-----------|---------------|---------|
| TikTok | 6–10 PM EST | Short + teaser | 5–10 tags |
| Instagram Reels | 6–9 PM EST | Short + teaser | 10–15 tags |
| YouTube Shorts | Any time | Full description OK | 3–5 tags |

Use hashtag pack from [`prompts/fruit-titles.md`](../prompts/fruit-titles.md) Part D.

**Caption formula:**
```
[ONE-LINE HOOK FROM SCRIPT] 😭🍌
Part [N] of the [UNIVERSE NAME] saga...

[2–3 hashtags inline, rest in first comment on TikTok]
```

---

## Weekly Posting Schedule

| Day | Videos | Notes |
|-----|--------|-------|
| Mon | 3 | Betrayal arc opener — start a new storyline |
| Tue | 3 | Escalation episodes — build tension |
| Wed | 3 | Revenge or conflict peak |
| Thu | 3 | Absurd twist or comic relief |
| Fri | 4 | Cliffhanger + recap — drive weekend Part 2 demand |
| Sat | 3 | Audience engagement — reply to comments with next Part |
| Sun | 2 | Lighter / bonus content |

**Total: 21 videos/week = 3 per day minimum.**  
Most successful accounts run 3–5/day in the growth phase.

---

## Tracking & Optimization

Use [`templates/fruit-drama-tracker.csv`](../templates/fruit-drama-tracker.csv) to log:

| Field | Track |
|-------|-------|
| Emotional formula | Which formula (betrayal/revenge/etc) gets most views |
| Character combo | Which pairings perform best |
| Audio type | Which audio drives highest completion rate |
| Platform | Which platform gives best viral lift |
| Hook type | Which first-2-seconds style gets most rewatches |

Review weekly. Double down on the top 2 emotional formulas. Cut what doesn't work.

---

## Growth Milestones

| Milestone | What to Do |
|-----------|-----------|
| 1K followers | Optimize top-performing character — they become your lead |
| 10K followers | Introduce a new character arc — drives existing audience to follow the story |
| 50K followers | Reach out proactively to food/snack brands for promo deals |
| 100K followers | Start merchandise — character stickers/plushies |
| 500K followers | Negotiate TikTok Series paywall for premium storyline episodes |
| 1M followers | Licensing conversations — animated short series, streaming deals |
