"use client";
import { clsx } from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

function InputCompnent({
  label,
  id,
  type,
  required,
  disabled,
  register,
  errors,
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-y-1.5">
      <label
        className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={label}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `form-input block w-full rounded-md border-0 py-1.5 dark:bg-gray-900 bg-white dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
}

export default InputCompnent;
