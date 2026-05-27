import { useState } from "react";
import "./ChatBot.css";

import { IoIosSend } from "react-icons/io";
import { RiResetRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPaperclip } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [file, setFile] = useState(null);

  // CHAT HIỆN TẠI
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", text: "Hello 👋" },
  ]);

  // LỊCH SỬ CHAT
  const [history, setHistory] = useState([]);

  const sendMessage = () => {
    if (input.trim() === "" && !file) return;

    const newMessage = {
      id: Date.now(),
      role: "user",
      text: input,
      fileName: file ? file.name : null,
    };

    // thêm vào chat hiện tại
    setMessages((prev) => [...prev, newMessage]);

    // thêm vào history
    setHistory((prev) => [...prev, newMessage]);

    setInput("");
    setFile(null);
  };

  // CHỈ RESET CHAT HIỆN TẠI
  const resetChat = () => {
    setMessages([{ id: 1, role: "ai", text: "Hello 👋" }]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      {/* Bubble */}
      <div id="bubble">
        <button onClick={() => setOpen(!open)}>
          <IoChatbubbleEllipses />
        </button>
      </div>

      {/* Chat box */}
      {open && (
        <div className="chat-box">
          {/* HEADER */}
          <div className="chat-header">
            <b>StudyHub AI</b>

            <div className="header-actions">
              <button onClick={() => setShowHistory(!showHistory)}>
                <FaHistory />
              </button>

              <button onClick={resetChat}>
                <RiResetRightLine />
              </button>

              <button onClick={() => setOpen(false)}>
                <IoMdClose />
              </button>
            </div>
          </div>

          {/* HISTORY PANEL */}
          {showHistory && (
            <div className="chat-history">
              <h4>Chat History</h4>

              {history.map((m) => (
                <div key={m.id}>
                  <b>{m.role}</b>: {m.text}
                </div>
              ))}
            </div>
          )}

          {/* CHAT BODY */}
          <div className="chat-body">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`msg-row ${
                  m.role === "user" ? "user-row" : "ai-row"
                }`}
              >
                {/* AVATAR */}
                <div className="avatar">{m.role === "user" ? "🧑" : "🤖"}</div>

                {/* MESSAGE */}
                <div
                  className={`message ${
                    m.role === "user" ? "user-msg" : "ai-msg"
                  }`}
                >
                  <b>{m.role}:</b> {m.text}
                  {m.fileName && (
                    <div className="file-tag">
                      <FaPaperclip /> {m.fileName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <label className="upload-btn">
              <FaPaperclip />
              <input type="file" hidden onChange={handleFileChange} />
            </label>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>
              <IoIosSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
