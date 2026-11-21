
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMealByCategoryAndSlug, fetchMealById } from "../api";
import { useTranslation } from "react-i18next";
import {
  translateArea,
  translateCategory,
  translateIngredient,
  translateInstructions,
  translateMealName,
  translateMeasure,
  translateMealInstructions,
  translateInstructionText,
  translateIngredientText,
  translateMealNameText,
} from "../translations";

// Collect ingredients and measures
function getIngredients(meal) {
  const list = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (name) {
      list.push({ name, measure: measure || "" });
    }
  }

  return list;
}

// Get tags
function getTags(meal) {
  return (
    meal.strTags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) || []
  );
}

// Split instructions into steps
function getSteps(meal) {
  return meal.strInstructions
    .split("\n")
    .map((step) =>
      step
        .trim()
        .replace(/^(?:step\s*\d+|[\d]+)\s*[-.):]?\s*/i, "")
        .trim()
    )
    .filter((step) =>
      step &&
      !/^step\s*\d*$/i.test(step) &&
      !/^\d+$/.test(step)
    );
}

export default function MealDetailsPage({ mealId }) {
  const { t, i18n } = useTranslation();
  const { category, name } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [dynamicTranslatedSteps, setDynamicTranslatedSteps] = useState(null);
  const [isTranslatingSteps, setIsTranslatingSteps] = useState(false);
  const [dynamicTranslatedIngredients, setDynamicTranslatedIngredients] = useState({});
  const [dynamicTranslatedMealName, setDynamicTranslatedMealName] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setMeal(null);

      try {
        const data = mealId
          ? await fetchMealById(mealId)
          : await fetchMealByCategoryAndSlug(category, name);

        setMeal(data);
      } catch {
        setMeal(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [category, mealId, name]);

  useEffect(() => {
    let isCurrent = true;

    async function translateName() {
      if (!meal || i18n.language !== "ar") {
        setDynamicTranslatedMealName(meal?.strMeal || "");
        return;
      }

      const translated = await translateMealNameText(meal.strMeal, meal.idMeal);
      if (isCurrent) setDynamicTranslatedMealName(translated);
    }

    translateName();
    return () => {
      isCurrent = false;
    };
  }, [i18n.language, meal]);

  useEffect(() => {
    let isCurrent = true;

    async function translateIngredients() {
      if (i18n.language !== "ar" || !meal) {
        setDynamicTranslatedIngredients({});
        return;
      }

      const entries = await Promise.all(
        getIngredients(meal).map(async ({ name }) => [
          name,
          await translateIngredientText(name),
        ])
      );

      if (isCurrent) {
        setDynamicTranslatedIngredients(Object.fromEntries(entries));
      }
    }

    translateIngredients();
    return () => {
      isCurrent = false;
    };
  }, [i18n.language, meal]);

  useEffect(() => {
    let isCurrent = true;

    async function translateSteps() {
      if (i18n.language !== "ar" || !meal?.strInstructions) {
        setDynamicTranslatedSteps(null);
        setIsTranslatingSteps(false);
        return;
      }

      const curatedSteps = translateMealInstructions(
        meal.strMeal,
        i18n.language,
        meal.idMeal
      );

      if (curatedSteps) {
        setDynamicTranslatedSteps(curatedSteps);
        setIsTranslatingSteps(false);
        return;
      }

      setIsTranslatingSteps(true);
      const sourceSteps = getSteps(meal);
      const translated = await Promise.all(
        sourceSteps.map((step) => translateInstructionText(step))
      );

      if (isCurrent) {
        setDynamicTranslatedSteps(translated);
        setIsTranslatingSteps(false);
      }
    }

    translateSteps();
    return () => {
      isCurrent = false;
    };
  }, [i18n.language, meal]);

  if (loading) {
    return <p className="text-center">{t("loading")}</p>;
  }

  if (!meal) {
    return (
      <div className="detail-panel mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow">
        <h2 className="text-xl font-bold">{t("mealNotFound")}</h2>

        <p className="mt-2 text-gray-500">
          {t("mealNotFoundText")}
        </p>

        <Link
          to="/"
          className="mt-4 inline-block rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
        >
          {t("appName")}
        </Link>
      </div>
    );
  }

  const INGREDIENTS_INITIAL_COUNT = 6;
  const STEPS_INITIAL_COUNT = 4;

  const ingredients = getIngredients(meal);
  const tags = getTags(meal);
  const steps =
    i18n.language === "ar"
      ? dynamicTranslatedSteps || []
      : getSteps(meal);

  const visibleIngredients = showAllIngredients
    ? ingredients
    : ingredients.slice(0, INGREDIENTS_INITIAL_COUNT);

  const visibleSteps = showAllSteps
    ? steps
    : steps.slice(0, STEPS_INITIAL_COUNT);

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600"
      >
        ← {t("backToMeals")}
      </Link>

      {/* Hero */}
      <div className="mt-4 grid gap-8 rounded-2xl bg-white p-6 shadow md:grid-cols-2 md:items-center md:p-8">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg md:h-72 md:w-72"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {i18n.language === "ar"
              ? dynamicTranslatedMealName ||
                translateMealName(meal.strMeal, i18n.language, meal.idMeal)
              : meal.strMeal}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {meal.strCategory && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                {translateCategory(meal.strCategory, i18n.language)}
              </span>
            )}

            {meal.strArea && (
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                {translateArea(meal.strArea, i18n.language)}
              </span>
            )}
          </div>

          {tags.length > 0 && (
            <p className="mt-3 text-sm text-gray-500">
              {tags.join(" · ")}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                ▶ {t("watchYoutube")}
              </a>
            )}

            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                {t("viewSource")}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {t("ingredients")}
          </h2>

          <span className="text-sm text-gray-500">
            {ingredients.length}{" "}
            {ingredients.length === 1 ? t("item") : t("items")}
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
                <span className="font-medium">
                  {i18n.language === "ar"
                    ? dynamicTranslatedIngredients[ing.name] ||
                      translateIngredient(ing.name, i18n.language)
                    : ing.name}
                </span>

                {ing.measure && (
                  <span className="text-gray-500">
                    {" "}— {translateMeasure(ing.measure, i18n.language)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        {ingredients.length > INGREDIENTS_INITIAL_COUNT && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setShowAllIngredients((show) => !show)
              }
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-300 hover:bg-white hover:text-gray-900"
            >
              {showAllIngredients
                ? t("showLess")
                : t("showMoreWithCount", { count: ingredients.length - visibleIngredients.length })}
            </button>
          </div>
        )}
      </section>

      {/* Instructions */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-gray-900">
          {t("instructions")}
        </h2>

        <ol className="mt-4 space-y-4">
          {isTranslatingSteps && (
            <li className="text-sm text-gray-500">
              {t("translatingInstructions")}
            </li>
          )}
          {visibleSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white">
                {i + 1}
              </span>

              <p className="pt-0.5 leading-relaxed text-gray-700">
                {translateInstructions(step, i18n.language)}
              </p>
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
                ? t("showLess")
                : t("showMoreWithCount", { count: steps.length - visibleSteps.length })}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
