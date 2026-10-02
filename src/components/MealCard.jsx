import { Link } from "react-router-dom";

export default function MealCard( {meal} ) {
  return (
    <div className="my-3 group flex flex-col overflow-hidden rounded-lg bg-white shadow transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="mx-auto mt-4 h-48 w-48 rounded-full object-cover transition-transform duration-300 group-hover:scale-109 group-hover:rotate-[360deg]"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-center text-lg italic">{meal.strMeal}</h3>
        <Link
          to={`/meal/${meal.idMeal}`}
          className="my-3 block w-34 text-sm mx-auto rounded-3xl font-semibold bg-orange-500 px-4 py-3  text-center   text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
