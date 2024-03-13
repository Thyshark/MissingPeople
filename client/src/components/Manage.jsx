import React, { useEffect, useState } from "react";
import axios from "axios";
import Messages from "./Messages";
import { Card } from "react-bootstrap";

const Manage = ({ url }) => {
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:7000/get-messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7000/get-users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const Users = ({ users }) => {
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Username: {user.name} - Email: {user.email} - Role:
            {user.userType}
            {user.role}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="row">
      <div className="col-4">
        <div className="list-group" id="list-tab" role="tablist">
          <a
            className="list-group-item list-group-item-action"
            id="list-users-list"
            data-bs-toggle="list"
            href="#list-users"
            role="tab"
            aria-controls="list-users"
            onClick={() => setShowUsers(true)}
          >
            Manage Users
          </a>
          <Card
            style={{
              width: "80rem",
              marginsRight: "100px",
              cursor: "pointer",
              marginLeft: "400px",
            }}
            className={`mb-4 ${showUsers ? "d-block" : "d-none"}`}
          >
            <Card.Header>Users</Card.Header>
            <Card.Body>
              <Users users={users} />
            </Card.Body>
          </Card>
          <a
            className="list-group-item list-group-item-action"
            id="list-profile-list"
            data-bs-toggle="list"
            href="#list-profile"
            role="tab"
            aria-controls="list-profile"
            onClick={() => {
              setShowMessages(true);
              setShowUsers(false);
            }}
          >
            View Reports
          </a>

          <a
            className="list-group-item list-group-item-action"
            id="list-messages-list"
            data-bs-toggle="list"
            href="#list-messages"
            role="tab"
            aria-controls="list-messages"
            onClick={() => {
              setShowMessages(true);
              setShowUsers(false);
            }}
          >
            Messages
          </a>
          <Card
            style={{
              width: "80rem",
              marginsRight: "100px",
              cursor: "pointer",
              marginLeft: "400px",
            }}
            className={`mb-4 ${showMessages ? "d-block" : "d-none"}`}
          >
            <Card.Header>{showMessages ? "Messages" : "Users"}</Card.Header>
            <Card.Body>
              {showMessages ? (
                <Messages messages={messages} />
              ) : (
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      {user.name} - {user.phone} - {user.email} - {user.message}
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Manage;
