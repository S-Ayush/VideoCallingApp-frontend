import React, { useEffect, useState } from "react";

var peerConnection = null;
let localStream = null;

function WebRtc({ socket }) {
  const [isCallingPerson, setIsCallingPerson] = useState(null);
  const [remoteOffer, setRemoteOffer] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const roomId = document.location.pathname.substring(1);
  let RemoteAnswer = null;
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        localStream = stream;
        document.getElementById("myVideo").srcObject = stream;
      })
      .catch((err) => {
        console.log("mediaDeviceErr", err);
      });
  }, []);

  useEffect(() => {
    socket.on("createAnswer", (args) => {
      setRemoteOffer(args);
    });
  }, [isCallingPerson]);

  const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(servers);

    const remoteStream = new MediaStream();
    document.getElementById("remoteVideoo").srcObject = remoteStream;

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", { payload: event.candidate, roomId });
        socket.on("setIceCandidate", (args) => {
          addIceCandidate(args);
        });
      }
    };
  };

  const createOffer = async () => {
    await createPeerConnection();

    let offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer).then(() => {
      setIsCallingPerson(true);
      socket.emit("offer", { payload: offer, roomId });
      socket.on("setRemoteAnswer", (args) => {
        addAnswer(args);
      });
    });
  };

  const createAnswer = async (offer) => {
    await createPeerConnection();

    await peerConnection.setRemoteDescription(offer);
    let answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer).then(() => {
      socket.emit("answer", { payload: answer, roomId });
    });
  };

  const addAnswer = async (answer) => {
    if (peerConnection && !peerConnection?.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
      RemoteAnswer = answer;
    }
  };

  const addIceCandidate = (candidate) => {
    if (peerConnection && RemoteAnswer) {
      peerConnection.addIceCandidate(candidate);
      console.log("peerConnection", peerConnection, "candidate", candidate);
    }
  };

  const toogleAudio = (audioState) => {
    if (audioState) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      setIsAudioMuted(false);
    } else {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      setIsAudioMuted(true);
    }
  };

  const toogleVideo = (videoState) => {
    if (videoState) {
      console.log(peerConnection);
      // navigator.mediaDevices
      //   .getUserMedia({ video: true, audio: false })
      //   .then((stream) => {
      //     stream.getVideoTracks().forEach((track) => {
      //       localStream.addTrack(track);
      //     });
      //     setIsVideoMuted(false);
      //   });
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
      setIsVideoMuted(false);
    } else {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });
      setIsVideoMuted(true);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 2 }}>
        <video
          id="myVideo"
          style={{ height: 200, width: 300, background: "black" }}
          autoPlay
          playsInline
        />
        <video
          id="remoteVideoo"
          style={{ height: 200, width: 300, background: "black" }}
          autoPlay
          playsInline
        />
      </div>
      <button onClick={() => toogleAudio(isAudioMuted)}>
        {isAudioMuted ? "Unmute" : "Mute"}
      </button>
      <button onClick={() => toogleVideo(isVideoMuted)}>
        {isVideoMuted ? "Turn Video On" : "Turn Video Off"}
      </button>
      <br />
      <div>
        {!remoteOffer && <button onClick={() => createOffer()}>Call</button>}
        {remoteOffer && !isCallingPerson && (
          <button onClick={() => createAnswer(remoteOffer)}>Answer</button>
        )}
      </div>
    </>
  );
}

export default WebRtc;
