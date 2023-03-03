/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  addChannel,
  renameChannel,
  removeChannel,
  selectors as channelSelector,
} from "../slices/channelsSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import * as yup from "yup";

const socket = io();

export const Modalwindow = ({ values }) => {
  const {
    modalShown,
    modalAction,
    handleCloseModal,
    selectedChannel,
    setActiveChannel,
  } = values;
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const formElement = useRef(null);
  const dispatch = useDispatch();
  const alreadyExists = useSelector(channelSelector.selectAll).map(
    ({ name }) => name
  );

  const schema = yup
    .string()
    .required("Обязательное поле")
    .min(3, "От 3 до 20 символов")
    .max(20, "От 3 до 20 символов")
    .notOneOf(alreadyExists, "Должно быть уникальным");

  const handleAdd = async () => {
    setDisabled(!disabled);
    try {
      await schema.validate(text);
      socket.on("newChannel", (payload) => {
        setActiveChannel(payload);
        dispatch(addChannel(payload));
      });
      socket.emit("newChannel", { name: text });
      toast.success("Канал создан", {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleCloseModal();
      setText("");
      setError("");
      setDisabled(disabled);
    } catch (e) {
      setError(e.message);
      setDisabled(disabled);
    }
  };

  const handleRename = async () => {
    setDisabled(!disabled);
    try {
      await schema.validate(text);
      socket.on("renameChannel", (payload) => {
        const { id, name } = payload;
        dispatch(renameChannel({ id, changes: { name: name } }));
      });
      socket.emit("renameChannel", { id: selectedChannel.id, name: text });
      handleCloseModal();
      setText("");
      setError("");
      setDisabled(disabled);
    } catch (e) {
      setError(e.message);
      setDisabled(disabled);
    }
  };

  const handleRemove = () => {
    setDisabled(!disabled);
    socket.on("removeChannel", (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.emit("removeChannel", { id: selectedChannel.id });
    toast.success("Канал удалён", {
      position: toast.POSITION.TOP_RIGHT,
    });

    setActiveChannel({ id: 1, name: "general" });
    handleCloseModal();
    setText("");
    setDisabled(disabled);
  };

  useEffect(() => {
    formElement.current?.focus();
  });

  const modalByAction = {
    adding: {
      title: "Добавить канал",
      body: (
        <>
          <Form.Control
            className={error ? "is-invalid" : ""}
            ref={formElement}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleAdd() : setText(e.target.value)
            }
          />
          <div className="invalid-feedback">{error}</div>
        </>
      ),
      button: (
        <Button variant="primary" onClick={handleAdd} disabled={disabled}>
          Отправить
        </Button>
      ),
    },
    removing: {
      title: "Удалить канал",
      body: <p className="lead">Уверены?</p>,
      button: (
        <Button variant="danger" onClick={handleRemove} disabled={disabled}>
          Удалить
        </Button>
      ),
    },
    renaming: {
      title: "Переиминовать канал",
      body: (
        <Form.Control
          ref={formElement}
          defaultValue={selectedChannel.name}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" ? handleAdd() : setText(e.target.value)
          }
        />
      ),
      button: (
        <Button variant="primary" onClick={handleRename} disabled={disabled}>
          Отправить
        </Button>
      ),
    },
  };

  const title = modalByAction[modalAction].title;
  const body = modalByAction[modalAction].body;
  const button = modalByAction[modalAction].button;

  return (
    <Modal
      show={modalShown}
      onHide={() => {
        handleCloseModal();
        setText("");
      }}
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        {body}
        <Button
          variant="secondary"
          onClick={() => {
            handleCloseModal();
            setText("");
          }}
        >
          Отменить
        </Button>
        {button}
      </Modal.Footer>
    </Modal>
  );
};
