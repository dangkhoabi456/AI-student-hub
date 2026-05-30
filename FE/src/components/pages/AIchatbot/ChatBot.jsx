import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import aiChatbotIcon from "../../../assets/imgs/AIchatbot.png";

import { IoIosSend } from "react-icons/io";
import { RiResetRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPaperclip } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // CHAT HIỆN TẠI
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", text: "Hello 👋" },
  ]);

  // LỊCH SỬ CHAT
  const [history, setHistory] = useState([]);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if ((input.trim() === "" && !file) || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: input,
      fileName: file ? file.name : null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setHistory((prev) => [...prev, userMessage]);

    setInput("");
    setFile(null);

    // fake AI typing
    setLoading(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: "I received: " + input,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 800);
  };

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

      {open && (
        <div className="chat-box">
          {/* HEADER */}
          <div className="chat-header">
            <img src={aiChatbotIcon} alt="AI Chatbot" />

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

          {/* HISTORY */}
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
                className={`msg-row ${m.role === "user" ? "user-row" : "ai-row"}`}
              >
                <div className="avatar">
                  {m.role === "user" ? <FaUser /> : <RiRobot2Fill />}
                </div>

                <div
                  className={`message ${
                    m.role === "user" ? "user-msg" : "ai-msg"
                  }`}
                >
                  {m.text}
                  {m.fileName && (
                    <div className="file-tag">
                      <FaPaperclip /> {m.fileName}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* typing indicator */}
            {loading && (
              <div id="load-msg">
                <b>StudyHub Assistant</b> is thinking...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <label className="upload-btn">
              <FaPaperclip />
              <input type="file" hidden onChange={handleFileChange} />
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage} disabled={loading}>
              <IoIosSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
