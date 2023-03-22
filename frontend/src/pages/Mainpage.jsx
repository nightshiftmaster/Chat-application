import axios from 'axios';
import {
  React, useEffect, useState, useRef, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactScrollableFeed from 'react-scrollable-feed';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import socket from '../socket';
import { AuthContext } from '../hooks/AuthorizeProvider';
import Modalwindow from '../components/Modal';
import Channel from '../components/Channel';
import Message from '../components/Message';
import {
  addChannels,
  selectors as channelSelector,
} from '../slices/channelsSlice';
import {
  addMessages,
  selectors as messagesSelector,
} from '../slices/messagesSlice';
import { openModal } from '../slices/modalSlice';
import { setActiveChannel, channelsSelectors } from '../slices/activeChannelSlice';
import routes from '../routes';

const Main = () => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const { login, userId, getAuthHeaders } = useContext(AuthContext);

  const channelsColl = useSelector(channelSelector.selectAll);
  const messagesColl = useSelector(messagesSelector.selectAll);
  const activeChannel = useSelector(channelsSelectors.selectActive);

  const messagesPerChannel = messagesColl.filter(
    ({ channelId }) => channelId === activeChannel.id,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      login(userId);
      const response = await axios
        .get(routes.usersPath(), getAuthHeaders())
        .catch((e) => e.message);
      const { channels, messages, currentChannelId } = response.data;
      dispatch(setActiveChannel({ id: currentChannelId, name: 'general' }));
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
    };
    fetchChannels();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    filter.loadDictionary('ru');
    const censoredText = filter.clean(text);

    socket.emit('newMessage', {
      body: censoredText,
      channelId: activeChannel.id,
      username: userId.username,
    });
    setText('');
  };

  return (
    <div className="d-flex flex-column bg-light">
      <Modalwindow />
      <ToastContainer />
      <div className="container my-4 rounded shadow">
        <div className="row bg-white flex-md-row" style={{ height: '85vh' }}>
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <b>{t('headers.channels_header')}</b>
              <button
                type="button"
                onClick={() => {
                  dispatch(openModal('adding'));
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
                {channelsColl.map((item) => (
                  <Channel
                    key={item.id}
                    item={item}
                  />
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
                  {messagesPerChannel.map((element) => (
                    <Message key={element.id} element={element} />
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

export default Main;
