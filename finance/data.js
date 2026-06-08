// ── נתוני משפחת וינטר ─────────────────────────────────────
const DATA = {

  // הכנסות
  income: {
    katya: { base: 12000, name: "קטיה" },
    chris: { base: 18374, name: "כריס" },
    childAllowance: 437,
    katyaBonusMonths: ["2025-03","2025-08","2025-12","2026-03","2026-08","2026-12"],
    katyaBonusAmounts: { "2025-03":3957, "2025-08":6795, "2025-12":5745,
                         "2026-03":3588, "2026-08":6795, "2026-12":5745 }
  },

  // הוצאות קבועות
  fixed: [
    { name:"משכנתא", amount:3880, cat:"דיור" },
    { name:"הלוואה 1", amount:2015, cat:"הלוואות" },
    { name:"הלוואה 2", amount:1231, cat:"הלוואות" },
    { name:"הלוואה 3", amount:392,  cat:"הלוואות" },
    { name:"הלוואה 4", amount:394,  cat:"הלוואות" },
    { name:"ארנונה",   amount:725,  cat:"דיור" },
    { name:"מכבי + ביטוח מגדל", amount:600, cat:"בריאות" },
    { name:"ועד בית",  amount:370,  cat:"דיור" },
    { name:"פזגז",     amount:264,  cat:"דיור" },
    { name:"אינטרנט + נטפליקס + ספוטיפיי", amount:213, cat:"בילוי" },
    { name:"פנגו",     amount:80,   cat:"רכב" },
    { name:"פקדון בית", amount:350, cat:"חיסכון" },
    { name:"ני\"ע הוראת קבע", amount:201, cat:"השקעות" },
  ],

  // ילדים ופעילויות
  kids: [
    { name:"אמה — בלט (Donna)", amount:540, child:"אמה", protected:true },
    { name:"אמה — צהרון (אלתרמן)", amount:348, child:"אמה", protected:true },
    { name:"אמצעית — 5 Fingers ×2", amount:415, child:"אמצעית", protected:true },
    { name:"הצעירה — פעילות", amount:300, child:"הצעירה", protected:true },
    { name:"צופות — כל השלוש", amount:1000, child:"כולן", protected:true },
    { name:"תוספות בית ספר", amount:200, child:"כולן", protected:false },
  ],

  // חיסכון חודשי
  savings: [
    { name:"פירעון מינוס", amount:2000, goal:64000, color:"#f87171" },
    { name:"טיול אירופה", amount:1416, goal:17000, color:"#4ade80" },
    { name:"טיול אסיה",   amount:944,  goal:34000, color:"#60a5fa" },
    { name:"קייטנות",     amount:583,  goal:7000,  color:"#f7931e" },
    { name:"חירום",       amount:500,  goal:10000, color:"#a78bfa" },
  ],

  // שינויים עתידיים ידועים
  upcoming: [
    { name:"ביטוח רכב", currentAmount:1400, newAmount:800, effectiveMonth:"2026-07",
      note:"חידוש פוליסה — חיסכון ₪600/חודש", cat:"רכב" },
    { name:"Disney+", currentAmount:50, newAmount:0, effectiveMonth:"2026-07",
      note:"ביטול מיידי — כפילות עם נטפליקס", cat:"בילוי" },
  ],

  // כרטיסי אשראי — ממוצע חודשי בפועל לפי קטגוריה (14 חודשים)
  ccActual: {
    "טיולים":      { actual:3140, target:0,    note:"אל-על, בוקינג, מלונות בחו\"ל" },
    "מכולות":      { actual:2432, target:2200, note:"אושר עד, רמי לוי, סטופ מרקט" },
    "ביגוד":       { actual:839,  target:400,  note:"זארה, פוקס, SHEIN, קסטרו, דלתא" },
    "מסעדות":      { actual:479,  target:300,  note:"רולדין, פרנץ, מקדונלד'ס" },
    "תרופות":      { actual:263,  target:250,  note:"סופר-פארם, מכבי טבעי" },
    "דלק":         { actual:335,  target:400,  note:"פז, דלק, מנטה" },
    "מנויים":      { actual:984,  target:934,  note:"נטפליקס, ספוטיפיי, גים, מנהל קהילתי" },
    "ילדים נוסף":  { actual:187,  target:300,  note:"FunCity, צעצועים, מתנות" },
    "פייבוקס":     { actual:151,  target:100,  note:"העברות שונות" },
    "CAL התקנות":  { actual:2000, target:0,    note:"רכישות בתשלומים — לא להוסיף חדשות" },
  },

  // נתונים חודשיים אמיתיים (נוב 25 — מאי 26)
  monthly: [
    { month:"2025-11", income:30455, cc:20500, label:"נוב 25", abroad:false },
    { month:"2025-12", income:36000, cc:19940, label:"דצמ 25", abroad:false, bonus:6000 },
    { month:"2026-01", income:30079, cc:22000, label:"ינו 26",  abroad:true,  trip:"קפריסין" },
    { month:"2026-02", income:24898, cc:18600, label:"פבר 26", abroad:false },
    { month:"2026-03", income:30788, cc:19100, label:"מרץ 26", abroad:false, bonus:3588 },
    { month:"2026-04", income:30374, cc:21200, label:"אפר 26", abroad:true,  trip:"אילת" },
    { month:"2026-05", income:30811, cc:20500, label:"מאי 26", abroad:true,  trip:"קפריסין" },
    { month:"2026-06", income:30374, cc:17800, label:"יונ 26", abroad:false },
  ],

  overdraft: {
    start: 64000,
    startMonth: "2026-06",
    interestRate: 0.20,
    // לוח תשלומים — ₪2,000/חודש + קצבת ילדים + בונוסים
    schedule: [
      { month:"יונ 26", regular:2000, bonus:0,    allowance:437 },
      { month:"יול 26", regular:2000, bonus:0,    allowance:437 },
      { month:"אוג 26", regular:2000, bonus:5500, allowance:437, bonusNote:"בונוס קיץ" },
      { month:"ספט 26", regular:2000, bonus:0,    allowance:437 },
      { month:"אוק 26", regular:2000, bonus:0,    allowance:437 },
      { month:"נוב 26", regular:2000, bonus:0,    allowance:437 },
      { month:"דצמ 26", regular:2000, bonus:5500, allowance:437, bonusNote:"בונוס שנתי" },
      { month:"ינו 27", regular:2000, bonus:0,    allowance:437 },
      { month:"פבר 27", regular:2000, bonus:0,    allowance:437 },
      { month:"מרץ 27", regular:2000, bonus:0,    allowance:437 },
      { month:"אפר 27", regular:2000, bonus:5500, allowance:437, bonusNote:"בונוס פסח" },
      { month:"מאי 27", regular:2000, bonus:0,    allowance:437 },
      { month:"יונ 27", regular:2000, bonus:0,    allowance:437 },
      { month:"יול 27", regular:2000, bonus:0,    allowance:437 },
      { month:"אוג 27", regular:2000, bonus:5500, allowance:437, bonusNote:"בונוס קיץ" },
      { month:"ספט 27", regular:2000, bonus:0,    allowance:437 },
    ]
  }
};
