# Maya Exam Prep

Interactive Hebrew math practice for circles, scale/map problems, and ratios.

## What's included

| File | Purpose |
|---|---|
| `index.html` | Interactive quiz — 16 circle questions + 17 ratio/scale questions |
| `worksheet.html` | Printable worksheets with answer key |
| `tests/runner.html` | QA test runner (open in browser) |

## Usage

Open `index.html` directly in a browser — no server needed.

For printable worksheets, open `worksheet.html` and click "הדפס דף עבודה".

## Question structure

Two tabs:
- **מעגלים** — concepts (מעגל vs עיגול, מיתר, קשת) + calculations (circumference, area, ratios of circles)
- **קנה-מידה ויחס** — reading map scales, deriving scale factors, reducing ratios, rectangle ratio problems

## Hint system

- First wrong answer → hint shown, student can retry
- Second wrong answer → correct answer revealed, question locked, solution box opens

## Formulas used

```
היקף = 2 × R × 3.14
שטח  = R × R × 3.14
קוטר = 2 × R
מרחק במציאות = מרחק במפה × קנה-מידה
```

π = 3.14 (Israeli elementary school standard)

## Running QA tests

Open `tests/runner.html` in any browser. All 28 tests should pass green.
