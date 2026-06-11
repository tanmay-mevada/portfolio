import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function MatrixBackground({ 
  fadeOut = false, 
  color = "#1E90FF",     
  headColor = "#E0FFFF",
  bgColor = "#021526", 
  fontSize = 18, 
  speed = 50 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let columns = 0;
    let drops = [];
    let interval;

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(dpr, dpr);

      columns = Math.floor(window.innerWidth / fontSize);
      
      drops = new Array(columns)
        .fill(0)
        .map(() => Math.floor((Math.random() * window.innerHeight * 2) / fontSize) * -1); 
    };

    const draw = () => {
      // 1. Draw the fading background to create the tail
      ctx.globalAlpha = 0.08; 
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // 2. Reset alpha for crisp text
      ctx.globalAlpha = 1.0;
      ctx.font = `${fontSize}px monospace`;
      
      // Forces perfect vertical alignment so fonts don't overlap their own line-heights
      ctx.textBaseline = "top"; 

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        
        // 3. Just draw the single character for this frame (No more overdrawing)
        if (Math.random() > 0.95) {
             ctx.fillStyle = headColor;
        } else {
             ctx.fillStyle = color;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop to the top
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const handleResize = () => {
      clearInterval(interval);
      initCanvas();
      interval = setInterval(draw, speed);
    };

    initCanvas();
    interval = setInterval(draw, speed);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, headColor, bgColor, fontSize, speed]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}

export default MatrixBackground;