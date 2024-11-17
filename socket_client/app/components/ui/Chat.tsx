import React, { FormEvent } from "react";

const Chat = ({
  id,
  handleSubmit,
}: {
  id: string | undefined;
  handleSubmit: (e: FormEvent) => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold">
        {" "}
        Chat id:
        <small className=""> {id}</small>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="chat-input"
          placeholder="Your message here"
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="room-input"
          placeholder="Room ID"
          className="border px-2 py-1"
        />
        <button className="border px-2 py-1">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
