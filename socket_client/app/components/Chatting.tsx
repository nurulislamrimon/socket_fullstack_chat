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
    socket?.on("receive-message", handleReceiveMessage);
    // Clean up the listener on unmount
    return () => {
      socket?.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = (form.elements.namedItem("chat-input") as HTMLInputElement)
      .value;

    if (!value) return;

    socket?.emit("send-message", { message: value });
  };

  return (
    <Chat
      id={socket?.id}
      handleSubmit={handleSubmit}
      notification={notification}
    />
  );
}
