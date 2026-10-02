import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMealById } from "../api";

// Collect the 20 possible ingredient + measure pairs.
function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) list.push({ name, measure: measure || "" });
  }
  return list;
}

// Tags come from the API as a comma-separated string ("Vegan,GlutenFree").
function getTags(meal) {
  return meal.strTags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean) || [];
}

// Instructions arrive as one long string; split them into clean steps.
function getSteps(meal) {
  return meal.strInstructions
    .split("\n")
    .map((step) => step.trim())
    .filter(Boolean);
}

export default function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMealById(id);
        setMeal(data); // null when the id is invalid
      } catch {
        setMeal(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;

  // Edge case: user typed a wrong id in the URL.
  if (!meal) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow">
        <h2 className="text-xl font-bold">Meal not found</h2>
        <p className="mt-2 text-gray-500">
          This meal id does not exist. It may have been typed incorrectly.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Show only a handful of items initially; reveal the rest with "Show More".
  const INGREDIENTS_INITIAL_COUNT = 6;
  const STEPS_INITIAL_COUNT = 4;

  const ingredients = getIngredients(meal);
  const tags = getTags(meal);
  const steps = getSteps(meal);

  const visibleIngredients = showAllIngredients
    ? ingredients
    : ingredients.slice(0, INGREDIENTS_INITIAL_COUNT);
  const visibleSteps = showAllSteps ? steps : steps.slice(0, STEPS_INITIAL_COUNT);

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600"
      >
        ← Back to meals
      </Link>

      {/* Hero: image + title + badges + links */}
      <div className="mt-4 grid gap-8 rounded-2xl bg-white p-6 shadow md:grid-cols-2 md:items-center md:p-8">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg md:h-72 md:w-72"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {meal.strMeal}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {meal.strCategory && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                {meal.strArea}
              </span>
            )}
          </div>

          {tags.length > 0 && (
            <p className="mt-3 text-sm text-gray-500">{tags.join(" · ")}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                ▶ Watch on YouTube
              </a>
            )}
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                View Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
          <span className="text-sm text-gray-500">
            {ingredients.length} {ingredients.length === 1 ? "item" : "items"}
          </span>
        </div>

        <ul
          className={`mt-4 grid gap-2 ${
            ingredients.length > 8 ? "sm:grid-cols-2" : ""
          }`}
        >
          {visibleIngredients.map((ing, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-gray-800">
                <span className="font-medium">{ing.name}</span>
                {ing.measure && (
                  <span className="text-gray-500"> — {ing.measure}</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        {ingredients.length > INGREDIENTS_INITIAL_COUNT && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllIngredients((show) => !show)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
            >
              {showAllIngredients
                ? "Show Less"
                : `Show More (${ingredients.length - visibleIngredients.length} more)`}
            </button>
          </div>
        )}
      </section>

      {/* Instructions */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
        <ol className="mt-4 space-y-4">
          {visibleSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="pt-0.5 leading-relaxed text-gray-700">{step}</p>
            </li>
          ))}
        </ol>

        {steps.length > STEPS_INITIAL_COUNT && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllSteps((show) => !show)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
            >
              {showAllSteps
                ? "Show Less"
                : `Show More (${steps.length - visibleSteps.length} more)`}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
