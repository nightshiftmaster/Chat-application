/* eslint-disable react/prop-types */
import React from 'react';

function Message({ element }) {
  return (
    <div className="text-break mb-2" key={element.id}>
      <b>{element.username}</b>
      :
      {' '}
      {element.body}
    </div>
  );
}

export default Message;
