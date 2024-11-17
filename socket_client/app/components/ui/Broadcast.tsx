import React, { FormEvent } from "react";

const Broadcast = ({
  handleSubmit,
}: {
  handleSubmit: (e: FormEvent) => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold mt-5"> Broadcast</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="chat-input"
          placeholder="Your message here"
          className="border px-2 py-1"
        />
        <button className="border px-2 py-1">Submit</button>
      </form>
    </div>
  );
};

export default Broadcast;
