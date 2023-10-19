import React, { useEffect, useState } from "react";
import "../chatDashboard/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { messageRoute } from "../utils/api";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function Dashboard() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState([]);

  useEffect(() => {
    socket.on("chat message", (message) => {
      setAllMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleMessage = async () => {
    try {
      const response = await axios.post(messageRoute, { message });
      if (response.status === 200) {
        setSendMessage((prevSendMessages) => [...prevSendMessages, message]);
        setMessage("");
      } else {
        alert("Error sending the message.");
      }
    } catch (error) {
      alert("Message is required");
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="header">
          <h2 className="headername">Chat Room</h2>
          <FontAwesomeIcon icon={faCamera} className="camicon" />
        </div>
        <hr style={{ backgroundColor: "black", marginTop: "20px" }} />
        <div className="chatField">
          {allMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
          {sendMessage.map((msg, index) => (
            <p key={index} className="send-message">
              {msg}
            </p>
          ))}
        </div>
        <div className="chattype">
          <FontAwesomeIcon icon={faLink} style={{ marginLeft: "5px" }} />
          <input
            type="text"
            placeholder="Write your chat here"
            className="chatinput"
            value={message}
            onChange={handleInputChange}
          />
          <FontAwesomeIcon
            icon={faShare}
            style={{ marginLeft: "5px", cursor: "pointer" }}
            onClick={handleMessage}
          />
        </div>
      </div>
      <div className="right">
        <div className="row">
          <h2>Task Board</h2>
          <div className="col">
            <h3>To Do</h3>
          </div>
          <div className="col">
            <h3>In Progress</h3>
          </div>
          <div className="col">
            <h3>Done</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
