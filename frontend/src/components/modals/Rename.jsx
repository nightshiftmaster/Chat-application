/* eslint-disable react/prop-types */
import {
  React, useState,
} from 'react';
import {
  Button, Modal, Form as FormReact,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { ModalInputSchema } from '../../utils/validators';
import socket from '../../utils/socket';

const Rename = ({ onClose, modalData }) => {
  const { item } = modalData;
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  filter.loadDictionary('ru');

  const submitForm = async ({ text }) => {
    const censoredText = filter.clean(text.trim());
    try {
      await ModalInputSchema(censoredText);
      socket.emit('renameChannel', {
        id: item.id,
        name: censoredText,
      });
      toast.success(t('errors_feedbacks.toasts.renameChannel'), {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(onClose());
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Formik
      initialValues={{ text: item.name }}
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
            <Modal.Title>{t('headers.modal.renaming_header')}</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Form className="w-100" onSubmit={handleSubmit}>
              <FormReact.Label className="visually-hidden" htmlFor="text">
                Имя канала
              </FormReact.Label>
              <Field
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

export default Rename;
