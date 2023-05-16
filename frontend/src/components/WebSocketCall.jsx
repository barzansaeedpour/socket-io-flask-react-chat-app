import { useEffect, useState } from "react";

export default function WebSocketCall({ socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    socket.emit("data", message);
    setMessage("");
  };

  const clearChat = () => {
    socket.emit("data", "clear");
    setMessage("");
  };

  useEffect(() => {
    socket.on("data", (data) => {
      if ((data.data === "clear")) {
          setMessages([]);
      } else {
        setMessages([...messages, data.data]);
      }
    });
  }, [socket, messages]);

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <button onClick={clearChat}>clear chat</button>
      <input type="text" value={message} onChange={handleText} />
      <button onClick={handleSubmit}>send</button>
      <ul>
        {messages.map((message, ind) => {
          return <li key={ind}>{message}</li>;
        })}
      </ul>
    </div>
  );
}
