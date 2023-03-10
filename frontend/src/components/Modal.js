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
import { useTranslation } from "react-i18next";
import filter from "leo-profanity";

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
  const { t } = useTranslation();
  const alreadyExists = useSelector(channelSelector.selectAll).map(
    ({ name }) => name
  );

  const schema = yup
    .string()
    .required(t("errors_feedbacks.validate.field_required"))
    .min(3, t("errors_feedbacks.validate.name_length"))
    .max(20, t("errors_feedbacks.validate.name_length"))
    .notOneOf(
      alreadyExists,
      t("errors_feedbacks.validate.uniqueName_required")
    );

  filter.loadDictionary("ru");
  const censoredText = filter.clean(text.trim());

  const handleAdd = async () => {
    setDisabled(!disabled);
    try {
      await schema.validate(censoredText);
      socket.on("newChannel", (payload) => {
        setActiveChannel(payload);
        dispatch(addChannel(payload));
      });
      socket.emit("newChannel", { name: censoredText });
      toast.success(t("errors_feedbacks.toasts.createChannel"), {
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
      await schema.validate(censoredText);
      socket.on("renameChannel", (payload) => {
        const { id, name } = payload;
        dispatch(renameChannel({ id, changes: { name: name } }));
      });
      socket.emit("renameChannel", {
        id: selectedChannel.id,
        name: censoredText,
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

  const handleRemove = () => {
    setDisabled(!disabled);
    socket.on("removeChannel", (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.emit("removeChannel", { id: selectedChannel.id });
    toast.success(t("errors_feedbacks.toasts.removeChannel"), {
      position: toast.POSITION.TOP_RIGHT,
    });

    setActiveChannel({ id: 1, name: "general" });
    handleCloseModal();
    setText("");
    setDisabled(disabled);
  };

  useEffect(() => {
    formElement.current?.focus();
  }, [modalShown]);

  const modalByAction = {
    adding: {
      title: t("headers.modal.adding_header"),
      body: (
        <>
          <Form.Label className="visually-hidden">Имя канала</Form.Label>
          <Form.Control
            className={error ? "is-invalid" : ""}
            name="name"
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
          {t("buttons.modal.sent")}
        </Button>
      ),
    },
    removing: {
      title: t("headers.modal.removing_header"),
      body: (
        <div className="container">
          <p className="lead">{t("headers.modal.removing_confirmation")}</p>
        </div>
      ),
      button: (
        <Button variant="danger" onClick={handleRemove} disabled={disabled}>
          {t("buttons.modal.remove")}
        </Button>
      ),
    },
    renaming: {
      title: t("headers.modal.renaming_header"),
      body: (
        <>
          <Form.Control
            className={error ? "is-invalid" : ""}
            ref={formElement}
            defaultValue={selectedChannel.name}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleRename() : setText(e.target.value)
            }
          />
          <div className="invalid-feedback">{error}</div>
        </>
      ),
      button: (
        <Button variant="primary" onClick={handleRename} disabled={disabled}>
          {t("buttons.modal.sent")}
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
        setError("");
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
            setError("");
            handleCloseModal();
            setText("");
          }}
        >
          {t("buttons.modal.cancel")}
        </Button>
        {button}
      </Modal.Footer>
    </Modal>
  );
};
