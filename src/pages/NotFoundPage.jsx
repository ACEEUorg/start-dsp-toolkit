import { Link } from "react-router";
import { useTranslation } from "../i18n/hooks";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <h2 className="text-9xl font-display font-bold text-seafoam-900 mb-4">
          404
        </h2>
        <h3 className="text-2xl font-display font-semibold text-gray-800 mb-2">
          {t("notFound.message") || "Page not found"}
        </h3>
        <p className="text-gray-600">
          {t("notFound.description") ||
            "The page you're looking for doesn't exist."}
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-seafoam-600 text-white px-6 py-3 rounded-lg hover:bg-seafoam-700 transition-all duration-200"
      >
        <Home className="h-5 w-5" />
        {t("notFound.backToHome") || "Back to Toolbox"}
      </Link>
    </div>
  );
}
