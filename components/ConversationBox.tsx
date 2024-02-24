"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import clsx from "clsx";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/components/Avatar";
import AvatarGroup from "./AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

function ConversationBox({ data, selected }: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleClick = useCallback(() => {
    push(`/conversations/${data.id}`);
  }, [data.id, push]);

  // [2]
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  // [3]
  const userEmail = useMemo(() => {
    return session?.user?.email;
  }, [session?.user?.email]);

  // [4]
  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  // [5]
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return `Sent An Image`;

    if (lastMessage?.body) return lastMessage.body;

    return `Started a Conversation`;
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 dark:bg-gray-700 dark:hover:bg-gray-500 hover:bg-neutral-300 rounded-lg transition cursor-pointer p-3`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium dark:text-white text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen
                ? "dark:text-neutral-300 text-gray-500"
                : "dark:text-white text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;
