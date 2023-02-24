import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const Modalwindow = ({ values }) => {
  const { show, handleClose, handleAddChannel } = values;
  const [text, setText] = useState("");

  return (
    <Modal show={show} onHide={handleClose} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control value={text} onChange={(e) => setText(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleAddChannel(text, { setText })}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
