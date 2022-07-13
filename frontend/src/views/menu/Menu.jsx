/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import MenuHeader from "./menuHeader/MenuHeader";
import * as AUTH_SERVICE from "../../services/auth.service";
import useLanguage from "../../hooks/useLanguage";
import "./Menu.css";

export default function Menu() {
  const language = useLanguage();
  return (
    <div
      className={
        window.innerWidth < 1000
          ? "profile-menu-mobile"
          : "profile-menu-desktop"
      }
      style={{ zIndex: 9999999 }}
    >
      <MenuHeader
        backTo={() => {
          window.location.href = localStorage.previousMenuPage;
        }}
        location={"MENU"}
      />
      <ul>
        <li>
          <a
            onClick={() => {
              window.location.href = "/menu/profile";
            }}
          >
            {language.menu_profile.toUpperCase()}
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              window.location.href = "/menu/settings";
            }}
          >
            {language.menu_settings.toUpperCase()}
          </a>
        </li>
        <li>
          <a onClick={AUTH_SERVICE.logout}>{language.logout.toUpperCase()}</a>
        </li>
      </ul>
    </div>
  );
}
