import React, { FormEvent } from "react";

const Chat = ({
  id,
  handleSubmit,
  notification,
}: {
  id: string | undefined;
  handleSubmit: (e: FormEvent) => void;
  notification:
    | []
    | {
        message: string;
      }[];
}) => {
  return (
    <div className="flex flex-col items-center">
      <p>
        {" "}
        Chat is connected with id <br /> {id}
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="chat-input" className="border px-2 py-1" />
        <button className="border px-2 py-1">Submit</button>
      </form>
      <div className="h-[calc(100vh-100px)] overflow-auto w-full p-2">
        {notification.map((n, k) => (
          <p key={k} className="py-3">
            {n?.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
