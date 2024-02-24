"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import InputCompnent from "../InputCompnent";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import ButtonComponent from "../ButtonComponent";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

function SettingsModal({ currentUser, onClose, isOpen }: SettingsModalProps) {
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/settings`, data)
      .then(() => {
        refresh();
        onClose();
      })
      .catch(() => toast.error(`Something went wrong`))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 dark:text-white text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 dark:text-white text-gray-600">
              Edit your public information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <InputCompnent
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="w-12 h-12">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full object-center object-fill w-full h-full"
                      src={
                        image || currentUser?.image || "/images/placeholder.jpg"
                      }
                      alt="Avatar"
                    />
                  </div>

                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="qfooxdbn"
                  >
                    <ButtonComponent
                      disabled={isLoading}
                      secondary
                      type="button"
                    >
                      Change Image
                    </ButtonComponent>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <ButtonComponent disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </ButtonComponent>
            <ButtonComponent disabled={isLoading} type="submit">
              Submit
            </ButtonComponent>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsModal;
