const categories = {
  Beef: "لحم بقري",
  Chicken: "دجاج",
  Dessert: "حلويات",
  Lamb: "لحم ضأن",
  Miscellaneous: "منوعات",
  Pasta: "مكرونة",
  Pork: "لحم خنزير",
  Seafood: "مأكولات بحرية",
  Side: "مقبلات",
  Starter: "مقبلات خفيفة",
  Vegan: "نباتي صارم",
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

const meals = {
  Flan: "فلان",
  Ezme: "إزمي",
  Kabse: "كبسة",
  Kapsa: "كبسة",
  Satee: "ساتيه",
  Jajek: "جاجيك",
  Asado: "أسادو",
  "Chicken Handi": "دجاج هندي",
  "Chicken Alfredo": "دجاج ألفريدو",
  "Chicken Fajita Mac and Cheese": "دجاج فاهيتا بالمعكرونة والجبن",
  "Chicken Karaage": "دجاج كارااغي",
  "Chicken Tikka": "دجاج تكا",
  "Chicken Curry": "دجاج بالكاري",
  "Beef and Mustard Pie": "فطيرة اللحم البقري والخردل",
  "Roast Lamb": "لحم ضأن مشوي",
  "Apple Frangipan Tart": "تارت التفاح",
  "Chocolate Gateau": "كيكة الشوكولاتة",
};

const ingredients = {
  sugar: "سكر",
  milk: "حليب",
  "vanilla pod": "قرن فانيليا",
  "egg yolks": "صفار البيض",
  egg: "بيض",
  eggs: "بيض",
  flour: "طحين",
  "plain flour": "طحين أبيض",
  butter: "زبدة",
  salt: "ملح",
  pepper: "فلفل",
  "black pepper": "فلفل أسود",
  chicken: "دجاج",
  "chicken breast": "صدر دجاج",
  onion: "بصل",
  onions: "بصل",
  garlic: "ثوم",
  tomato: "طماطم",
  tomatoes: "طماطم",
  "tomato puree": "معجون طماطم",
  oil: "زيت",
  "olive oil": "زيت زيتون",
  rice: "رز",
  water: "ماء",
  lemon: "ليمون",
  carrots: "جزر",
  potato: "بطاطا",
  potatoes: "بطاطا",
  cheese: "جبن",
  yogurt: "لبن زبادي",
  cream: "كريمة",
  parsley: "بقدونس",
  coriander: "كزبرة",
  cumin: "كمون",
  cinnamon: "قرفة",
  paprika: "بابريكا",
  beef: "لحم بقري",
  lamb: "لحم ضأن",
  bread: "خبز",
};

const wordTranslations = {
  preheat: "سخّن",
  oven: "الفرن",
  heat: "سخّن",
  medium: "متوسطة",
  low: "هادئة",
  high: "عالية",
  heat: "الحرارة",
  pan: "مقلاة",
  pot: "قدر",
  bowl: "وعاء",
  add: "أضف",
  stir: "حرّك",
  cook: "اطبخ",
  fry: "اقلي",
  bake: "اخبز",
  boil: "اغلي",
  simmer: "اتركه ينضج على نار هادئة",
  mix: "اخلط",
  combine: "اخلط",
  pour: "اسكب",
  place: "ضع",
  remove: "أزل",
  serve: "قدّم",
  serve: "قدّم",
  season: "تبل",
  salt: "الملح",
  pepper: "الفلفل",
  until: "حتى",
  with: "مع",
  for: "لمدة",
  minutes: "دقائق",
  minute: "دقيقة",
  sugar: "السكر",
  flour: "الطحين",
  milk: "الحليب",
  butter: "الزبدة",
  onion: "البصل",
  garlic: "الثوم",
  oil: "الزيت",
  rice: "الأرز",
  water: "الماء",
  chicken: "الدجاج",
  beef: "اللحم البقري",
  golden: "ذهبي اللون",
  brown: "محمّر",
  hot: "ساخن",
  cold: "بارد",
};

export function translateCategory(value, language) {
  return language === "ar" ? categories[value] || value : value;
}

export function translateArea(value, language) {
  return language === "ar" ? areas[value] || value : value;
}

export function translateMealName(value, language) {
  return language === "ar" ? meals[value] || value : value;
}

export function translateIngredient(value, language) {
  if (language !== "ar") return value;
  const normalized = value.trim().toLowerCase();
  return ingredients[normalized] || value;
}

export function translateMeasure(value, language) {
  if (language !== "ar" || !value) return value;
  return value
    .replace(/\bgrams?\b/gi, "غرام")
    .replace(/\bkg\b/gi, "كيلوغرام")
    .replace(/\bkilos?\b/gi, "كيلوغرام")
    .replace(/\bml\b/gi, "ملليلتر")
    .replace(/\bliters?\b/gi, "لتر")
    .replace(/\bcups?\b/gi, "كوب")
    .replace(/\btablespoons?\b/gi, "ملعقة كبيرة")
    .replace(/\bteaspoons?\b/gi, "ملعقة صغيرة")
    .replace(/\bounces?\b/gi, "أونصة")
    .replace(/\bpounds?\b/gi, "رطل")
    .replace(/\bpinch\b/gi, "رشة")
    .replace(/\btsp\b/gi, "ملعقة صغيرة")
    .replace(/\btbs\b/gi, "ملعقة كبيرة");
}

export function translateInstructions(value, language) {
  if (language !== "ar" || !value) return value;
  return value;
}

const mealInstructions = {
  ezme: [
    "ضع الطماطم وجميع أنواع الفلفل في محضرة الطعام، واعجنها حتى تصبح مفرومة بشكل ناعم. أخرج الخليط إلى مصفاة فوق وعاء واتركه ليصفّي.",
    "ضع البصل والثوم والبقدونس في محضرة الطعام واعجنها جيداً حتى تصبح مفرومة ناعماً.",
    "ضع معجون الفلفل الأحمر ومعجون الطماطم ودبس الرمان والفلفل الحار والسماق والنعناع المجفف ومعظم زيت الزيتون البكر في وعاء تقديم، واخلطها جيداً حتى تتجانس.",
    "أضف خليط البصل والمزيج المصفى إلى الصلصة، وتبل بالفلفل الحار والملح، واخلط جيداً. زيّن بالباقي من زيت الزيتون وقدّم.",
  ],
};

export function translateMealInstructions(mealName, language) {
  if (language !== "ar") return null;
  return mealInstructions[mealName?.trim().toLowerCase()] || null;
}

export async function translateInstructionText(text) {
  if (!text?.trim()) return text;

  const googleTranslateUrl =
    import.meta.env.VITE_GOOGLE_TRANSLATE_URL ||
    "https://translate.googleapis.com/translate_a/single";
  const myMemoryTranslateUrl =
    import.meta.env.VITE_MYMEMORY_TRANSLATE_URL ||
    "https://api.mymemory.translated.net/get";

  const cacheKey = `instruction:${text}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  const translateWithGoogle = async () => {
    const response = await fetch(
      `${googleTranslateUrl}?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error("Google translation failed");
    const data = await response.json();
    return data?.[0]?.map((part) => part[0]).join("").trim();
  };

  const translateWithMyMemory = async () => {
    const response = await fetch(
      `${myMemoryTranslateUrl}?q=${encodeURIComponent(text)}&langpair=en|ar`
    );
    if (!response.ok) throw new Error("MyMemory translation failed");
    const data = await response.json();
    return data?.responseData?.translatedText?.trim();
  };

  let translated = "";
  try {
    translated = await translateWithGoogle();
  } catch {
    try {
      translated = await translateWithMyMemory();
    } catch {
      translated = "";
    }
  }

  if (!translated || /may be translation|does not exist|english/i.test(translated)) {
    return text;
  }

  try {
    localStorage.setItem(cacheKey, translated);
  } catch {}

  return translated;
}
