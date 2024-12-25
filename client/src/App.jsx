import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000"); // Connect to the Express server

const App = () => {
  const [message, setMessage] = useState("");
  const [clock, setClock] = useState("");
  //received message with (on) method
  // first parameter (message) is event name. event দিয়ে socket decide করে কোন event এ hit করবে।
  socket.on("message", (data) => {
    setMessage(data);
  });
  socket.on("connector", (data) => {
    console.log(data);
  });
  socket.on("clock", (data) => {
    setClock(data);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    // socket.send(e.target.message.value); //send data with 'send' method
    socket.emit("message", e.target.message.value); // send data with 'message' event
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Hello</h2>
      <h2>clock: {clock}</h2>
      <div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            name="message"
            id=""
            className="border py-1 px-2"
          />
          <button
            type="submit"
            className="border bg-sky-600 text-white font-medium px-3 py-1 rounded"
          >
            Send
          </button>
        </form>
      </div>
      <ul>
        <li>{message}</li>
      </ul>
    </div>
  );
};

export default App;
