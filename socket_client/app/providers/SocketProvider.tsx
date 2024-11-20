"use client";
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<null | {
  socket: Socket | null;
  nspaceSocket: Socket | null;
}>({ socket: null, nspaceSocket: null });

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [nspaceSocket, setNspaceSocket] = useState<null | Socket>(null);
  useEffect(() => {
    const socketIO = io("http://localhost:5000");
    const namespaceIO = io("http://localhost:5000/my-namespace");

    socketIO.on("connect", () => {
      setSocket(socketIO);
      console.log("connection successfull!");
    });

    namespaceIO.on("connect", () => {
      setNspaceSocket(namespaceIO);
      console.log("namespace connection successfull!");
    });

    return () => {
      socketIO.off("notification");
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, nspaceSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
