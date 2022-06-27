/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import es_es from "../lang/es_es.json";
import en_uk from "../lang/en_uk.json";
import pt_pt from "../lang/pt_pt.json";

export default function useLanguage() {
  const [lang, setLang] = useState(en_uk);

  const handleLanguage = () => {
    switch (localStorage.getItem("eduapp_language")) {
      case "es_es":
        setLang(es_es);
        break;
      case "pt_pt":
        setLang(pt_pt);
        break;
      default:
        setLang(en_uk);
        break;
    }
  };

  useEffect(() => {
    handleLanguage();
    window.addEventListener("storage", handleLanguage);
    return () => {
      window.removeEventListener("storage", handleLanguage);
    };
  }, []);

  return lang;
}

export const availableLanguages = [
  ["en_uk", "English"],
  ["es_es", "Español"],
  ["pt_pt", "Português"],
];