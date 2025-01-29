import React, { useEffect, useState } from "react";

const ChatBox = ({ socket }) => {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMsg = { user: socket.id, message: msg };
    socket.emit("send-msg", { newMsg });
    setChats((prev) => [...prev, newMsg]);
    setMsg("");
  };

  useEffect(() => {
    socket.on("new-msg", (data) => {
      if (data) setChats((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col h-full border-l border-slate-700">
      <div className="flex-1 overflow-y-auto">
        <div className="text-xl font-bold  w-full h-10 flex items-center justify-center">
          Chats
        </div>
        {/* <div className="border border-slate-700 p-2">
          <div className="">
            Hello World Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Aliquid nisi consequuntur cumque praesentium sit soluta totam
            ratione tempora, esse impedit?
          </div>
          <div className="text-xs text-gray-400 pt-1">User Name</div>
        </div> */}
        {chats.map((chat, index) => (
          <div className="border border-slate-700 p-2" key={index}>
            <div className="">{chat.message}</div>
            <div className="text-xs text-gray-400 pt-1">{chat.user}</div>
          </div>
        ))}
      </div>
      <div className="h-[10%] flex items-center w-full mb-3">
        <form onSubmit={handleSubmit} className="w-full h-full py-2">
          <input
            className="w-full h-full rounded-s outline-none text-sm px-2 text-gray-800"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type message..."
          />
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
