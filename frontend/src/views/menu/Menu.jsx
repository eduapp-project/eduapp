/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import MenuSettings from "./menu-settings/MenuSettings";
import MenuHeader from "./menuHeader/MenuHeader";
import API from "../../API";
import ProfileSettings from "./profileOptions/ProfileSettings";

export default function Menu(props) {
  const openMenuSettings = () => {
    document
      .getElementsByClassName("MenuSettings__main-container")[0]
      .classList.remove("MenuSettings__hidden");
  };

  const openProfileSettings = () => {
    document
      .getElementsByClassName("profileSettings_container")[0]
      .classList.remove("profileSettings__hidden");
    document.body.classList.remove("overflow-hide");
    document.body.classList.add("overflow-show");
  };

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
          props.handleCloseMenu();
        }}
        location={"MENU"}
      />
      <ul>
        <li>
          <a
            onClick={() => {
              openProfileSettings();
            }}
          >
            PROFILE
          </a>
          <ProfileSettings />
        </li>
        <li>
          <a
            onClick={() => {
              openMenuSettings();
            }}
          >
            Settings
          </a>
          <MenuSettings />
        </li>
        <li>
          <a onClick={API.logout}>Log out</a>
        </li>
      </ul>
    </div>
  );
}
