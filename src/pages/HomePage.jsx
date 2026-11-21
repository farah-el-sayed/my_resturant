import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMeals,
  fetchCategories,
  fetchMealsByCategory,
  slugify,
} from "../api";
import CategoryTabs from "../components/CategoryTabs";
import MealCard from "../components/MealCard";
import { useTranslation } from "react-i18next";
import {
  translateMealName,
  translateMealNameText,
} from "../translations";


const INITIAL_MEALS_COUNT = 3;
const MEALS_PER_PAGE = 3;

function normalizeSearchText(value) {
  return (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export default function HomePage() {
  const { t } = useTranslation();
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [active, setActive] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_MEALS_COUNT);
  const [translatedMealNames, setTranslatedMealNames] = useState({});

  const normalizedQuery = normalizeSearchText(searchTitle);

  useEffect(() => {
    let isCurrent = true;

    async function translateNames() {
      const entries = await Promise.all(
        meals.map(async (meal) => [
          meal.idMeal,
          await translateMealNameText(meal.strMeal, meal.idMeal),
        ])
      );
      if (isCurrent) {
        setTranslatedMealNames(Object.fromEntries(entries));
      }
    }

    if (meals.length > 0) translateNames();
    else setTranslatedMealNames({});

    return () => {
      isCurrent = false;
    };
  }, [meals]);

  const filteredMeals = meals.filter((meal) => {
    const arabicName =
      translatedMealNames[meal.idMeal] ||
      translateMealName(meal.strMeal, "ar", meal.idMeal);
    const normalizedEnglishName = normalizeSearchText(meal.strMeal);
    const normalizedArabicName = normalizeSearchText(arabicName);
    const searchableNames = [
      normalizedEnglishName,
      normalizedArabicName,
    ].filter(Boolean);

    if (!normalizedQuery) return true;
    return searchableNames.some((name) => name.includes(normalizedQuery));
  });
  const visibleMeals = filteredMeals.slice(0, visibleCount);

  // Reset the visible amount whenever the dataset or the search term changes.
  useEffect(() => {
    setVisibleCount(INITIAL_MEALS_COUNT);
  }, [meals, searchTitle]);

  // Load the category from the URL, or all meals on the home page.
  useEffect(() => {
    let isCurrent = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [cats, initialMeals] = await Promise.all([
          fetchCategories(),
          categorySlug ? Promise.resolve(null) : fetchMeals(),
        ]);
        if (!isCurrent) return;

        setCategories(cats);
        if (categorySlug) {
          const selectedCategory = cats.find(
            (item) => slugify(item.strCategory) === slugify(categorySlug)
          );
          if (!selectedCategory) {
            setMeals([]);
            setActive("");
            setError(t("pageNotFound"));
            return;
          }

          const categoryMeals = await fetchMealsByCategory(
            selectedCategory.strCategory
          );
          if (!isCurrent) return;
          setMeals(categoryMeals);
          setActive(selectedCategory.strCategory);
        } else {
          setMeals(initialMeals);
          setActive("");
        }
      } catch {
        if (isCurrent) {
          setError(t("failedConnection"));
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    }
    load();
    return () => {
      isCurrent = false;
    };
  }, [categorySlug]);

  // Keep the selected category in the URL so it can be shared or refreshed.
  function handleSelect(category) {
    navigate(category ? `/meal/${slugify(category)}/` : "/");
  }

  if (loading) return <p className="text-center">{t("loading")}</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <CategoryTabs categories={categories} active={active} onSelect={handleSelect} />

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("searchLabel")}
        </label>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="search-input w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
      </div>

      {filteredMeals.length === 0 ? (
        <p className="mt-6 text-center">{t("noMeals")}</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} category={active} />
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
                      : Math.min(count + MEALS_PER_PAGE, filteredMeals.length)
                  )
                }
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                {visibleCount >= filteredMeals.length ? t("showLess") : t("showMore")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
