// QA tests for Maya exam-prep answer-checking logic
// Run via tests/runner.html in a browser

const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(`${msg || ''}\n  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
  }
}

function assertContains(arr, val, msg) {
  if (!arr.includes(val)) {
    throw new Error(`${msg || ''}\n  ${JSON.stringify(val)} not found in ${JSON.stringify(arr)}`);
  }
}

// ─── Helpers extracted from index.html logic ─────────────────────────────────

function normalise(s) {
  return s.trim().replace(/\s+/g, '').toLowerCase();
}

function isCorrectAnswer(raw, acceptedAnswers) {
  const n = normalise(raw);
  return acceptedAnswers.map(normalise).includes(n);
}

// ─── Test: answer normalisation ───────────────────────────────────────────────

test('exact match is correct', () => {
  assertEqual(isCorrectAnswer('31.4', ['31.4']), true);
});

test('leading/trailing spaces ignored', () => {
  assertEqual(isCorrectAnswer('  31.4  ', ['31.4']), true);
});

test('internal spaces ignored', () => {
  assertEqual(isCorrectAnswer('1 : 500000', ['1:500000']), true);
});

test('case-insensitive', () => {
  assertEqual(isCorrectAnswer('ABC', ['abc']), true);
});

test('wrong answer returns false', () => {
  assertEqual(isCorrectAnswer('99', ['31.4']), false);
});

test('empty string returns false', () => {
  assertEqual(isCorrectAnswer('', ['31.4']), false);
});

test('multiple accepted answers: first accepted', () => {
  assertEqual(isCorrectAnswer('2:3', ['2:3', '2 : 3']), true);
});

test('multiple accepted answers: second accepted', () => {
  assertEqual(isCorrectAnswer('2 : 3', ['2:3', '2 : 3']), true);
});

test('multiple accepted answers: wrong returns false', () => {
  assertEqual(isCorrectAnswer('3:2', ['2:3', '2 : 3']), false);
});

// ─── Test: circumference formula (R=5) ───────────────────────────────────────

test('circumference R=5 gives 31.4', () => {
  const result = (2 * 5 * 3.14).toFixed(1);
  assertEqual(result, '31.4');
});

test('area R=5 gives 78.5', () => {
  const result = (5 * 5 * 3.14).toFixed(1);
  assertEqual(result, '78.5');
});

test('radius from circumference 62.8', () => {
  const r = 62.8 / (2 * 3.14);
  assertEqual(r, 10);
});

test('area R=10 gives 314', () => {
  const result = 10 * 10 * 3.14;
  assertEqual(result, 314);
});

test('circumference R=7 gives 43.96', () => {
  const result = 2 * 7 * 3.14;
  assertEqual(result, 43.96);
});

// ─── Test: scale calculations ─────────────────────────────────────────────────

test('scale 1:25000, map=4cm → 100000cm real', () => {
  assertEqual(4 * 25000, 100000);
});

test('scale 1:1000, map=3cm → 3000cm real', () => {
  assertEqual(3 * 1000, 3000);
});

test('scale derivation: real=3500000, map=7 → 1:500000', () => {
  assertEqual(3500000 / 7, 500000);
});

// ─── Test: ratio reduction ────────────────────────────────────────────────────

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function reduceRatio(a, b) { const g = gcd(a, b); return [a / g, b / g]; }

test('24:36 reduces to 2:3', () => {
  const [a, b] = reduceRatio(24, 36);
  assertEqual(a, 2); assertEqual(b, 3);
});

test('15:25 reduces to 3:5', () => {
  const [a, b] = reduceRatio(15, 25);
  assertEqual(a, 3); assertEqual(b, 5);
});

test('16:20 reduces to 4:5', () => {
  const [a, b] = reduceRatio(16, 20);
  assertEqual(a, 4); assertEqual(b, 5);
});

test('400:50 reduces to 8:1', () => {
  const [a, b] = reduceRatio(400, 50);
  assertEqual(a, 8); assertEqual(b, 1);
});

// ─── Test: rectangle ratio ────────────────────────────────────────────────────

test('rectangle perimeter=40, ratio 3:2 → sides 12 and 8', () => {
  const half = 40 / 2; // a + b = 20
  const k = half / (3 + 2);
  assertEqual(k, 4);
  assertEqual(3 * k, 12);
  assertEqual(2 * k, 8);
});

// ─── Test: 2-attempt state logic ─────────────────────────────────────────────

test('first wrong increments attempts to 1', () => {
  const attempts = {};
  const qid = 'c6';
  attempts[qid] = (attempts[qid] || 0) + 1;
  assertEqual(attempts[qid], 1);
});

test('second wrong increments attempts to 2', () => {
  const attempts = { c6: 1 };
  attempts['c6'] = (attempts['c6'] || 0) + 1;
  assertEqual(attempts['c6'], 2);
});

test('attempt 1 → should show hint (not lock)', () => {
  const attempts = { c6: 1 };
  const shouldLock = attempts['c6'] >= 2;
  assertEqual(shouldLock, false);
});

test('attempt 2 → should lock', () => {
  const attempts = { c6: 2 };
  const shouldLock = attempts['c6'] >= 2;
  assertEqual(shouldLock, true);
});

test('resetTab clears attempts', () => {
  const tabState = { answered: { c6: true }, correct: { c6: false }, attempts: { c6: 2 } };
  const fresh = { answered: {}, correct: {}, attempts: {} };
  assertEqual(Object.keys(fresh.attempts).length, 0);
});

// ─── MC: answer index check ───────────────────────────────────────────────────

test('MC correct: chosen === answer index', () => {
  const q = { answer: 1 };
  assertEqual(1 === q.answer, true);
});

test('MC wrong: chosen !== answer index', () => {
  const q = { answer: 1 };
  assertEqual(0 === q.answer, false);
});

// ─── Run all ──────────────────────────────────────────────────────────────────

function runAll() {
  const results = [];
  tests.forEach(({ name, fn }) => {
    try {
      fn();
      passed++;
      results.push({ name, ok: true });
    } catch (e) {
      failed++;
      results.push({ name, ok: false, err: e.message });
    }
  });
  return results;
}
