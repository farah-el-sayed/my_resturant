import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [i18n.language, isArabic]);

  const changeLanguage = () => {
    const language = isArabic ? "en" : "ar";
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <header className="app-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          {t("appName")}
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={changeLanguage}
            className="header-language-btn rounded-lg px-3 py-2 text-sm font-bold transition"
            aria-label={isArabic ? t("english") : t("arabic")}
          >
            {isArabic ? "EN" : "AR"}
          </button>

          <button
            type="button"
            onClick={() => setTheme((value) => value === "light" ? "dark" : "light")}
            className="header-theme-btn rounded-lg px-3 py-2 text-base transition"
            aria-label={theme === "light" ? t("darkMode") : t("lightMode")}
            title={theme === "light" ? t("darkMode") : t("lightMode")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
