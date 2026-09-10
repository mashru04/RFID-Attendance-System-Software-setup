import React, { useEffect, useState } from "react";

export default function Counter({
  value = 0,
  duration = 1000,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const numericTarget = typeof value === "number" ? value : parseFloat(value) || 0;
  const isFloat = String(value).includes(".");
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let startVal = 0;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (numericTarget - startVal) * ease;

      setDisplayValue(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(numericTarget);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [numericTarget, duration, isFloat]);

  return (
    <span className={`inline-block font-bold tracking-tight tabular-nums ${className}`}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
