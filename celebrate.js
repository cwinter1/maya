// Motivation engine — confetti, streaks, section fireworks, toast messages
(function () {
  const COLORS = ['#ff6b35','#f7931e','#ffd700','#ff3b8e','#7efff5','#b8ff5e','#ffffff'];

  const MSG_CORRECT = [
    'נכון! כל הכבוד! ⭐',
    'מדויק! יפה מאוד!',
    'בדיוק! את מבריקה!',
    'אחלה! כך ממשיכים!',
    'נכון מאה אחוז! 🙌',
    'מצוין! עבודה יפה!',
    'פצצה! 💥',
  ];
  const MSG_WRONG = [
    'לא נורא — זה קורה לכולם! 💪',
    'כמעט שם! בואי ננסה שוב',
    'אל תוותרי — את על הדרך הנכונה',
    'זה לא קל, אבל את מסוגלת!',
    'טעויות זה חלק מהלמידה 🌱',
    'נסי שוב — את יכולה!',
  ];
  const MSG_SECTION = [
    'סיימת חלק שלם! יפה מאד! 🎉',
    'חטיבה שלמה! את מדהימה! 🎊',
    'כל החלק הזה — נכון! 🏆',
    'וואו! סיימת! את סופר-חכמה! 🌟',
  ];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ─── CSS ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
  .confetti-piece {
    position: fixed;
    width: 9px; height: 9px;
    border-radius: 2px;
    pointer-events: none;
    z-index: 9999;
    animation: cffly var(--cd, 1.1s) ease-out forwards;
  }
  @keyframes cffly {
    0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity:1; }
    100% { transform: translate(var(--dx),var(--dy)) rotate(720deg) scale(0.4); opacity:0; }
  }
  #cel-toast {
    position: fixed;
    top: 18px; left: 50%;
    transform: translateX(-50%) translateY(-150%);
    background: #1e1e1e;
    border: 1.5px solid #ff6b35;
    color: #f5f5f5;
    padding: 11px 28px;
    border-radius: 32px;
    font-family: 'Space Grotesk', -apple-system, sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    z-index: 10000;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    pointer-events: none;
    white-space: nowrap;
    direction: rtl;
    box-shadow: 0 4px 24px rgba(255,107,53,0.25);
  }
  #cel-toast.show { transform: translateX(-50%) translateY(0); }
  `;
  document.head.appendChild(style);

  // ─── Toast ────────────────────────────────────────────
  const toast = document.createElement('div');
  toast.id = 'cel-toast';
  let toastTimer = null;

  function showToast(msg, duration) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, duration || 2000);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(toast);
  });

  // ─── Confetti ────────────────────────────────────────
  function burst(x, y, count, spread) {
    for (var i = 0; i < count; i++) {
      var el = document.createElement('div');
      el.className = 'confetti-piece';
      var angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.9;
      var dist  = spread * (0.35 + Math.random() * 0.65);
      var dx = (Math.cos(angle) * dist).toFixed(1);
      var dy = (Math.sin(angle) * dist - 55).toFixed(1);
      var dur = (0.75 + Math.random() * 0.6).toFixed(2) + 's';
      el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;background:' + COLORS[i % COLORS.length] + ';--dx:' + dx + 'px;--dy:' + dy + 'px;--cd:' + dur;
      document.body.appendChild(el);
      el.addEventListener('animationend', function () { this.remove(); });
    }
  }

  // ─── Public API ──────────────────────────────────────
  window.celebrateCorrect = function (streak) {
    showToast(pick(MSG_CORRECT), 1800);
    if (streak > 0 && streak % 3 === 0) {
      setTimeout(function () {
        var msg = streak >= 9
          ? streak + ' ברצף!!! בלתי ניתן לעצירה! 🚀'
          : streak >= 6
            ? streak + ' ברצף!! את בוערת! 🔥🔥'
            : '3 ברצף! 🔥 יש לך!';
        burst(window.innerWidth / 2, window.innerHeight * 0.25, 32, 190);
        showToast(msg, 2800);
      }, 450);
    }
  };

  window.celebrateWrong = function () {
    showToast(pick(MSG_WRONG), 2400);
  };

  window.celebrateSectionDone = function () {
    var cx = window.innerWidth, cy = window.innerHeight;
    setTimeout(function () { burst(cx * 0.28, cy * 0.22, 55, 240); }, 0);
    setTimeout(function () { burst(cx * 0.72, cy * 0.22, 55, 240); }, 220);
    setTimeout(function () { burst(cx * 0.50, cy * 0.38, 70, 280); }, 440);
    setTimeout(function () { showToast(pick(MSG_SECTION), 3400); }, 300);
  };
})();
