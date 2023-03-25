/* eslint-disable react/prop-types */
import {
  React,
} from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import socket from '../../utils/socket';
import { setActiveChannel } from '../../slices/channelsSlice';

const Remove = ({ onClose, modalData }) => {
  const { item } = modalData;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemove = () => {
    socket.emit('removeChannel', { id: item.id });
    toast.success(t('errors_feedbacks.toasts.removeChannel'), {
      position: toast.POSITION.TOP_RIGHT,
    });
    dispatch(setActiveChannel({ id: 1, name: 'general' }));
    dispatch(onClose());
  };

  return (
    <Modal
      show
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('headers.modal.removing_header')}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <div className="container">
          <p className="lead">{t('headers.modal.removing_confirmation')}</p>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            dispatch(onClose());
          }}
        >
          {t('buttons.modal.cancel')}
        </Button>
        <Button variant="danger" onClick={() => handleRemove()}>
          {t('buttons.modal.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
