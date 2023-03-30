import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { messageSelector } from './messagesSlice';
import { channelControlSelector } from './channelsSlice';

const activeChannelMessagesSelector = createDraftSafeSelector(
  messageSelector.selectAll,
  channelControlSelector
    .selectActive,
  (messages, activeChannel) => messages.filter(({ channelId }) => channelId === activeChannel.id),
);

export default activeChannelMessagesSelector;
