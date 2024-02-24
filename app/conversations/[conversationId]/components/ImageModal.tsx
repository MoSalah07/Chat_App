"use client";
import Modal from "@/components/Modal";
import React from "react";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

function ImageModal({ isOpen, onClose, src }: ImageModalProps) {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-96">
        <Image
          src={src}
          alt="Image"
          fill
          className=" object-fill object-center"
        />
      </div>
    </Modal>
  );
}

export default ImageModal;
