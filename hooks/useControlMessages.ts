"use client";

import { confirmationMessage, deleteMessage, openMessage } from "@/action/messageActions";
import { IMessge } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export const useControlMessages = (list: IMessge[]) => {
  const [listMessage, setListMessage] = useState<IMessge[]>(list);
  const [displayMsg, setDisplayMsg] = useState<IMessge | null>(null);

  const clickMsg = async (index: number) => {
    const msg = listMessage[index];
    setDisplayMsg(msg);
    if (!msg.messageOpen) {
      setListMessage((prev) =>
        [...prev].map((m, i) =>
          i !== index ? m : ({ ...m, messageOpen: true } as IMessge)
        )
      );

      await openMessage(msg._id);
    }
  };

  const deleteMsg = async () => {
    if(!displayMsg) return

    try {
      const res = await deleteMessage(displayMsg._id);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      setDisplayMsg(null);
      setListMessage((prev) => [...prev].filter((m) => m._id !== displayMsg._id));
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const addToClass = async () => {
    if(!displayMsg) return
    const { error, success } = await confirmationMessage(displayMsg)
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success(success)
    }
  }

  return { listMessage, deleteMsg, displayMsg, clickMsg,addToClass };
};
