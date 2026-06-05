# Maya Exam Prep — CLAUDE.md

## Project purpose
Interactive math exam-prep website for Maya (מאיה), grade 6 Israeli curriculum.

## File structure
```
maya_exam_prep/
├── index.html          # Dark hub landing page — links to all topics
├── quiz.html           # Circles & scale/ratio quiz (33 questions)
├── fractions.html      # Fractions quiz (14 questions)
├── percentages.html    # Percentages quiz (14 questions)
├── worksheet.html      # Printable worksheets (circles + ratio topics)
├── CLAUDE.md           # This file
├── README.md           # Project overview and usage
└── tests/
    ├── test_logic.js   # QA tests (answer-checking, formula math, state logic)
    └── runner.html     # Browser test runner
```

## Dark theme (index.html, fractions.html, percentages.html)
- Fonts: `Space Grotesk` (body), `IBM Plex Mono` (mono), `Bebas Neue` (display) — Google Fonts
- Colors: `--bg: #0a0a0a`, `--surface: #1a1a1a`, `--elevated: #242424`, `--accent: #ff6b35`, `--accent-alt: #f7931e`, `--border: #333`
- quiz.html retains its original mauve theme

## Tech stack
- Plain HTML/CSS/JS — no build step, no dependencies
- Hebrew RTL: `lang="he" dir="rtl"` on `<html>`, `direction: rtl` in CSS

## Answer-checking system (2-attempt + hint)
- **Input questions**: first wrong → show `q.hint`, allow retry. Second wrong → lock, show answer, reveal solution.
- **MC questions**: single click locks all options; wrong → show `q.hint` in feedback div (solution not auto-revealed).
- State lives in `state[tab] = { answered: {}, correct: {}, attempts: {} }`.
- `resetTab(tab)` resets all three sub-objects.

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
