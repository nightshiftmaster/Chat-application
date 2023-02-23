import { React, useContext } from "react";
import { AuthContext } from "../hooks/AuthorizeProvider";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const hidden = !user ? true : false;

  return (
    <nav className="shadow-sm navbar bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Общество Сабаководов
        </a>
        <button
          hidden={hidden}
          type="button"
          onClick={() => logout()}
          className="btn btn-primary"
        >
          Выйти
        </button>
      </div>
    </nav>
  );
};
