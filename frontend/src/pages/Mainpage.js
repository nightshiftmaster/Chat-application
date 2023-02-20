/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChannels,
  selectors as channelSelector,
} from "../slices/channelsSlice";
import {
  // addMessages,
  selectors as messagesSelector,
} from "../slices/messagesSlice";
// import { normalize, schema } from "normalizr";
import { routes } from "../routes";

export const Main = () => {
  const [active, setActive] = useState(null);
  const channels = useSelector(channelSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  const { token } = JSON.parse(localStorage.getItem("userId"));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios
        .get(routes.usersPath(), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((e) => console.log(e.message));
      const { channels, messages, currentChannelId } = response.data;
      setActive(currentChannelId);
      dispatch(addChannels(channels));
      dispatch(addChannels(messages));
    };
    fetchChannels();
  }, [channels, messages]);

  return (
    <div className="d-flex flex-column bg-light">
      <div className="container my-4 rounded shadow">
        <div className="row min-vh-100 bg-white flex-md-row">
          <div className="col-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Каналы</span>
              <button
                type="button"
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
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {channels.map(({ id, name }, i) => {
                return (
                  <li key={id} className="nav-item w-100">
                    <button
                      type="button"
                      className={`w-100 rounded-0 text-start btn ${
                        active === id ? "btn-secondary" : ""
                      }`}
                    >
                      <span className="me-1">#</span>
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># general</b>
                </p>
                <span className="text-muted">0 сообщений</span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5 "
              />
              <div className="mt-auto px-5 py-3">
                <form className="py-1 border rounded-2 ">
                  <div className="input-group has-validation">
                    <input
                      name="body"
                      aria-label="Новое сообщение"
                      placeholder="Введите сообщение..."
                      className="border-0 p-0 ps-2 form-control"
                      // value=""
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
