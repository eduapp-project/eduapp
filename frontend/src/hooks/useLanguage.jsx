/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import es_es from "../lang/es_es.json";
import en_uk from "../lang/en_uk.json";
import pt_pt from "../lang/pt_pt.json";
import da_dk from "../lang/da_dk.json";
import ro_ro from "../lang/ro_ro.json";
import nl_nl from "../lang/nl_nl.json";

/**
 * Hook used to dynamically change the app's language.
 *
 * @returns {Object} language
 */
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
      case "da_dk":
        setLang(da_dk);
        break;
      case "ro_ro":
        setLang(ro_ro);
        break;
      case "nl_nl":
        setLang(nl_nl);
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
  ["da_dk", "Dansk"],
  ["ro_ro", "Română"],
  ["nl_nl", "Nederlands"],
];
