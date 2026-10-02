import { useEffect, useState } from "react";
import { fetchMeals, fetchCategories, fetchMealsByCategory } from "../api";
import CategoryTabs from "../components/CategoryTabs";
import MealCard from "../components/MealCard";

// Number of meals shown before the remaining ones are hidden behind "Show More".
const INITIAL_MEALS_COUNT = 6;

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [active, setActive] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_MEALS_COUNT);

  const normalizedQuery = searchTitle.trim().toLowerCase();
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal?.toLowerCase().includes(normalizedQuery) ?? false
  );
  const visibleMeals = filteredMeals.slice(0, visibleCount);

  // Reset the visible amount whenever the dataset or the search term changes.
  useEffect(() => {
    setVisibleCount(INITIAL_MEALS_COUNT);
  }, [meals, searchTitle]);

  // Load default meals (empty search) + categories on first render.
  useEffect(() => {
    async function load() {
      try {
        const [initialMeals, cats] = await Promise.all([
          fetchMeals(),
          fetchCategories(),
        ]);
        setMeals(initialMeals);
        setCategories(cats);
      } catch {
        setError("Failed to load meals. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Fetch meals when a category tab is clicked.
  async function handleSelect(category) {
    setActive(category);
    setLoading(true);
    setError("");
    try {
      const data = category ? await fetchMealsByCategory(category) : await fetchMeals();
      setMeals(data);
    } catch {
      setError("Failed to load meals. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <CategoryTabs categories={categories} active={active} onSelect={handleSelect} />

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Filter by title
        </label>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search meals by title"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
      </div>

      {filteredMeals.length === 0 ? (
        <p className="mt-6 text-center">No meals found.</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>

          {filteredMeals.length > INITIAL_MEALS_COUNT && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) =>
                    count >= filteredMeals.length
                      ? INITIAL_MEALS_COUNT
                      : filteredMeals.length
                  )
                }
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                {visibleCount >= filteredMeals.length ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
