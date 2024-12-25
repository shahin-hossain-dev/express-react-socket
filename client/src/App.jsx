import { io } from "socket.io-client";
const socket = io("http://localhost:3000"); // Connect to the Express server

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Hello</h2>
    </div>
  );
};

export default App;
