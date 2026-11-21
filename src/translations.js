// ============================================================
// translations.js
// الأولوية: ملفات JSON المترجمة (src/data/ar/*.json) ← القواميس اليدوية ← النص الأصلي
// بدون أي طلبات شبكة (Google / MyMemory) وقت التشغيل.
// عدّل مسار "../data/ar/" حسب مكان ملفك بالمشروع.
// ============================================================

// ---------- ملفات الترجمة الثابتة (اختيارية: إذا مش موجودة بيشتغل عادي) ----------
const arData = import.meta.glob("../data/ar/*.json", {
  eager: true,
  import: "default",
});
const pick = (name) => arData[`../data/ar/${name}.json`] || {};

const jsonNames = pick("names"); // مفتاحها idMeal
const jsonSteps = pick("steps"); // مفتاحها idMeal، القيمة مصفوفة خطوات
const jsonIngredients = pick("ingredients"); // مفتاحها اسم المكون lowercase
const jsonMeasures = pick("measures"); // مفتاحها القياس كما هو

const norm = (v) => v?.trim().toLowerCase();

// ---------- القواميس اليدوية (احتياطي) ----------
const categories = {
  Beef: "لحم بقري",
  Chicken: "دجاج",
  Dessert: "حلويات",
  Lamb: "لحم ضأن",
  Miscellaneous: "منوعات",
  Pasta: "مكرونة",
  Seafood: "مأكولات بحرية",
  Side: "أطباق جانبية",
  Starter: "مقبلات",
  Vegan: "نباتي صرف",
  Vegetarian: "نباتي",
  Breakfast: "فطور",
  Goat: "لحم ماعز",
};

const areas = {
  American: "أمريكي",
  British: "بريطاني",
  Canadian: "كندي",
  Chinese: "صيني",
  Croatian: "كرواتي",
  Dutch: "هولندي",
  Egyptian: "مصري",
  Filipino: "فلبيني",
  French: "فرنسي",
  Greek: "يوناني",
  Indian: "هندي",
  Irish: "إيرلندي",
  Italian: "إيطالي",
  Jamaican: "جامايكي",
  Japanese: "ياباني",
  Kenyan: "كيني",
  Malaysian: "ماليزي",
  Mexican: "مكسيكي",
  Moroccan: "مغربي",
  Polish: "بولندي",
  Portuguese: "برتغالي",
  Russian: "روسي",
  Spanish: "إسباني",
  Thai: "تايلندي",
  Tunisian: "تونسي",
  Turkish: "تركي",
  Uruguayan: "أوروغوياني",
  Vietnamese: "فيتنامي",
};

// مفاتيحها lowercase
const meals = {
  flan: "فلان",
  ezme: "إزمي",
  kabse: "كبسة",
  kapsa: "كبسة",
  satee: "ساتيه",
  jajek: "جاجيك",
  asado: "أسادو",
  "chicken handi": "دجاج هندي",
  "chicken alfredo": "دجاج ألفريدو",
  "chicken fajita mac and cheese": "دجاج فاهيتا بالمعكرونة والجبن",
  "chicken karaage": "دجاج كارااغي",
  "chicken tikka": "دجاج تكا",
  "chicken curry": "دجاج بالكاري",
  "beef and mustard pie": "فطيرة اللحم البقري والخردل",
  "roast lamb": "لحم ضأن مشوي",
  "apple frangipan tart": "تارت التفاح",
  "chocolate gateau": "كيكة الشوكولاتة",
};

