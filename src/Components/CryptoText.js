import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function CryptoText({ text = "" }) {
  const [iteration, setIteration] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setIteration((prev) => {
        const next = prev + 1 / 3;
        if (next >= text.length) {
          clearInterval(interval);
          return text.length;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [text, isInView]);

  const currentIndex = Math.floor(iteration);
  const isComplete = iteration >= text.length;

  return (
    <span ref={ref} className="inline-block font-mono">
      {text.split("").map((char, index) => {
        // Phase 1: Completed or text has been decrypted up to this index
        if (isComplete || index < currentIndex) {
          return (
            <span key={index} className="text-white">
              {char}
            </span>
          );
        }

        // Preserve spacing so the layout doesn't jump
        if (char === " ") {
          return <span key={index}> </span>;
        }

        // Phase 2: The exact character currently being scanned/decoded
        if (index === currentIndex) {
          return (
            <span
              key={index}
              className="text-[#E0FFFF] font-bold drop-shadow-[0_0_8px_rgba(224,255,255,0.8)]"
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </span>
          );
        }

        // Phase 3: Unresolved raw binary data waiting to be decoded
        return (
          <span key={index} className="text-[#1E90FF] opacity-60">
            {Math.random() > 0.5 ? "1" : "0"}
          </span>
        );
      })}
    </span>
  );
}

export default CryptoText;