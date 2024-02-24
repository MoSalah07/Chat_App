"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";
import LoadingModal from "./LoadingModal";

interface UserBoxProps {
  user: User;
}

function UserBox({ user }: UserBoxProps) {
  const { push } = useRouter();
  const [isLoading, setIsloading] = useState<Boolean>(false);

  const handleClick = useCallback(async () => {
    setIsloading(true);
    try {
      const { data } = await axios.post(`/api/conversations`, {
        userId: user.id,
      });
      push(`/conversations/${data.id}`);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  }, [push, user]);
  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 dark:bg-gray-700 hover:dark:bg-gray-600 dark:text-white text-neutral-700 bg-white p-3 hover:bg-neutral-300 rounded-lg transition cursor-pointer"
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium dark:text-white text-gray-900">
                {user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBox;
