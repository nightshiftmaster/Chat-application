/* eslint-disable no-unused-vars */
import { React, useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { AuthContext } from '../hooks/AuthorizeProvider';

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const [serverError, setServerError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currLocation = location.state ? location.state.from.pathname : '/';
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors_feedbacks.validate.name_length'))
      .max(20, t('errors_feedbacks.validate.name_length'))
      .required(t('errors_feedbacks.validate.field_required')),
    password: Yup.string()
      .min(6, t('errors_feedbacks.validate.password_length'))
      .required(t('errors_feedbacks.validate.field_required')),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      t('errors_feedbacks.validate.passwords_did_match'),
    ),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async ({ username, password }) => {
        setDisabled(!disabled);
        try {
          await axios
            .post(routes.signupPath(), { username, password })
            .then((response) => {
              const { token, username } = response.data;
              localStorage.setItem('userId', JSON.stringify(response.data));
              if (token) {
                login(username);
                navigate(currLocation);
                setDisabled(disabled);
              }
              return '';
            });
        } catch (error)  {
          error
            ? setServerError(
              t('errors_feedbacks.validate.userName_alreadyUsed'),
            )
            : setServerError('');
          setDisabled(disabled);
          return 
        }
      }}
    >
      {({ errors, touched, values }) => (
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
                      <h1 className="text-center mb-4">
                        {t('headers.signup_header')}
                      </h1>
                      {Object.keys(values).map((fieldName) => (
                        <div className="form-floating mb-3" key={fieldName}>
                          <Field
                            name={fieldName}
                            className={`form-control ${
                              (touched[fieldName] && errors[fieldName])
                              || serverError
                                ? 'is-invalid'
                                : ''
                            }`}
                            autoComplete={fieldName}
                            required
                            id={fieldName}
                          />
                          <div
                            className="invalid-tooltip"
                            style={{
                              display:
                                (touched[fieldName] && errors[fieldName])
                                || serverError
                                  ? 'block'
                                  : 'none',
                            }}
                          >
                            {fieldName === 'confirmPassword'
                              ? errors[fieldName] || serverError
                              : errors[fieldName]}
                          </div>

                          <label className="form-label" htmlFor={fieldName}>
                            {t(`placeholders.signup.${fieldName}`)}
                          </label>
                        </div>
                      ))}

                      <button
                        type="submit"
                        className="w-100 btn btn-outline-primary"
                        disabled={disabled}
                      >
                        {t('buttons.registration')}
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

export default SignUp;
