"use client";
import { User } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-hidden border-r border-gray-300 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold dark:text-white text-neutral-800 py-4">
            People
          </div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
}

export default UserList;
