/* eslint-disable import/no-cycle */
import filter from 'leo-profanity';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { setActiveChannel } from '../slices/activeChannelSlice';
import { closeModal } from '../slices/modalSlice';
import {
  addChannel,
  renameChannel,
  removeChannel,
  selectors as channelSelector,
} from '../slices/channelsSlice';

const socket = io();

function Modalwindow() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const formElement = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const alreadyExists = useSelector(channelSelector.selectAll).map(
    ({ name }) => name,
  );
  const { isOpen, action } = useSelector((state) => state.modal);

  const { selectedChannel } = useSelector((state) => state.activeChannel);

  const schema = yup
    .string()
    .required(t('errors_feedbacks.validate.field_required'))
    .min(3, t('errors_feedbacks.validate.name_length'))
    .max(20, t('errors_feedbacks.validate.name_length'))
    .notOneOf(
      alreadyExists,
      t('errors_feedbacks.validate.uniqueName_required'),
    );

  filter.loadDictionary('ru');
  const censoredText = filter.clean(text.trim());

  const handleAdd = async () => {
    setDisabled(!disabled);
    try {
      await schema.validate(censoredText);
      socket.emit('newChannel', { name: censoredText });
      socket.on('newChannel', (payload) => {
        dispatch(setActiveChannel(payload));
        dispatch(addChannel(payload));
      });
      toast.success(t('errors_feedbacks.toasts.createChannel'), {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(closeModal());
      setText('');
      setError('');
      setDisabled(disabled);
    } catch (e) {
      setError(e.message);
      setDisabled(disabled);
    }
  };

  const handleRename = async () => {
    setDisabled(!disabled);
    try {
      await schema.validate(censoredText);
      socket.emit('renameChannel', {
        id: selectedChannel.id,
        name: censoredText,
      });
      socket.on('renameChannel', (payload) => {
        const { id, name } = payload;
        dispatch(renameChannel({ id, changes: { name } }));
      });
      toast.success(t('errors_feedbacks.toasts.renameChannel'), {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(closeModal());
      setText('');
      setError('');
      setDisabled(disabled);
    } catch (e) {
      setError(e.message);
      setDisabled(disabled);
    }
  };

  const handleRemove = () => {
    setDisabled(!disabled);
    socket.emit('removeChannel', { id: selectedChannel.id });
    toast.success(t('errors_feedbacks.toasts.removeChannel'), {
      position: toast.POSITION.TOP_RIGHT,
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
    dispatch(setActiveChannel({ id: 1, name: 'general' }));
    dispatch(closeModal());
    setText('');
    setDisabled(disabled);
  };

  useEffect(() => {
    formElement.current?.focus();
  }, [isOpen]);

  const modalByAction = {
    adding: {
      title: t('headers.modal.adding_header'),
      body: (
        <>
          <Form.Label className="visually-hidden" htmlFor="nameInput">
            Имя канала
          </Form.Label>
          <Form.Control
            className={error ? 'is-invalid' : ''}
            id="nameInput"
            ref={formElement}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleAdd() : setText(e.target.value))}
          />
          <div className="invalid-feedback">{error}</div>
        </>
      ),
      button: (
        <Button variant="primary" onClick={handleAdd} disabled={disabled}>
          {t('buttons.modal.sent')}
        </Button>
      ),
    },
    removing: {
      title: t('headers.modal.removing_header'),
      body: (
        <div className="container">
          <p className="lead">{t('headers.modal.removing_confirmation')}</p>
        </div>
      ),
      button: (
        <Button variant="danger" onClick={handleRemove} disabled={disabled}>
          {t('buttons.modal.remove')}
        </Button>
      ),
    },
    renaming: {
      title: t('headers.modal.renaming_header'),
      body: (
        <>
          <Form.Label className="visually-hidden" htmlFor="renameInput">
            Имя канала
          </Form.Label>
          <Form.Control
            className={error ? 'is-invalid' : ''}
            id="renameInput"
            ref={formElement}
            defaultValue={selectedChannel?.name}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleRename() : setText(e.target.value))}
          />
          <div className="invalid-feedback">{error}</div>
        </>
      ),
      button: (
        <Button variant="primary" onClick={handleRename} disabled={disabled}>
          {t('buttons.modal.sent')}
        </Button>
      ),
    },
  };

  const { title } = modalByAction[action];
  const { body } = modalByAction[action];
  const { button } = modalByAction[action];

  return (
    <Modal
      show={isOpen}
      onHide={() => {
        dispatch(closeModal());
        setText('');
        setError('');
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        {body}
        <Button
          variant="secondary"
          onClick={() => {
            setError('');
            dispatch(closeModal());
            setText('');
          }}
        >
          {t('buttons.modal.cancel')}
        </Button>
        {button}
      </Modal.Footer>
    </Modal>
  );
}

export default Modalwindow;
