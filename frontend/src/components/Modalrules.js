import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalRules = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Правила Общества Сабаководов Любителей</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>1. Любить сабак &#128525;</p>
          <p>2. Любить игратся с сабаками &#128536;</p>
          <p>3. Целоватся с сабаками &#128521;</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Анука Попробуем !
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
