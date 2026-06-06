# Maya Exam Prep — CLAUDE.md

## Project purpose
Interactive math exam-prep website for Maya (מאיה), grade 6 Israeli curriculum.

## File structure
```
maya_exam_prep/
├── index.html          # Dark hub landing page — links to all topics
├── quiz.html           # Circles & scale/ratio quiz (33 questions)
├── fractions.html      # Fractions quiz (34 main: 8+6 basic + 8+6+6 mult/div/paren; + 7 bonus Q_EXTRA)
├── percentages.html    # Percentages quiz (14 questions + 5 bonus via Q_EXTRA)
├── shapes.html         # Area & perimeter quiz (14 main: 8+6; + 5 bonus Q_EXTRA) — id prefix 'a'
├── volume.html         # Volume quiz (14 main: 8+6; + 5 bonus Q_EXTRA) — id prefix 'v'
├── worksheet.html      # Printable worksheets (circles + ratio topics)
├── CLAUDE.md           # This file
├── README.md           # Project overview and usage
└── tests/
    ├── test_logic.js   # QA tests (answer-checking, formula math, state logic)
    └── runner.html     # Browser test runner
```

## Dark theme (index.html, fractions.html, percentages.html, shapes.html, volume.html)
- Fonts: `Space Grotesk` (body), `IBM Plex Mono` (mono), `Bebas Neue` (display) — Google Fonts
- Colors: `--bg: #0a0a0a`, `--surface: #1a1a1a`, `--elevated: #242424`, `--accent: #ff6b35`, `--accent-alt: #f7931e`, `--border: #333`
- quiz.html retains its original mauve theme

## Tech stack
- Plain HTML/CSS/JS — no build step, no dependencies
- Hebrew RTL: `lang="he" dir="rtl"` on `<html>`, `direction: rtl` in CSS

## Answer-checking system (2-attempt + hint)
- **Input questions**: first wrong → "לא נכון — לחץ על 💡 לרמז", allow retry. Second wrong → lock, show answer, auto-reveal solution.
- **MC questions**: single click locks all options; wrong → same hint nudge; solution toggle shown.
- State: `state = { answered: {}, correct: {}, attempts: {} }` (flat, keyed by question id).
- `resetAll()` clears all state and re-renders.

## Per-card UI components (fractions.html / percentages.html)
- **🔊 speak button** (top-left of each card): calls `speakQ(qid)` → Web Speech API, `lang: he-IL`, rate 0.85. Pulses while speaking.
- **💡 רמז button**: always visible below question text; toggles `hintbox-{qid}` visibility. Independent of attempt count — clicking it does NOT penalise the student.
- **↺ נסה שוב** (per section): calls `retrySection(containerId, questions)` → clears state for that section, shuffles question order, re-renders. Questions are the same set shuffled.
- **הצג פתרון / הסתר פתרון**: toggle shown after correct answer (review) or after 2nd wrong answer (auto-open).
- **Topic intro box**: collapsible explanation at top of each page. Toggle button is `▾ הסבר` / `▸ הסתר`.

## Equivalent fraction checking (fractions.html only)
`parseFrac(s)` extracts `[numerator, denominator]` from `"a/b"` strings.
`isCorrect()` cross-multiplies: `fn[0]*fa[1] === fn[1]*fa[0]` — so 2/4, 3/6, 4/8 all match when the accepted answer is 1/2. No need to list all equivalents in the answer array.

## Dog mascot
`dog.jpg` in project root is shown as a circular image in the `index.html` hero. The file must be present for the image to appear — it is not committed to git (add to `.gitignore` if needed).

## Question data shape
```js
{
  id: 'c1',          // 'c' prefix = circles, 's' = scale/ratio
  type: 'mc' | 'input',
  text: '...',       // question text (Hebrew, \n for newlines)
  note: '...',       // optional hint line shown under question
  options: [...],    // MC only: array of strings
  answer: 2,         // MC: index; input: array of accepted strings
  hint: '...',       // shown on first wrong attempt
  solution: '...',   // shown in solution-box (togglable / auto-revealed on 2nd wrong)
}
```

## Accepted answer normalisation
`norm(s)` = lowercase + strip all whitespace, `%`, `₪`, and `,` before comparison.
Multiple accepted answers in array (e.g. `['2:3', '2 : 3']`).
fractions.html and percentages.html use the extended norm that also strips `%` and `₪`.

## π convention
π = 3.14 throughout (Israeli elementary school standard).

## Formulas
- Circumference: `2 × R × 3.14`
- Area: `R × R × 3.14`
- Scale: `real = map × scale_factor`

## Running QA tests
Open `tests/runner.html` in a browser. All tests must pass (green) before any logic change is shipped.

## Workflow for adding new questions
- **Circles/ratio**: add to `Q1` or `Q2` in `quiz.html`; add worksheet entry in `worksheet.html`
- **Fractions**: add to `Q_SINGLE` or `Q_MULTI` in `fractions.html`
- **Percentages**: add to `Q_SINGLE` or `Q_MULTI` in `percentages.html`
- **Area/perimeter**: add to `Q_SINGLE` or `Q_MULTI` in `shapes.html` (id prefix `a`)
- **Volume**: add to `Q_SINGLE` or `Q_MULTI` in `volume.html` (id prefix `v`)
- Add test cases in `tests/test_logic.js` if new answer normalisation patterns are introduced
- Run `tests/runner.html` after any logic change

## Question data shape (fractions.html / percentages.html)
```js
{
  id: 'f1',          // 'f' prefix = fractions, 'p' = percentages
  type: 'mc' | 'input',
  text: '...',       // Hebrew, \n for line breaks (white-space: pre-line)
  note: '...',       // optional subtext (answer format hint)
  options: [...],    // MC only
  answer: 0,         // MC: index; input: array of accepted strings (pre-norm)
  hint: '...',       // shown on first wrong attempt
  solution: '...',   // shown on 2nd wrong (auto) or via toggle button
}
```
