import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function GraphMatrixBG({ 
  color = "30, 144, 255", // Dodger Blue RGB
  bgColor = "#021526",    // Your dark background
  fontSize = 20, 
  crosshairColor = "rgba(100, 200, 255, 0.3)" // Subtle, highly transparent blue
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
            opacity: 0.05, 
            targetOpacity: 0.05
          });
        }
      }
    };

    const draw = () => {
      // Draw solid background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      // 1. Update and draw the binary grid
      for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        // Randomly flip 0s and 1s occasionally
        if (Math.random() > 0.995) {
          cell.char = Math.random() > 0.5 ? "1" : "0";
        }

        // Calculate distance from the mouse to the characters
        const dx = mouse.x - (cell.x + fontSize / 2);
        const dy = mouse.y - (cell.y + fontSize / 2);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        // Logic for lighting up the numbers (REMOVED AXIS HIGHLIGHTING)
        if (distanceToMouse < 120) { // Slightly increased radius for a smoother flashlight effect
          // Brightest right at the center of the mouse
          cell.targetOpacity = 1 - (distanceToMouse / 120);
        } else {
          // Fade back into the background
          cell.targetOpacity = 0.05; 
        }

        // Smoothly transition the opacity
        cell.opacity += (cell.targetOpacity - cell.opacity) * 0.15;
        cell.opacity = Math.max(0.05, Math.min(1, cell.opacity)); // Clamp values

        // Draw the character
        if (cell.opacity > 0.06) { 
          if (cell.opacity > 0.8) {
            ctx.fillStyle = `rgba(224, 255, 255, ${cell.opacity})`; // Center is white
          } else {
            ctx.fillStyle = `rgba(${color}, ${cell.opacity})`; // Rest is blue
          }
          ctx.fillText(cell.char, cell.x, cell.y);
        }
      }

      // 2. Draw the Crosshairs (if mouse is on screen)
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = crosshairColor;
        ctx.lineWidth = 0.5; // Razor-thin lines
        
        ctx.beginPath();
        // Horizontal Line
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(window.innerWidth, mouse.y);
        // Vertical Line
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, window.innerHeight);
        ctx.stroke();

        // 3. Draw the Coordinate Tracker next to the mouse
        ctx.fillStyle = "rgba(100, 200, 255, 0.7)"; // Slightly more visible blue for text readability
        ctx.font = "12px monospace";
        const textX = mouse.x + 15;
        const textY = mouse.y - 15;
        ctx.fillText(`[X:${Math.round(mouse.x)} Y:${Math.round(mouse.y)}]`, textX, textY);
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
  }, [color, bgColor, fontSize, crosshairColor]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}

export default GraphMatrixBG;