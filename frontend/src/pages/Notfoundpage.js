import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Notfound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt="Страница не найдена"
        className="col-md-3 rounded"
        src="/images/image-notfound.svg"
      />
      <h1 className="h4 text-muted">{t("headers.notfound_header")}</h1>
      <p className="text-muted">
        {t("notfound_page.text")}
        <Link to="/">{t("notfound_page.link_to_main")}</Link>
      </p>
    </div>
  );
};
