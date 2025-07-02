"use client";

import React, { useState } from "react";
import { useField } from "formik";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PasswordInput = ({ name }: { name: string }) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      <label htmlFor={name} className="text-[13px] block mb-1">
        Şifrə
      </label>
      <input
        {...field}
        id={name}
        type={show ? "text" : "password"}
        placeholder="Şifrə"
        className="text-[13px] w-full bg-[var(--palceholder)] h-10 p-3 pr-10 rounded-[8px] outline-none"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
      >
        {show ? <IoMdEye className="h-5 w-5" /> : <IoMdEyeOff className="h-5 w-5" />}
      </button>
      {meta.touched && meta.error && (
        <span className="text-red-600 text-xs absolute left-0 -bottom-4">{meta.error}</span>
      )}
    </div>
  );
};

export default PasswordInput;
