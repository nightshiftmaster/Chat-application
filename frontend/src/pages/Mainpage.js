/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modalwindow } from "../components/Modal";
import ReactScrollableFeed from "react-scrollable-feed";
import {
  addChannels,
  addChannel,
  selectors as channelSelector,
} from "../slices/channelsSlice";
import {
  addMessages,
  addMessage,
  selectors as messagesSelector,
} from "../slices/messagesSlice";
import { routes } from "../routes";
import { io } from "socket.io-client";

const socket = io();

export const Main = () => {
  const [text, setText] = useState("");
  const [activeChannel, setactiveChannel] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const channels = useSelector(channelSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  const messagesPerChannel = messages.filter(
    ({ channelId }) => channelId === activeChannel.id
  );
  const { token, username } = JSON.parse(localStorage.getItem("userId"));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios
        .get(routes.usersPath(), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((e) => console.log(e.message));
      const { channels, messages, currentChannelId } = response.data;
      setactiveChannel({ id: currentChannelId, name: "general" });
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
    };
    fetchChannels();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    socket.emit("newMessage", {
      body: text,
      channelId: activeChannel.id,
      username,
    });
    setText("");
  };

  const handleAddChannel = (text) => (e) => {
    e.preventDefault();
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });
    socket.emit("newChannel", { name: text });
    handleClose();
  };

  return (
    <div className="d-flex flex-column bg-light">
      <Modalwindow values={{ show, handleClose, handleAddChannel }} />
      <div className="container my-4 rounded shadow">
        <div className="row bg-white flex-md-row" style={{ height: "85vh" }}>
          <div className="col-4 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <b>Каналы</b>
              <button
                type="button"
                onClick={() => handleShow()}
                className="p-0 text-primary btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ReactScrollableFeed>
              <ul className="nav flex-column nav-pills nav-fill px-2">
                {channels.map(({ id, name }) => {
                  return (
                    <li key={id} className="nav-item w-100">
                      <button
                        onClick={() => setactiveChannel({ id, name })}
                        type="button"
                        className={`w-100 rounded-0 text-start text-truncate btn ${
                          activeChannel.id === id ? "btn-secondary" : ""
                        }`}
                      >
                        <span className="me-1">#</span>
                        {name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </ReactScrollableFeed>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {activeChannel.name}</b>
                </p>
                <span className="text-muted">0 сообщений</span>
              </div>
              <ReactScrollableFeed>
                <div id="messages-box" className="chat-messages px-5">
                  {messagesPerChannel.map((element, index) => {
                    return (
                      <div className="text-break mb-2" key={index}>
                        <b>{element.username}</b>: {element.body}
                      </div>
                    );
                  })}
                </div>
              </ReactScrollableFeed>
              <div className="mt-auto px-5 py-3">
                <form
                  className="py-1 border rounded-2 "
                  onSubmit={handleSubmitMessage}
                >
                  <div className="input-group has-validation">
                    <input
                      name="body"
                      onChange={(e) => setText(e.target.value)}
                      aria-label="Новое сообщение"
                      placeholder="Введите сообщение..."
                      className="border-0 p-0 ps-2 form-control"
                      value={text}
                    />
                    <button type="submit" className="btn btn-group-vertical">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        ></path>
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
