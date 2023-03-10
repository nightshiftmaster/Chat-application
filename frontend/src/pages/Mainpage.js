import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  React, useEffect, useState, useRef, useMemo, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactScrollableFeed from 'react-scrollable-feed';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { AuthContext } from '../hooks/AuthorizeProvider';
import { Modalwindow } from '../components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import {
  addChannels,
  selectors as channelSelector,
} from '../slices/channelsSlice';
import {
  addMessages,
  addMessage,
  selectors as messagesSelector,
} from '../slices/messagesSlice';
import { routes } from '../routes';

const socket = io();

export const Main = () => {
  const [text, setText] = useState('');
  const [modalAction, setModalAction] = useState('adding');
  const [activeChannel, setActiveChannel] = useState({});
  const [modalShown, setModalShow] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState({});
  const inputRef = useRef(null);
  const { login } = useContext(AuthContext);

  const handleCloseModal = () => setModalShow(false);
  const handleShowModal = () => setModalShow(true);

  const channels = useSelector(channelSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  const messagesPerChannel = messages.filter(
    ({ channelId }) => channelId === activeChannel.id,
  );
  const { token, username } = JSON.parse(localStorage.getItem('userId'));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, [messages]);

  useEffect(() => {
    login(username);
    const fetchChannels = async () => {
      const response = await axios
        .get(routes.usersPath(), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((e) => console.log(e.message));
      const { channels, messages, currentChannelId } = response.data;
      setActiveChannel({ id: currentChannelId, name: 'general' });
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
    };
    fetchChannels();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    filter.loadDictionary('ru');
    const censoredText = filter.clean(text);

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.emit('newMessage', {
      body: censoredText,
      channelId: activeChannel.id,
      username,
    });
    setText('');
  };

  const modal = useMemo(() => (
    <Modalwindow
      values={{
        modalShown,
        modalAction,
        handleCloseModal,
        selectedChannel,
        setActiveChannel,
      }}
    />
  ), [modalShown]);

  return (
    <div className="d-flex flex-column bg-light">
      {modal}
      <ToastContainer />
      <div className="container my-4 rounded shadow">
        <div className="row bg-white flex-md-row" style={{ height: '85vh' }}>
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <b>{t('headers.channels_header')}</b>
              <button
                type="button"
                onClick={() => {
                  setModalAction('adding');
                  handleShowModal();
                }}
                className="p-0 text-primary btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ReactScrollableFeed>
              <ul className="nav flex-column nav-pills nav-fill px-2 mb-3  d-block">
                {channels.map(({ id, name, removable }) => (
                  <li key={id} className="nav-item w-100">
                    <div
                      role="group"
                      className="d-flex show dropdown btn-group"
                    >
                      <button
                        onClick={() => setActiveChannel({ id, name, removable })}
                        type="button"
                        className={`w-100 rounded-0 text-start text-truncate btn ${
                          activeChannel.id === id ? 'btn-secondary' : ''
                        }`}
                      >
                        <span className="me-1">#</span>
                        {name}
                      </button>
                      {removable ? (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant={
                                activeChannel.id === id ? 'secondary' : ''
                              }
                            id="dropdown-basic"
                          >
                            <span className="visually-hidden">
                              Управление каналом
                            </span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {['removing', 'renaming'].map((item) => (
                              <Dropdown.Item
                                key={item}
                                onClick={() => {
                                  setModalAction(item);
                                  setSelectedChannel({
                                    id,
                                    name,
                                    removable,
                                  });
                                  handleShowModal();
                                }}
                              >
                                <span>
                                  {' '}
                                  {t(`headers.dropDown_links.${item}`)}
                                </span>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </ReactScrollableFeed>
          </div>

          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
                    {activeChannel.name}
                  </b>
                </p>
                <span className="text-muted">
                  {t('messages_count.message', {
                    count: messagesPerChannel.length,
                  })}
                </span>
              </div>
              <ReactScrollableFeed>
                <div id="messages-box" className="chat-messages px-5">
                  {messagesPerChannel.map((element, index) => (
                    <div className="text-break mb-2" key={index}>
                      <b>{element.username}</b>
                      :
                      {element.body}
                    </div>
                  ))}
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
                      ref={inputRef}
                      onChange={(e) => setText(e.target.value)}
                      aria-label="Новое сообщение"
                      placeholder={t('placeholders.message_input')}
                      className="border-0 p-0 ps-2 form-control"
                      value={text}
                    />
                    <button
                      type="submit"
                      className="btn btn-group-vertical"
                      disabled={text.trim().length === 0}
                    >
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
                        />
                      </svg>
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
