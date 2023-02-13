import React from "react";
import { Link } from "react-router-dom";

const Notfoundpage = () => {
  return (
    <div className="text-center">
      <img
        alt="Страница не найдена"
        className="col-md-3 rounded"
        src="/images/image-notfound.svg"
      />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти <Link to="/">на главную страницу</Link>
      </p>
    </div>
  );
};

export default Notfoundpage;
