import React, { useEffect, useState } from "react";
import "../chatDashboard/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { _id: senderId } = JSON.parse(localStorage.getItem("chat-app-user")).user;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [allmessages, setAllMessages] = useState([]); // Changed to an array

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleMessage = () => {
    // Append the new message to the allmessages array
    setAllMessages([...allmessages, { senderId, message }]);
    setMessage("");
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
        <div className="chatbody">
          {allmessages.map((msg, index) => (
            <p key={index} className={senderId === msg.senderId ? "rt" : "lf"}>
              {msg.message}
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
