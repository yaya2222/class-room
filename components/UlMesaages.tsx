"use client";

import { openMessage } from "@/action/messages/openMessage";
import { IMeassge } from "@/types/Message";
import Link from "next/link";
import { useState } from "react";

interface UlMesaagesProps {
  messages: IMeassge[];
}

export default function UlMesaages({ messages }: UlMesaagesProps) {
  const [selectedMessages, setSelectedMessages] = useState<IMeassge[]>([]);
  const lestMessage = selectedMessages.length;
  const selectMesage = async (message: IMeassge) => {
    await openMessage(message._id);
    setSelectedMessages((prev) => {
      const index = prev.findIndex((m) => m._id === message._id);
      if (index !== -1) {
        const newArray = [...prev].slice(index, 1);
        return [...newArray, message];
      } else {
        return [...prev, message];
      }
    });
  };

  const deleteMesaage = ()=>{

  }

  const  confirmationMessage=()=>{

  }

  return (
    <div className="h-full flex gap-2 w-full grow">
      <ul className="flex flex-col max-w-64 grow bg-gray-100 rounded-lg">
        <h3 className="text-center mb-4">Message</h3>
        {messages.map((message) => (
          <li
            key={message._id}
            onClick={() => selectMesage(message)}
            className="flex flex-col p-2 hover:bg-gray-200 hover:cursor-pointer"
          >
            <span>
              {message.title}{" "}
              {!message.messageOpen &&
              !selectedMessages.find((m) => m._id === message._id)
                ? "*"
                : ""}
            </span>
            <span className="text-xs text-gray-500">{message.authorEmail}</span>
          </li>
        ))}
      </ul>
      <div className="grow">
        {!lestMessage && (
          <div className="text-2xl text-center">
            No messages have been selected to display
          </div>
        )}
        {lestMessage !== 0 && (
          <div className="space-y-4 p-4 shadow">
            <div className="flex justify-between items-end">
              <span className="text-2xl">
                {selectedMessages[lestMessage - 1].title}
              </span>
              <span className="text-xs">
                from:
                <span className="text-gray-500">
                  {selectedMessages[lestMessage - 1].authorEmail}
                </span>{" "}
              </span>
            </div>
            <p>{selectedMessages[lestMessage - 1].body}</p>
            <div className="flex items-center justify-between">
            <button onClick={confirmationMessage} className="bg-gradient-to-t from-teal-400 to-blue-500 text-white px-6 py-2 rounded-lg">OK</button>

            <button onClick={deleteMesaage} className="bg-red-500 px-6 py-2 text-white rounded-lg">Delete</button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
