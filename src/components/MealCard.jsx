
import { Link } from "react-router-dom";
import { slugify } from "../api";
import { useTranslation } from "react-i18next";
import { translateMealName } from "../translations";

export default function MealCard({ meal, category }) {
  const { t, i18n } = useTranslation();
  const mealCategory = meal.strCategory || category;

  const mealPath = `/meal/${slugify(
    mealCategory
  )}/${slugify(meal.strMeal)}`;

  return (
    <div className="meal-card my-3 group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="mx-auto mt-4 h-48 w-48 rounded-full object-cover transition-transform duration-300 group-hover:scale-109 group-hover:rotate-[360deg]"
      />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-center text-lg font-bold italic text-gray-900 min-h-14">
          {translateMealName(meal.strMeal, i18n.language)}
        </h3>

        <Link
          to={mealPath}
          className="my-3 block w-34 text-sm mx-auto rounded-3xl font-semibold bg-orange-500 px-4 py-3 text-center text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {t("viewDetails")}
        </Link>
      </div>
    </div>
  );
}
