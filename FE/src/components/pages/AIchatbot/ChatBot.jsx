import { useState } from "react";
import "./ChatBot.css";
import { IoIosSend } from "react-icons/io";
import { RiResetRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", text: "Xin chào 👋" },
  ]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = { id: Date.now(), role: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const resetChat = () => {
    setMessages([{ id: 1, role: "ai", text: "Xin chào 👋" }]);
  };

  return (
    <div>
      <div id="bubble">
        <button onClick={() => setOpen(!open)}>
          <IoChatbubbleEllipses />
        </button>
      </div>
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <b>StudyHub AI</b>

            <button onClick={resetChat}>
              <RiResetRightLine />
            </button>

            <button onClick={() => setOpen(false)}>
              <IoMdClose />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m) => (
              <div key={m.id}>
                <b>{m.role}:</b> {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi trợ lý ảo..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
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
