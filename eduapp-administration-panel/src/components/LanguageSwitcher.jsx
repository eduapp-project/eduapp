import React, { useEffect, useState } from "react";
import * as AUTH_SERVICE from "../services/auth.service";

export default function LanguageSwitcher(props) {
  const [language, setLanguage] = useState(
    window.localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    props.switchLanguage(language);
    window.localStorage.setItem("language", language);
  }, [language]);

  return (
    <div className="languageSwitcher">
      <ul>
        <li
          onClick={() => {
            setLanguage("es");
          }}
        >
          <span className={language === "es" ? "languageSelected" : ""}>
            <img height={'14px'} width={'18pxs'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1125px-Bandera_de_Espa%C3%B1a.svg.png" alt="es" />
          </span>
        </li>
        <li
          onClick={() => {
            setLanguage("en");
          }}
        >
          <span className={language === "en" ? "languageSelected" : ""}>
          <img height={'14px'} width={'18pxs'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png" alt="en" />
          </span>
        </li>
        <li
          onClick={() => {
            setLanguage("pt");
          }}
        >
          <span className={language === "pt" ? "languageSelected" : ""}>
          <img height={'14px'} width={'18pxs'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png" alt="pt" />
          </span>
        </li>
      </ul>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        className="bi bi-box-arrow-right logout-icon"
        viewBox="0 0 16 16"
        onClick={async () => {
          await AUTH_SERVICE.logout();
        }}
      >
        <path
          fillRule="evenodd"
          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
        />
        <path
          fillRule="evenodd"
          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
        />
      </svg>
    </div>
  );
}