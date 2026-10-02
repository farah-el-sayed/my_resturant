import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MealDetailsPage from "./pages/MealDetailsPage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meal/:id" element={<MealDetailsPage />} />
          <Route path="*" element={<p className="text-center">Page not found.</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
