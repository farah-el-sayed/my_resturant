export default function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div className="my-2 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
          active === ""
            ? "bg-orange-500 text-white"
            :  "bg-gray-100 border border-gray-300 shadow hover:bg-white"
        }`}
      >
        All
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
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}