// القاعدة: أسماء المكونات بدون "ال" التعريف (زي أسماء المتجر)
const ingredients = {
  sugar: "سكر",
  milk: "حليب",
  "vanilla pod": "قرن فانيليا",
  "egg yolks": "صفار بيض",
  egg: "بيض",
  eggs: "بيض",
  flour: "طحين",
  "plain flour": "طحين أبيض",
  butter: "زبدة",
  salt: "ملح",
  pepper: "فلفل",
  "black pepper": "فلفل أسود",
  "chicken breast": "صدر دجاج",
  rice: "رز",
  "green pepper": "فلفل أخضر",
  "green peppers": "فلفل أخضر",
  "red pepper": "فلفل أحمر",
  "red peppers": "فلفل أحمر",
  "yellow pepper": "فلفل أصفر",
  "bell pepper": "فلفل حلو",
  "romano pepper": "فلفل رومانو",
  "green chilli": "فلفل أخضر حار",
  "green chili": "فلفل أخضر حار",
  "red pepper paste": "معجون فلفل أحمر",
  "pomegranate molasses": "دبس رمان",
  "pul biber": "بول بيبر",
  sumac: "سماق",
  "dried mint": "نعنع ناشف",
  "extra virgin olive oil": "زيت زيتون بكر ممتاز",
  mushrooms: "فطر",
  mushroom: "فطر",
  sweetcorn: "ذرة حلوة",
  corn: "ذرة",
  carrots: "جزر",
  carrot: "جزر",
  raisins: "زبيب",
  raisin: "زبيب",
  turmeric: "كركم",
  "kabse spice": "بهارات الكبسة",
  "kabsah spice": "بهارات الكبسة",
  "shawarma spice": "بهارات الشاورما",
  "mixed spice": "بهارات مشكلة",
  onion: "بصل",
  onions: "بصل",
  garlic: "ثوم",
  tomato: "بندورة",
  tomatoes: "بندورة",
  "tomato puree": "معجون بندورة",
  oil: "زيت",
  "olive oil": "زيت زيتون",
  water: "ميّ",
  "cold water": "ميّ باردة",
  cucumber: "خيار",
  cucumbers: "خيار",
  lemon: "ليمون",
  lemons: "ليمون",
  potato: "بطاطا",
  potatoes: "بطاطا",
  cheese: "جبنة",
  yogurt: "لبن",
  cream: "كريمة",
  parsley: "بقدونس",
  cumin: "كمون",
  cinnamon: "قرفة",
  paprika: "بابريكا",
  beef: "لحم بقري",
  lamb: "لحم ضأن",
  bread: "خبز",
  "soy sauce": "صلصة الصويا",
  "ground coriander": "كزبرة مطحونة",
  coriander: "كزبرة",
  "sushi rice": "رز سوشي",
  "rice wine": "نبيذ الرز",
  "caster sugar": "سكر ناعم",
  mayonnaise: "مايونيز",
  "filo pastry": "عجينة فيلو",
  "minced beef": "لحم بقري مفروم",
  "corn flour": "طحين الذرة",
  cornstarch: "نشا الذرة",
  "warm water": "ميّ دافية",
  "whole milk": "حليب كامل الدسم",
  "ground cardomom": "هيل مطحون",
  "ground cardamom": "هيل مطحون",
  "rose water": "ماء ورد",
  almonds: "لوز",
  pistachio: "فستق حلبي",
  lentils: "عدس",
  mint: "نعنع",
  thyme: "زعتر",
  "red pepper flakes": "فلفل أحمر مجروش",
  "vegetable stock": "مرقة خضار",
  "sea salt": "ملح بحري",
  "beef shin": "ساق لحم بقري",
  "bay leaf": "ورق غار",
  "sunflower oil": "زيت دوّار الشمس",
  beetroot: "شمندر",
  "tinned tomatos": "بندورة معلبة",
  "tinned tomatoes": "بندورة معلبة",
  prunes: "برقوق مجفف",
  "white cabbage": "ملفوف أبيض",
  "kidney beans": "فاصولياء حمرا",
  "creme fraiche": "كريم فريش",
  dill: "شبت",
  "crusty bread": "خبز مقرمش",
  chickpeas: "حمص",
  "ground cumin": "كمون مطحون",
  "tahini paste": "طحينة",
  "garlic clove": "فص ثوم",
  "greek yogurt": "لبن يوناني",
  knafeh: "عجينة كنافة",
  "unsalted butter": "زبدة غير مملحة",
  "yellow food colouring": "ملوّن طعام أصفر",
  mozzarella: "جبنة موزاريلا",
  "cream cheese": "جبنة كريمية",
  "lemon juice": "عصير ليمون",
  "broad beans": "فول",
  "spring onions": "بصل أخضر",
  "baking powder": "بيكنج باودر",
  "cayenne pepper": "فلفل كايين",
  "vegetable oil": "زيت نباتي",
};

