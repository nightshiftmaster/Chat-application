import { React } from 'react';
import { useSelector } from 'react-redux';
import activeChannelMessagesSelector from '../slices/commonSelectors';

const Messages = () => useSelector(activeChannelMessagesSelector).map((message) => (
  <div className="text-break mb-2" key={message.id}>
    <b>{message.username}</b>
    :
    {' '}
    {message.body}
  </div>
));

export default Messages;
