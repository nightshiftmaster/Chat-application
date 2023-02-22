import { React, useContext } from "react";
import { AuthContext } from "../hooks/AuthorizeProvider";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="shadow-sm navbar bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        <button
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
