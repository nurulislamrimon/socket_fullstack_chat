"use client";
import {
  FormEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getNotificationAccess } from "../utils/notification";
import Chat from "./ui/Chat";
import { SocketContext } from "../providers/SocketProvider";
import Broadcast from "./ui/Broadcast";
import Display from "./ui/Display";

export default function Chatting() {
  const socket = useContext(SocketContext);
  const [notification, setNotification] = useState<{ message: string }[]>([]);

  useLayoutEffect(() => {
    getNotificationAccess();
  }, []);

  useEffect(() => {
    const handleReceiveMessage = (data: { message: string }) => {
      setNotification((prev) => [...prev, data]);
    };

    // Attach the listener for incoming messages
    socket?.on("receive-message", (data) => {
      handleReceiveMessage(data);
      // pushNotification(data.message);
    });
    socket?.on("broadcast-message", (data) => {
      handleReceiveMessage(data);
      // pushNotification(data.message);
    });

    // Clean up the listener on unmount
    return () => {
      socket?.off("receive-message", handleReceiveMessage);
      socket?.off("broadcast-message", handleReceiveMessage);
    };
  }, [socket]);
  // validate socket connection
  if (!socket) {
    return <div>Socket connection unavailable. Please try again later.</div>;
  }
  // handle chatting
  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const message = (form.elements.namedItem("chat-input") as HTMLInputElement)
      .value;
    const room = (form.elements.namedItem("room-input") as HTMLInputElement)
      .value;

    if (!message) return;

    socket?.emit("send-message", { message: message }, room);
  };

  // handle add to a room
  const handleJoin = (room: string) => {
    socket?.emit("join-room", room, (message: string) => alert(message));
  };
  // handle broadcasting
  const handleBroacastSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = (form.elements.namedItem("chat-input") as HTMLInputElement)
      .value;

    if (!value) return;

    socket?.emit("broadcast-message", { message: value });
  };

  return (
    <>
      <Chat
        id={socket?.id}
        handleSubmit={handleChatSubmit}
        handleJoin={handleJoin}
      />
      <Broadcast handleSubmit={handleBroacastSubmit} />
      <Display notification={notification} />
    </>
  );
}
