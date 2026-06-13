import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function HoverMatrixBackground({ 
  color = "30, 144, 255", // Dodger Blue RGB
  bgColor = "#021526",    // Your dark background
  fontSize = 16, 
  hoverRadius = 60      
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
    let ripples = []; 
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
            opacity: 0,
            targetOpacity: 0
          });
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      // 1. Update active ripples (expanding rings)
      for (let r = ripples.length - 1; r >= 0; r--) {
        ripples[r].radius += ripples[r].speed;
        ripples[r].alpha -= 0.02; // Fade out over time

        if (ripples[r].alpha <= 0) {
          ripples.splice(r, 1);
        }
      }

      // Calculate exact grid coordinates of the mouse
      const targetCol = Math.floor(mouse.x / fontSize);
      const targetRow = Math.floor(mouse.y / fontSize);

      // 2. Draw the grid
      for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        // --- AMBIENT LIVE DATA EFFECT ---
        if (Math.random() > 0.99) {
          cell.char = Math.random() > 0.5 ? "1" : "0";
        }

        // Base opacity calculation (The Flashlight Hover)
        const dx = mouse.x - (cell.x + fontSize / 2);
        const dy = mouse.y - (cell.y + fontSize / 2);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        let hoverOpacity = 0;
        if (distanceToMouse < hoverRadius) {
           hoverOpacity = 1 - (distanceToMouse / hoverRadius);
        }

        // Ripple calculation (The Shockwave)
        let rippleOpacity = 0;
        for (let r = 0; r < ripples.length; r++) {
          const rdx = ripples[r].x - (cell.x + fontSize / 2);
          const rdy = ripples[r].y - (cell.y + fontSize / 2);
          const distanceToRippleCenter = Math.sqrt(rdx * rdx + rdy * rdy);
          
          const distanceFromRing = Math.abs(distanceToRippleCenter - ripples[r].radius);

          if (distanceFromRing < ripples[r].thickness) {
            const currentRippleIntensity = (1 - (distanceFromRing / ripples[r].thickness)) * ripples[r].alpha;
            rippleOpacity = Math.max(rippleOpacity, currentRippleIntensity);
            
            // Scramble data heavily as shockwave passes over
            if (Math.random() > 0.7) {
              cell.char = Math.random() > 0.5 ? "1" : "0";
            }
          }
        }

        cell.targetOpacity = Math.max(hoverOpacity, rippleOpacity);

        // Smoothly approach the target opacity
        if (cell.targetOpacity > cell.opacity) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.2; 
        } else {
          cell.opacity -= 0.03; 
        }

        cell.opacity = Math.max(0, Math.min(1, cell.opacity));

        // --- THE PINPOINT CURSOR LOGIC ---
        const cellCol = Math.floor(cell.x / fontSize);
        const cellRow = Math.floor(cell.y / fontSize);
        
        // Check if this specific cell is exactly under the mouse
        const isCursorCell = (cellCol === targetCol && cellRow === targetRow) && (mouse.x > 0);

        // Force the cell under the cursor to be fully visible and pure white
        if (isCursorCell) {
          ctx.fillStyle = `rgba(255, 255, 255, 1)`; 
          ctx.fillText(cell.char, cell.x, cell.y);
        } 
        // Draw the rest of the grid in blue based on opacity
        else if (cell.opacity > 0.01) {
          ctx.fillStyle = `rgba(${color}, ${cell.opacity})`; 
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

    const handleMouseDown = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        speed: 15,       
        thickness: 60,   
        alpha: 1         
      });
    };

    const handleResize = () => {
      initCanvas();
    };

    initCanvas();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown); 
    window.addEventListener("resize", handleResize);
    
    // FIX: Attach mouseleave to 'document' instead of 'window'
    document.addEventListener("mouseleave", handleMouseLeave); 

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", handleResize);
      
      // FIX: Clean up the document listener
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [color, bgColor, fontSize, hoverRadius]);

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

export default HoverMatrixBackground;