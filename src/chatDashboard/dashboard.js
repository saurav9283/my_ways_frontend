import React, { useState } from "react";
import "../chatDashboard/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLink, faShare } from "@fortawesome/free-solid-svg-icons"; // Import the solid camera, link, and share icons

function Dashboard() {
  const [message, setMessage] = useState("");

  const handleMessage = () => {
    alert(message);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="header">
          <h2>Chat Room</h2>
          <FontAwesomeIcon icon={faCamera} className="camicon" />
        </div>
        <hr style={{ backgroundColor: "black", marginTop: "20px" }} />
        <div className="chattype">
          <FontAwesomeIcon icon={faLink} style={{ marginLeft: "5px" }} />
          <input
            type="text"
            placeholder="Write your chat here"
            className="chatinput"
            value={message} // Set the input value to the 'message' state
            onChange={handleInputChange} // Handle input changes
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
