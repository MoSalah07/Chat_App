"use client";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "./Avatar";
import ProfileDrawer from "@/app/conversations/[conversationId]/components/ProfileDrawer";
import AvatarGroup from "./AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? `Online` : `Offline`;
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={dropDown}
        onClose={() => setDropDown(false)}
      />
      <div className="dark:bg-gray-700 bg-white w-full flex justify-between items-center border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
            href={`/conversations`}
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light dark:text-white text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDropDown(true)}
          className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
        />
      </div>
    </>
  );
}

export default Header;
