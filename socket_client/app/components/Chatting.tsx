"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getNotificationAccess } from "../utils/notification";
import Chat from "./ui/Chat";
import { SocketContext } from "../providers/SocketProvider";

export default function Chatting() {
  const socket = useContext(SocketContext);
  const [notification, setNotification] = useState<{ message: string }[] | []>(
    []
  );

  useEffect(() => {
    socket?.on("message", (data) => {
      setNotification((prev) => [...prev, data]);
    });
    // check and get push notification permission
    getNotificationAccess();
  }, [socket]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = (form.elements.namedItem("chat-input") as HTMLInputElement)
      .value;

    if (!value) return;

    socket?.emit("message", { message: value });
  };

  return (
    <Chat
      id={socket?.id}
      handleSubmit={handleSubmit}
      notification={notification}
    />
  );
}
