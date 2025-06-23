import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Language detection
import HttpBackend from "i18next-http-backend"; // Load translation files

i18n
  .use(HttpBackend) // Load translation files dynamically
  .use(LanguageDetector) // Detect language and store it in localStorage or cookies
  .use(initReactI18next) // Pass i18n to React
  .init({
    fallbackLng: "en", // Default language if detection fails
    debug: true, // Enable debugging
    supportedLngs: ["en", "ar"], // Only allow these languages
    nonExplicitSupportedLngs: true, // Treat "en-US" as "en"

    interpolation: {
      escapeValue: false, // React already protects against XSS
    },

    detection: {
      order: ["localStorage", "cookie"], // Do not detect from navigator
      caches: ["localStorage", "cookie"], // Store detected language
    },

    backend: {
      loadPath: "/translation/{{lng}}.json", // Load translation files
    },
  });

// Ensure the language is correctly set on app startup
i18n.on("initialized", () => {
  let currentLang = i18n.language;

  // Convert "en-US" or other variations to "en"
  if (currentLang.startsWith("en")) {
    i18n.changeLanguage("en");
  } else if (currentLang.startsWith("ar")) {
    i18n.changeLanguage("ar");
  }

  // Set the correct page direction
  document.documentElement.lang = i18n.language;
  document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
});

export default i18n;
