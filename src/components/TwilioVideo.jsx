import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "twilio-video";

const TwilioVideo = () => {
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef();

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/video-token",
        {
          identity,
          room: roomName,
        }
      );

      const token = response.data.token;
      console.log(token);

      const room = await connect(token, {
        name: roomName,
        video: { width: 640 },
        audio: true,
      });
      console.log(room);

      setRoom(room);
      setIsConnected(true);

      room.on("participantConnected", (participant) => {
        console.log(`Participant "${participant.identity}" connected`);
        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;
            videoRef.current.appendChild(track.attach());
          }
        });
      });

      room.on("participantDisconnected", (participant) => {
        console.log(`Participant "${participant.identity}" disconnected`);
      });
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const handleLeaveRoom = () => {
    if (room) {
      room.disconnect();
      setIsConnected(false);
      setRoom(null);
    }
  };

  return (
    <div>
      <h2>Video Call</h2>
      {!isConnected ? (
        <div>
          <input
            type="text"
            placeholder="Enter your identity"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <div
            ref={videoRef}
            id="video-stream"
            style={{ width: "640px", height: "480px" }}
          />
          <button onClick={handleLeaveRoom}>Leave Room</button>
        </div>
      )}
    </div>
  );
};

export default TwilioVideo;
