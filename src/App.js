import "./App.css";
import WebRtc from "./Pages/WebRtc";
import { useEffect } from "react";

function App({ socket }) {
  useEffect(() => {
    socket.on("connect", () => {
      localStorage.setItem("socketId", socket.id); // x8WIv7-mJelg7on_ALbx
    });
    setTimeout(() => {
      socket.emit("hello", "world");
    }, 1000);

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
  }, []);
  return (
    <div className="App">
      <WebRtc socket={socket} />
    </div>
  );
}

export default App;
