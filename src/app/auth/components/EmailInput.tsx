"use client";

import React from "react";
import { useField } from "formik";

const EmailInput = ({ name }: { name: string }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name} className="text-[13px] block mb-1">
        İstifadəçi adı və ya e‑poçt ünvanı
      </label>
      <input
        {...field}
        id={name}
        type="email" 
        placeholder="İstifadəçi adı və ya e‑poçt ünvanı"
        className="text-[13px] w-full bg-[var(--palceholder)] h-10 p-3 rounded-[8px] outline-none"
      />
      {meta.touched && meta.error && (
        <span className="text-red-600 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default EmailInput;
