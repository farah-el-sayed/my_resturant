
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MealDetailsPage from "./pages/MealDetailsPage";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";

function MealCategoryRoute() {
  const { category } = useParams();

  return /^\d+$/.test(category)
    ? <MealDetailsPage mealId={category} />
    : <HomePage />;
}

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen transition-colors" data-app-theme>
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Dynamic Routing */}
          <Route
            path="/meal/:category/:name"
            element={<MealDetailsPage />}
          />

          <Route
            path="/meal/:category/"
            element={<MealCategoryRoute />}
          />

          <Route
            path="*"
            element={
              <p className="text-center">{t("pageNotFound")}</p>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
