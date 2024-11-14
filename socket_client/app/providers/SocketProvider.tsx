"use client";
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<null | Socket>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  useEffect(() => {
    const socketIO = io("http://localhost:5000");

    socketIO.on("connect", () => {
      setSocket(socketIO);
      console.log("connection successfull!");
    });

    return () => {
      socketIO.off("notification");
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
