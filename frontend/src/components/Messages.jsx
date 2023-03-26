import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { messageSelector } from '../slices/messagesSlice';
import { channelControlSelector } from '../slices/channelsSlice';

const Messages = ({ setMessageCount }) => {
  const messages = useSelector(messageSelector.selectAll);
  const activeChannel = useSelector(channelControlSelector.selectActive);
  const messagesPerChannel = messages.filter(
    ({ channelId }) => channelId === activeChannel.id,
  );

  useEffect(() => {
    setMessageCount(messagesPerChannel.length);
  }, [messagesPerChannel]);

  return messagesPerChannel.map((message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      :
      {' '}
      {message.body}
    </div>
  ));
};

export default Messages;
