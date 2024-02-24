"use client";

import ButtonComponent from "@/components/ButtonComponent";
import Modal from "@/components/Modal";
import useConversation from "@/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const { push, refresh } = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        push(`/conversations`);
        refresh();
      })
      .catch(() => toast.error(`something went wrong`))
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, push, refresh]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className={`text-base font-semibold leading-6 dark:text-white text-gray-900`}
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p>
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <ButtonComponent danger disabled={isLoading} onClick={onDelete}>
          Delete
        </ButtonComponent>
        <ButtonComponent secondary disabled={isLoading} onClick={onClose}>
          Cancel
        </ButtonComponent>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
