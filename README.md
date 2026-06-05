# Maya Exam Prep

Interactive math practice for Maya — 6th grade Hebrew curriculum, exam prep for circles, ratios, fractions, and percentages.

## What's inside

| File | Use |
|---|---|
| **`index.html`** | Hub landing page — links to all topics |
| **`quiz.html`** | Circles & scale/ratio quiz (33 questions) |
| **`fractions.html`** | Fractions practice (single-step + multi-step) |
| **`percentages.html`** | Percentages practice (single-step + multi-step) |
| **`worksheet.html`** | Printable worksheets with answer key |
| `tests/runner.html` | QA test runner — open in browser |
| `tests/test_logic.js` | 28 automated tests for answer-checking logic |

## Features

- **Hebrew RTL** — full right-to-left layout, Israeli curriculum terminology
- **2-attempt hint system** — first wrong → hint shown, retry allowed; second wrong → answer revealed, solution unlocked
- **Single-step + multi-step** questions labeled by difficulty
- **Printable worksheets** — `worksheet.html` → print button
- **QA test suite** — formula math, answer normalisation, state logic

## Run locally

No build step. Open any `.html` file directly in a browser.

## Deploy

GitHub Pages: push to repo, then Settings → Pages → Source: `main` / root.
Live at: `https://cwinter1.github.io/maya/`

## Topics covered

- מעגלים ועיגולים — Circles & circumference
- קנה-מידה ויחס — Scale/map & ratio
- שברים — Fractions
- אחוזים — Percentages
- מצולעים ומלבנים — Polygons & rectangles
- סימני התחלקות — Divisibility rules

## Formulas used

```
היקף מעגל = 2 × R × 3.14
שטח עיגול = R × R × 3.14
מרחק במציאות = מרחק במפה × קנה-מידה
```

π = 3.14 (Israeli elementary school standard)

## Running QA tests

Open `tests/runner.html` in any browser. All tests must pass green before shipping logic changes.
