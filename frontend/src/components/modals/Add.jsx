/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import {
  React, useRef, useEffect, useState,
} from 'react';
import {
  Button, Modal, Form as FormReact,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { socket } from '../../init';
import { setActiveChannel, channelSelector } from '../../slices/channelsSlice';

const Add = ({ onClose }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const inputElement = useRef(null);
  filter.loadDictionary('ru');

  const alreadyExists = useSelector(channelSelector.selectAll).map(
    ({ name }) => name,
  );

  const schema = yup
    .string()
    .required(t('errors_feedbacks.validate.field_required'))
    .min(3, t('errors_feedbacks.validate.name_length'))
    .max(20, t('errors_feedbacks.validate.name_length'))
    .notOneOf(
      alreadyExists,
      t('errors_feedbacks.validate.uniqueName_required'),
    );

  const submitForm = async ({ text }) => {
    const censoredText = filter.clean(text.trim());
    try {
      await schema.validate(censoredText);
      socket.emit('newChannel', { name: censoredText });
      toast.success(t('errors_feedbacks.toasts.createChannel'), {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setActiveChannel({ name: censoredText }));
      dispatch(onClose());
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={({ text }) => submitForm({ text })}
    >
      { ({
        touched, isSubmitting, handleSubmit,
      }) => (
        <Modal
          show
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('headers.modal.adding_header')}</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Form className="w-100" onSubmit={handleSubmit}>
              <FormReact.Label className="visually-hidden" htmlFor="text">
                Имя канала
              </FormReact.Label>
              <Field
                innerRef={inputElement}
                name="text"
                className={`form-control ${
                  error
                    ? 'is-invalid'
                    : ''
                }`}
                autoComplete="text"
                required
                id="text"
              />
              <div
                className="invalid-feedback"
                style={{
                  display:
                error
                  ? 'block'
                  : 'none',
                }}
              >
                {error}
              </div>
            </Form>
            <Button
              disabled={isSubmitting}
              variant="secondary"
              onClick={() => {
                dispatch(onClose());
              }}
            >
              {t('buttons.modal.cancel')}
            </Button>
            <Button variant="primary" onClick={() => handleSubmit(touched.text)} disabled={isSubmitting}>
              {t('buttons.modal.sent')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};
export default Add;
