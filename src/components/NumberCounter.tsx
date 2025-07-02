"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function NumberCounter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const count = useMotionValue(0);

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      onUpdate: (latest) => {
        const formatted = Number(latest)
          .toFixed(decimals)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setDisplay(formatted);
      },
    });
    return controls.stop;
  }, [to, duration, decimals, count]);

  return (
    <motion.span className={className}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
