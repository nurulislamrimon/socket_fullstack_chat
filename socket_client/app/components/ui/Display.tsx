import React from "react";

const Display = ({
  notification,
}: {
  notification:
    | []
    | {
        message: string;
      }[];
}) => {
  return (
    <div>
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

export default Display;
