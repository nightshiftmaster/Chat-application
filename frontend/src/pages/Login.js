import React from "react";
import { useFormik } from "formik";
// import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container-fluid bg-light">
      <div className="row justify-content-center align-content-center min-vh-100">
        <div className="col-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-6 d-flex align-items-center justify-content-center">
                <img
                  src="images/image-login.jpeg"
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <form className="col-6" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-4">
                  <input
                    name="username"
                    autoComplete="username"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="password">
                    Пароль
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  Войти
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
