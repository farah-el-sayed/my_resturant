import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm ">
            &copy; {new Date().getFullYear()} {t("appName")}. {t("footer")}
          </p>
         
        </div>
      </div>
    </footer>
  );
}
