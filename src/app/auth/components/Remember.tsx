"use client";

import React from "react";
import { useField } from "formik";

const Remember = ({ name }: { name: string }) => {
  const [field] = useField({ name, type: "checkbox" });

  return (
    <div className="mb-5 flex items-center">
      <input
        {...field}
        id={name}
        type="checkbox"
        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded cursor-pointer"
      />
      <label htmlFor={name} className="ml-2 text-[13px] text-gray-700 cursor-pointer">
        Yadda saxla
      </label>
    </div>
  );
};

export default Remember;
