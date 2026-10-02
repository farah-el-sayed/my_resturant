const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

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
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}