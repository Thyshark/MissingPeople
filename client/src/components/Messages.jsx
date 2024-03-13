import React from "react";

const Messages = ({ messages }) => {
  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <div>
              <strong>Full Name:</strong> {message.fullname}
            </div>
            <div>
              <strong>Email:</strong> {message.email}
            </div>
            <div>
              <strong>Contact:</strong> {message.contact}
            </div>
            <div>
              <strong>Message:</strong> {message.message}
            </div>
            <div>
              <strong>Created At:</strong> {message.createdAt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
