const BASE_URL =
  import.meta.env.VITE_MEALDB_API_URL ||
  'https://www.themealdb.com/api/json/v1/1';

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
  return data.meals || [];
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return data.categories || [];
}

export async function fetchMealsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function fetchMealByCategoryAndSlug(category, slug) {
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
