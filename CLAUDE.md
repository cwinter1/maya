# Maya Exam Prep — CLAUDE.md

## Project purpose
Interactive math exam-prep website for a child (Maya / מאיה), covering:
- **Tab 1**: Circles & circumference (מעגלים)
- **Tab 2**: Scale/map problems & ratios (קנה-מידה ויחס)

## File structure
```
maya_exam_prep/
├── index.html          # Interactive quiz (single-file app)
├── worksheet.html      # Printable worksheets for both topics
├── CLAUDE.md           # This file
├── README.md           # Project overview and usage
└── tests/
    ├── test_logic.js   # QA tests (answer-checking, formula math, state logic)
    └── runner.html     # Browser test runner
```

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
Both sides lowercased + whitespace stripped before comparison.
Multiple accepted answers in array (e.g. `['2:3', '2 : 3']`).

## π convention
π = 3.14 throughout (Israeli elementary school standard).

## Formulas
- Circumference: `2 × R × 3.14`
- Area: `R × R × 3.14`
- Scale: `real = map × scale_factor`

## Running QA tests
Open `tests/runner.html` in a browser. All tests must pass (green) before any logic change is shipped.

## Workflow for adding new questions
1. Add object with `id`, `type`, `text`, `answer`, `hint`, `solution` to `Q1` or `Q2` in `index.html`.
2. Add corresponding worksheet entry in `worksheet.html`.
3. Add test cases in `tests/test_logic.js` if new answer patterns are introduced.
4. Run QA runner.
