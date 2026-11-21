const BASE_URL =
  import.meta.env.VITE_MEALDB_API_URL ||
  'https://www.themealdb.com/api/json/v1/1';

const EXCLUDED_CATEGORIES = new Set(["pork"]);

export function isExcludedCategory(category) {
  return EXCLUDED_CATEGORIES.has(category?.trim().toLowerCase());
}

const PORK_TERMS = [
  "pork",
  "bacon",
  "ham",
  "prosciutto",
  "pancetta",
  "lard",
  "chorizo",
  "pepperoni",
  "sausage",
  "sausages",
  "salami",
  "mortadella",
  "gammon",
  "لحم خنزير",
];

export function containsPork(meal) {
  if (!meal) return false;
  if (isExcludedCategory(meal.strCategory)) return true;

  const values = [
    meal.strMeal,
    meal.strTags,
    meal.strInstructions,
    ...Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`]),
  ].filter(Boolean);

  return values.some((value) =>
    PORK_TERMS.some((term) => new RegExp(`\\b${term}\\b`, "i").test(value))
  );
}

export function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function fetchMeals() {
  const res = await fetch(`${BASE_URL}/search.php?s=`);
  const data = await res.json();
  return (data.meals || []).filter(
    (meal) => !containsPork(meal)
  );
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return (data.categories || []).filter(
    (category) => !isExcludedCategory(category.strCategory)
  );
}

export async function fetchMealsByCategory(category) {
  if (isExcludedCategory(category)) return [];
  const res = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  const data = await res.json();
  const meals = data.meals || [];

  const detailedMeals = await Promise.all(
    meals.map(async (meal) => fetchMealById(meal.idMeal))
  );
  return detailedMeals.filter(Boolean);
}

export async function fetchMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals ? data.meals[0] : null;
  return meal && !containsPork(meal) ? meal : null;
}

export async function fetchMealByCategoryAndSlug(category, slug) {
  if (isExcludedCategory(category)) return null;
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const res = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`
  );
  const data = await res.json();
  const meal = data.meals?.find((item) => slugify(item.strMeal) === slug);

  return meal ? fetchMealById(meal.idMeal) : null;
}
