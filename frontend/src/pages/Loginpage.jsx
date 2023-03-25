import { React, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { AuthContext } from '../hooks/AuthorizeProvider';
import image from '../assets/image-login.jpeg';

const Login = () => {
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const { t } = useTranslation();

  const errors = {
    netWorkError: () => {
      toast.error(t('errors_feedbacks.toasts.network_error'), {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    401: () => {
      setError(t('errors_feedbacks.login.invalid_user'));
    },
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (formData) => axios.post(routes.loginPath(), formData)
      .then((response) => login(response.data))
      .catch((e) => (!e.response.status ? errors.netWorkError() : errors[e.response.status]())),
  });

  return (
    <div className="container-fluid bg-light h-100">
      <ToastContainer />
      <div className="row justify-content-center align-content-center min-vh-100">
        <div className="col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={image}
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">
                  {t('headers.login_header')}
                </h1>
                <div className="form-floating mb-4">
                  <input
                    name="username"
                    autoComplete="username"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('placeholders.login.name')}
                    id="username"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                  />
                  <label htmlFor="username">
                    {t('placeholders.login.name')}
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                    placeholder={t('placeholders.login.password')}
                    type="password"
                    id="password"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: error ? 'block' : 'none',
                    }}
                  >
                    {error}
                  </div>
                  <label className="form-label" htmlFor="password">
                    {t('placeholders.login.password')}
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                  disabled={formik.isSubmitting}
                >
                  {t('buttons.login')}
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('createAccount_section.noaccount_text')}</span>
                <Link to="/signup">
                  {t('createAccount_section.registration_link')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
