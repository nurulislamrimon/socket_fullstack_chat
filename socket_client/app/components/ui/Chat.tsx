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
      <p>
        {" "}
        Chat is connected with id <br /> {id}
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="chat-input" className="border px-2 py-1" />
        <button className="border px-2 py-1">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
