import { React, useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthorizeProvider";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState({ id: 1 });
  const { user, logout } = useContext(AuthContext);
  const hidden = !user ? true : false;
  const lngs = {
    en: { nativeName: "English" },
    ru: { nativeName: "Russian" },
  };

  return (
    <nav className="shadow-sm navbar bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t("headers.navbar_header")}
        </a>
        <div className="'flex">
          {Object.keys(lngs).map((lng, i) => (
            <button
              key={i}
              id={i}
              hidden={!hidden}
              className={`btn ${
                active.id === i ? "btn-secondary" : "btn-light"
              }`}
              type="submit"
              onClick={() => {
                i18n.changeLanguage(lng);
                setActive({ id: i });
              }}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
          <button
            hidden={hidden}
            type="button"
            onClick={() => logout()}
            className="btn btn-primary"
          >
            {t("buttons.logout")}
          </button>
        </div>
      </div>
    </nav>
  );
};
