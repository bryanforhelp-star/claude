# Fruit Drama — Story Generation Prompt

> Paste this into Claude AI. Replace `{{PLACEHOLDERS}}` with your details.
> Output is a complete TikTok/Shorts script with location, characters, numbered dialogue lines, and camera notes.

---

```
Create a chaotic TikTok storyline for an AI-generated fruit character drama series.

UNIVERSE: {{UNIVERSE_NAME}}
(e.g. "Fruitville" — a suburban neighborhood where anthropomorphic fruit and vegetables live)

CHARACTERS IN THIS EPISODE:
- {{CHARACTER_1}} (e.g. "Barry the Banana — main character, dramatic, quick to cry")
- {{CHARACTER_2}} (e.g. "Strawberry Shantelle — Barry's girlfriend, secretly messy")
- {{CHARACTER_3}} (optional, e.g. "Broccoli Brad — Barry's best friend, knows everything")

EMOTIONAL FORMULA: {{FORMULA}}
(Choose one: BETRAYAL / REVENGE / CONFLICT / ABSURD TWIST / CLIFFHANGER / REDEMPTION)

SETTING: {{SETTING}}
(e.g. "A backyard BBQ at the end of summer")

TARGET LENGTH: {{LENGTH}}
(e.g. "10 seconds" or "20 seconds" — aim for 10–30 seconds total runtime)

---

Style rules:
- American slang only — no British slang
- Light profanity is fine (hell, damn, oh my god, what the heck)
- Absurd, emotional, and dramatic tone
- Fast-paced — no slow moments
- Optimized for retention — every line must pull the viewer to the next

Output format:
1. SCENE HEADER
   - Location description (one sentence, visual and specific)
   - All characters visible in the same frame
   - Time of day and lighting mood

2. HOOK (first 2 seconds)
   - One line that creates instant curiosity or emotional shock
   - Label: [HOOK]

3. NUMBERED DIALOGUE LINES
   - Format: [CHARACTER NAME]: "line"
   - Include action beats in brackets: e.g. [Barry drops his sunglasses]
   - Keep each line short — 5–12 words max

4. ESCALATION
   - A mid-point reveal or conflict spike
   - Label: [ESCALATION]

5. CLIFFHANGER / PUNCHLINE ENDING
   - End on a moment that makes the viewer want Part 2
   - Label: [END]

6. CAMERA NOTE
   - One sentence describing camera behavior
   - Use: static shot / slight zoom / slow push in / whip pan

7. CAPTION STYLE
   - Suggest the aggressive-caption style for CapCut
   - e.g. "ALL CAPS, bold yellow, shake effect on key words"

8. RECOMMENDED AUDIO
   - One audio suggestion: dramatic piano / sad violin / TikTok trending sound / emotional pop hit
   - Explain WHY it fits this specific storyline

Rules:
- No more than 8 dialogue lines for a 10-second video (scale up for longer)
- Every scene must have exactly ONE moment of visual chaos or emotional peak
- End must leave something unresolved — cliffhangers are mandatory
- Do NOT write narration — this is pure character dialogue + action
```

---

## Example Output (Reference)

**Scene:** A suburban backyard BBQ, golden-hour lighting, plastic lawn chairs. Barry the Banana, Strawberry Shantelle, and Broccoli Brad are all in frame.

[HOOK]
**Barry:** "Shantelle... why does Brad smell like your perfume?"

1. **[Barry's sunglasses slowly fall off his face]**
2. **Shantelle:** "Barry, baby, I can explain—"
3. **Brad:** "Bro I was literally just— it was the candle—"
4. **Barry:** "THE CANDLE?!"
5. **[Barry knocks over the punch bowl in slow motion]**
6. **Shantelle:** "Oh my god Barry it's not—"

[ESCALATION]
7. **Barry:** "I BOUGHT YOU THAT CANDLE FOR YOUR BIRTHDAY."

[END]
8. **[Barry stares into the camera, sunglasses still on the ground, single tear]**

**Camera:** Static shot, slow push in on Barry's face during final line.
**Captions:** ALL CAPS, bold yellow, "CANDLE" gets shake + zoom effect.
**Audio:** Sad piano drop — hits right on "I BOUGHT YOU THAT CANDLE."

---

## Batch Generation (5 Episodes at Once)

To generate 5 ready-to-animate episodes in one prompt, add this at the end:

```
Repeat this exact format 5 times. Each episode must use a DIFFERENT emotional formula.
Rotate characters — not every episode needs all three. Keep them in the same universe.
Episodes should feel like a series — characters reference previous events.
```
