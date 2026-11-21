import fs from "fs";

const names = {};
for (const letter of "abcdefghijklmnopqrstuvwxyz") {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  const data = await res.json();
  for (const meal of data.meals ?? []) {
    names[meal.idMeal] = meal.strMeal;
  }
}

fs.mkdirSync("data/en", { recursive: true });
fs.writeFileSync("data/en/names.json", JSON.stringify(names, null, 2));
console.log("تم! عدد الوجبات:", Object.keys(names).length);