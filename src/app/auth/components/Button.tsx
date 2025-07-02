"use client";

import React from "react";
import { useFormikContext } from "formik";

const SubmitButton = () => {
  const { isSubmitting, isValid } = useFormikContext<any>();

  return (
    <div className="flex justify-end btn">
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-[180px] h-[36px] bg-[var(--buttonbg)] text-white rounded-xs text-[13px]
                   hover:bg-[var(--buttonbghover)] transition duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Gözləyin..." : "Daxil olun"}
      </button>
    </div>
  );
};

export default SubmitButton;
