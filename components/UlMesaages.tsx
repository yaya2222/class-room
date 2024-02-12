"use client";

import { useControlMessages } from "@/hooks/useControlMessages";
import { IMessge } from "@/types/Message";

interface UlMesaagesProps {
  messages: IMessge[];
}

export default function UlMesaages({ messages }: UlMesaagesProps) {

  const {listMessage, clickMsg,deleteMsg,displayMsg} = useControlMessages(messages)


  const confirmationMessage = () => {

  };


  return (
    <div className="h-full flex gap-2 w-full grow">
      <ul className="flex flex-col max-w-64 grow bg-gray-100 rounded-lg">
        <h3 className="text-center mb-4">Message</h3>
        {listMessage.map((message,i) => (
          <li
            key={message._id}
            onClick={() => clickMsg(i)}
            className="flex flex-col p-2 hover:bg-gray-200 hover:cursor-pointer"
          >
            <span>
              {message.title}{" "}
              {!message.messageOpen? "*": ""}
            </span>
            <span className="text-xs text-gray-500">{message.authorEmail}</span>
          </li>
        ))}
      </ul>
      <div className="grow">
        {!displayMsg && (
          <div className="text-2xl text-center">
            No messages have been selected to display
          </div>
        )}
        {displayMsg && (
          <div className="space-y-4 p-4 shadow">
            <div className="flex justify-between items-end">
              <span className="text-2xl">
                {displayMsg.title}
              </span>
              <span className="text-xs">
                from:
                <span className="text-gray-500">
                  {displayMsg.authorEmail}
                </span>{" "}
              </span>
            </div>
            <p>{displayMsg.body}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={confirmationMessage}
                className="bg-gradient-to-t from-teal-400 to-blue-500 text-white px-6 py-2 rounded-lg"
              >
                OK
              </button>

              <button
                onClick={()=>deleteMsg(displayMsg._id)}
                className="bg-red-500 px-6 py-2 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
