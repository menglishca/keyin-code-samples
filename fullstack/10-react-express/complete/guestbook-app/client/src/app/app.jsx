import { useEffect, useState } from "react";
import "./app.css";

export function App() {
  const [messages, setMessages] = useState([
    { name: "Alice", text: "Hello, world!" },
    { name: "Bob", text: "React is cool." }
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text })
    })
    .then((response) => response.json())
    .then((newMessage) => {
      setMessages([...messages, newMessage]);
      setName("");
      setText("");
    });
  };
  return (
    <main className="main-content">
      <h1>Guestbook</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your message"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <ul className="message-list">
        {messages.map((msg, i) => (
          <li key={i}><strong>{msg.name}</strong>: {msg.text}</li>
        ))}
      </ul>
    </main>
  );
}