// ---------- دوال الترجمة البسيطة ----------
export function translateCategory(value, language) {
  return language === "ar" ? categories[value] || value : value;
}

export function translateArea(value, language) {
  return language === "ar" ? areas[value] || value : value;
}

// id اختياري: إذا مررته بيدور أول شي بملف names.json (الأدق)
export function translateMealName(value, language, id) {
  if (language !== "ar" || !value) return value;
  if (id && jsonNames[id]) return jsonNames[id];
  return meals[norm(value)] || value;
}

// للتوافق مع الكود الموجود: بتعتمد على names.json والقاموس فقط
export async function translateMealNameText(text, id) {
  if (!text?.trim()) return text;
  return translateMealName(text, "ar", id);
}

export function translateIngredient(value, language) {
  if (language !== "ar" || !value) return value;
  const key = norm(value);
  return jsonIngredients[key] || ingredients[key] || value;
}

// ---------- القياسات ----------
const sizes = { large: "كبير", medium: "متوسط", small: "صغير" };

const exactMeasures = {
  chopped: "مفروم",
  cloves: "فصوص",
  clove: "فص",
  minced: "مفروم ناعم",
  handful: "حفنة",
  pinch: "رشة",
  dash: "رشة خفيفة",
  bunch: "حزمة",
  tin: "علبة",
  tins: "علب",
  packet: "باكيت",
  packets: "باكيتات",
  "juice of half": "عصير نص ليمونة",
  "juice of 1/2": "عصير نص ليمونة",
  spinkling: "رشّة",
  "as required": "حسب الحاجة",
  "to serve": "للتقديم",
  sprinkling: "رشّة",
  "to taste": "حسب الذوق",
  slice: "شريحة",
  slices: "شرائح",
  large: "كبير",
  medium: "متوسط",
  small: "صغير",
};

function juiceOf(n) {
  const num = parseInt(n, 10);
  if (String(n).includes("-")) return `عصير ${n} ليمونات`;
  if (num === 1) return "عصير ليمونة";
  if (num === 2) return "عصير ليمونتين";
  if (num >= 3 && num <= 10) return `عصير ${num} ليمونات`;
  return `عصير ${num} ليمونة`;
}

