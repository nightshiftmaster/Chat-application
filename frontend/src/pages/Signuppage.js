/* eslint-disable no-unused-vars */
import { React, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../hooks/AuthorizeProvider";

export const SignUp = () => {
  const { login } = useContext(AuthContext);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .required("Обязательное поле"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(formData) => {
        fetch("");
      }}
    >
      {({ errors, touched }) => (
        <div className="container-fluid bg-light">
          <div className="row justify-content-center align-content-center min-vh-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img
                      src="images/image-registration.jpg"
                      className="rounded-circle"
                      alt="Регистрация"
                    />
                  </div>
                  <Form className="w-50">
                    <div className="form-group">
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <div className="form-floating mb-3">
                        <Field
                          name="username"
                          className={`form-control ${
                            touched.username && errors.username
                              ? "is-invalid"
                              : ""
                          }`}
                          autoComplete="username"
                          required
                          id="username"
                        />
                        <label className="form-label" htmlFor="username">
                          Имя пользователя
                        </label>
                        {errors.username && touched.username && (
                          <div
                            className="invalid-tooltip"
                            style={{
                              display:
                                touched.username && errors.username
                                  ? "block"
                                  : "none",
                            }}
                          >
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          name="password"
                          className={`form-control ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          autoComplete="password"
                          required
                          id="password"
                        />
                        <div
                          className="invalid-tooltip"
                          style={{
                            display:
                              touched.password && errors.password
                                ? "block"
                                : "none",
                          }}
                        >
                          {errors.password}
                        </div>
                        <label className="form-label" htmlFor="password">
                          Пароль
                        </label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          name="confirmPassword"
                          className={`form-control ${
                            touched.confirmPassword && errors.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          autoComplete="confirmPassword"
                          required
                          id="confirmPassword"
                        />
                        <div
                          className="invalid-tooltip"
                          style={{
                            display:
                              touched.confirmPassword && errors.confirmPassword
                                ? "block"
                                : "none",
                          }}
                        >
                          {errors.confirmPassword}
                        </div>

                        <label className="form-label" htmlFor="confirmPassword">
                          Подтвердите пароль
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-100 btn btn-outline-primary"
                      >
                        Зарегистрироваться
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
