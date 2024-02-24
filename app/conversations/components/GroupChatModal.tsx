"use client";
import ButtonComponent from "@/components/ButtonComponent";
import InputCompnent from "@/components/InputCompnent";
import Modal from "@/components/Modal";
import SelectComponent from "@/components/SelectComponent";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

function GroupChatModal({ onClose, isOpen, users }: GroupChatModalProps) {
  const { push, refresh } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/conversations`, { ...data, isGroup: true })
      .then(() => {
        refresh();
        onClose();
      })
      .catch(() => toast.error(`You Must Add In Group Chat At Least 3 Members`))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <InputCompnent
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <SelectComponent
                disabled={isLoading}
                label={`Members`}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <ButtonComponent
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent disabled={isLoading} type="submit">
            Create
          </ButtonComponent>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;
