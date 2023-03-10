import { React, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthorizeProvider';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const hidden = !user;
  return (
    <nav className="shadow-sm navbar bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {t('headers.navbar_header')}
        </Link>
        <div className="flex">
          <button
            hidden={hidden}
            type="button"
            onClick={() => {
              logout();
              localStorage.removeItem('userId');
            }}
            className="btn btn-primary"
          >
            {t('buttons.logout')}
          </button>
        </div>
      </div>
    </nav>
  );
};