export function translateMeasure(value, language) {
  if (language !== "ar" || !value) return value;

  const normalized = value.trim();
  if (!normalized) return value;
  const lower = normalized.toLowerCase();

  if (jsonMeasures[normalized]) return jsonMeasures[normalized];
  if (exactMeasures[lower]) return exactMeasures[lower];

  const juiceMatch = normalized.match(/^juice of\s+(\d+(?:-\d+)?)$/i);
  if (juiceMatch) return juiceOf(juiceMatch[1]);

  const sizedMatch = normalized.match(/^(\d+)\s+(large|medium|small)$/i);
  if (sizedMatch) return `${sizedMatch[1]} ${sizes[sizedMatch[2].toLowerCase()]}`;

  const clovesMatch = normalized.match(/^(\d+)\s+cloves?\s+(.+)$/i);
  if (clovesMatch) {
    const unit = clovesMatch[1] === "1" ? "فص" : "فصوص";
    const rest = translateMeasure(clovesMatch[2], "ar");
    return `${clovesMatch[1]} ${unit}${rest ? ` ${rest}` : ""}`;
  }

  const compactGrams = normalized.match(/^(\d+(?:[.-]\d+)?)\s*g(?:rams?)?$/i);
  if (compactGrams) return `${compactGrams[1]} جرام`;

  const compactMl = normalized.match(/^(\d+(?:[.-]\d+)?)\s*ml$/i);
  if (compactMl) return `${compactMl[1]} مل`;

  const compactKg = normalized.match(/^(\d+(?:[.-]\d+)?)\s*kg$/i);
  if (compactKg) return `${compactKg[1]} كيلو`;

  return normalized
    .replace(/\bgrams?\b/gi, "جرام")
    .replace(/\bkilos?\b/gi, "كيلو")
    .replace(/\bkg\b/gi, "كيلو")
    .replace(/\bml\b/gi, "مل")
    .replace(/\bliters?\b/gi, "لتر")
    .replace(/\bcups?\b/gi, "كاسة")
    .replace(/\b(?:tablespoons?|tbsp|tbs|tblsp|tbls)\b/gi, "ملعقة كبيرة")
    .replace(/\b(?:teaspoons?|tsp)\b/gi, "ملعقة صغيرة")
    .replace(/\bounces?\b/gi, "أونصة")
    .replace(/\bpounds?\b/gi, "رطل")
    .replace(/\bjuice of half\b/gi, "عصير نص ليمونة")
    .replace(/\bdiced\b/gi, "مقطّع مكعبات")
    .replace(/\bpeeled\b/gi, "مقشّر")
    .replace(/\bcrushed\b/gi, "مهروس")
    .replace(/\bbeaten\b/gi, "مخفوق")
    .replace(/\bspinkling\b/gi, "رشّة")
    .replace(/\bsprinkling\b/gi, "رشّة")
    .replace(/\bas required\b/gi, "حسب الحاجة")
    .replace(/\bto serve\b/gi, "للتقديم")
    .replace(/\bpackets\b/gi, "باكيتات")
    .replace(/\bpacket\b/gi, "باكيت")
    .replace(/\bpinch\b/gi, "رشة")
    .replace(/\bdash\b/gi, "رشة خفيفة")
    .replace(/\bbunch\b/gi, "حزمة")
    .replace(/\bto taste\b/gi, "حسب الذوق")
    .replace(/\bchopped\b/gi, "مفروم")
    .replace(/\bcloves\b/gi, "فصوص")
    .replace(/\bclove\b/gi, "فص");
}

// ---------- خطوات الطبخ ----------
// وجبات مترجمة يدوي (احتياطي، مفتاحها اسم الوجبة lowercase)
const mealInstructions = {
  ezme: [
    "حط البندورة والفلفل بكل أنواعه بمحضرة الطعام وافرمهم ناعم. بعدين حط الخليط بمصفاة فوق وعاء وخليه يصفّى شوي.",
    "حط البصل والثوم والبقدونس بمحضرة الطعام وافرمهم ناعم.",
    "بوعاء التقديم، حط معجون الفلفل الأحمر والبندورة ودبس الرمان والفلفل الحار والسماق والنعنع الناشف، واسكب عليهم معظم زيت الزيتون، وخلّطهم مع بعض.",
    "زيد خليط البصل والبندورة المصفّى على الصلصة، وزبّط الطعم بالفلفل الحار والملح، وخلّطهم منيح. زيّن بباقي زيت الزيتون وقدّمه.",
  ],
};

// بترجّع مصفوفة خطوات بالعربي، أو null إذا ما في ترجمة
export function translateMealInstructions(mealName, language, id) {
  if (language !== "ar") return null;
  if (id && Array.isArray(jsonSteps[id])) return jsonSteps[id];
  return mealInstructions[norm(mealName)] || null;
}

