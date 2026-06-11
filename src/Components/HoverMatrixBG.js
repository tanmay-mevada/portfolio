
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function HoverMatrixBackground({ 
  color = "30, 144, 255", // Dodger Blue RGB
  bgColor = "#021526",    // Your dark background
  fontSize = 20, 
  hoverRadius = 150       
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let grid = [];
    let columns = 0;
    let rows = 0;
    let mouse = { x: -1000, y: -1000 }; 
    let animationFrameId;

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(dpr, dpr);

      columns = Math.ceil(window.innerWidth / fontSize);
      rows = Math.ceil(window.innerHeight / fontSize);

      grid = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          grid.push({
            x: x * fontSize,
            y: y * fontSize,
            char: Math.random() > 0.5 ? "1" : "0",
            opacity: 0 
          });
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        const dx = mouse.x - (cell.x + fontSize / 2);
        const dy = mouse.y - (cell.y + fontSize / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < hoverRadius) {
           const targetOpacity = 1 - (distance / hoverRadius);
           cell.opacity += (targetOpacity - cell.opacity) * 0.2; 
        } else {
           cell.opacity -= 0.03; 
        }

        cell.opacity = Math.max(0, Math.min(1, cell.opacity));

        if (cell.opacity > 0.01) {
          if (cell.opacity > 0.8) {
            ctx.fillStyle = `rgba(224, 255, 255, ${cell.opacity})`; 
          } else {
            ctx.fillStyle = `rgba(${color}, ${cell.opacity})`; 
          }
          ctx.fillText(cell.char, cell.x, cell.y);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      initCanvas();
    };

    initCanvas();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, bgColor, fontSize, hoverRadius]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}

export default HoverMatrixBackground;