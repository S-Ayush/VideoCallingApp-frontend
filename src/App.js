import "./App.css";
// import WebRtc from "./Sections/WebRtc";
import { useEffect } from "react";
import ChessBoard from "./Sections/Chess/ChessBoard";

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
      {/* <WebRtc socket={socket} /> */}
      <ChessBoard />
    </div>
  );
}

export default App;
