import { translateCategory } from "../translations";
import { useTranslation } from "react-i18next";

export default function CategoryTabs({ categories, active, onSelect }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="my-2 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
          active === ""
            ? "bg-orange-500 text-white"
            : "bg-white text-gray-800 border border-gray-300 shadow-sm hover:border-orange-400"
        }`}
      >
        {t("all")}
      </button>

      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => onSelect(cat.strCategory)}
          className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
            active === cat.strCategory
              ? "bg-orange-500 text-white"
              : "bg-gray-100 border border-gray-300 shadow hover:bg-white"
          }`}
        >
          {translateCategory(cat.strCategory, i18n.language)}
        </button>
      ))}
    </div>
  );
}