// الأسهل للاستخدام: بترجّع دايماً مصفوفة خطوات جاهزة للعرض
// meal = الكائن الجاي من TheMealDB
export function translateMealSteps(meal, language) {
  const ar = translateMealInstructions(meal?.strMeal, language, meal?.idMeal);
  if (ar) return ar;
  return (meal?.strInstructions || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------- دوال قديمة (للتوافق مع الكود الموجود) ----------
export function translateInstructions(value) {
  return value;
}

// ترجمة المكونات المعروفة من القاموس المحلي، مع دعم القيمة العربية الجاهزة
export async function translateIngredientText(text) {
  if (!text?.trim()) return text;
  const local = translateIngredient(text, "ar");
  if (/[\u0600-\u06FF]/.test(local)) return local;

  const cacheKey = `ingredient:dialect-v3:${text.trim().toLowerCase()}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  const googleTranslateUrl =
    import.meta.env.VITE_GOOGLE_TRANSLATE_URL ||
    "https://translate.googleapis.com/translate_a/single";

  try {
    const response = await fetch(
      `${googleTranslateUrl}?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error("Google translation failed");
    const data = await response.json();
    const translated = data?.[0]?.map((part) => part[0]).join("").trim();
    if (!translated) return text;
    try {
      localStorage.setItem(cacheKey, translated);
    } catch {}
    return translated;
  } catch {
    return text;
  }
}

// ترجمة خطوات التحضير للعربية العامية الشامية، مع الحفاظ على الأرقام والكميات
export async function translateInstructionText(text) {
  if (!text?.trim()) return text;

  const cacheKey = `instruction:dialect-v4:${text.trim()}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  const fixedPhrases = [
    [/preheat the oven/gi, "سخّن الفرن"],
    [/simmer/gi, "اتركه ع نار هادية"],
    [/season/gi, "زبّط الطعم بالملح والفلفل"],
    [/golden brown/gi, "لحد ما يصير لونه دهبي"],
  ];

  let source = text;
  for (const [pattern, phrase] of fixedPhrases) {
    source = source.replace(pattern, phrase);
  }

  const preserved = [];
  source = source.replace(
    /(?:\d+(?:[./-]\d+)*(?:°[CFcf])?|(?:\d+(?:\s*(?:g|kg|ml|l|cup|cups|tbsp|tsp|minute|min|minutes|hour|hours)\b)))/gi,
    (value) => {
      const key = `__P${preserved.length}__`;
      preserved.push([key, value]);
      return key;
    }
  );

  const googleTranslateUrl =
    import.meta.env.VITE_GOOGLE_TRANSLATE_URL ||
    "https://translate.googleapis.com/translate_a/single";
  const myMemoryTranslateUrl =
    import.meta.env.VITE_MYMEMORY_TRANSLATE_URL ||
    "https://api.mymemory.translated.net/get";

  let translated = "";
  try {
    const response = await fetch(
      `${googleTranslateUrl}?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(source)}`
    );
    if (!response.ok) throw new Error("Google translation failed");
    const data = await response.json();
    translated = data?.[0]?.map((part) => part[0]).join("").trim();
  } catch {
    try {
      const response = await fetch(
        `${myMemoryTranslateUrl}?q=${encodeURIComponent(source)}&langpair=en|ar`
      );
      if (!response.ok) throw new Error("MyMemory translation failed");
      const data = await response.json();
      translated = data?.responseData?.translatedText?.trim() || "";
    } catch {
      translated = "";
    }
  }

  if (!translated) return text;

  translated = translated
    .replace(/ضعوا/g, "حطوا")
    .replace(/ضع/g, "حط")
    .replace(/أضفوا/g, "زودوا")
    .replace(/أضف/g, "زود")
    .replace(/أخرجوا/g, "طلّعوا")
    .replace(/أخرج/g, "طلّع")
    .replace(/اتركوا/g, "خلّيوا")
    .replace(/اترك/g, "خلّي")
    .replace(/قلّبوا/g, "قلّبوا")
    .replace(/قلّب/g, "قلّب")
    .replace(/سخّن/g, "سخّن")
    .replace(/حتى يصبح/g, "لحد ما يصير")
    .replace(/حتى/g, "لحد")
    .replace(/تقليب/g, "قلّب")
    .replace(/\s{2,}/g, " ")
    .trim();

  for (const [key, value] of preserved) {
    translated = translated
      .replace(key, value)
      .replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), value);
  }

  try {
    localStorage.setItem(cacheKey, translated);
  } catch {}

  return translated;
}