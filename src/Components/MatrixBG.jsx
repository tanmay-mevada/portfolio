import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function MatrixBackground({ fadeOut = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01".split("");
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns)
      .fill(0)
      .map(() => Math.floor(Math.random() * canvas.height / fontSize));

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    draw();

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.canvas
  ref={canvasRef}
  className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none mix-blend-screen"
  initial={{ opacity: 1 }}
  animate={{ opacity: fadeOut ? 0 : 1 }}
  transition={{ duration: 1.5 }}
/>

  );
}

export default MatrixBackground;
