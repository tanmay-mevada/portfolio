import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function HoverMatrixBackground({
  color = "70, 160, 255",   // Softer blue RGB
  fontSize = 14,            // Lighter, slightly smaller digits
  charSpacing = 20,         // Wider grid spacing for breathing room
  hoverRadius = 70,
  baseOpacity = 0.05
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

      columns = Math.ceil(window.innerWidth / charSpacing);
      rows = Math.ceil(window.innerHeight / charSpacing);

      grid = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          grid.push({
            x: x * charSpacing,
            y: y * charSpacing,
            char: Math.random() > 0.5 ? "1" : "0",
            opacity: baseOpacity,
            targetOpacity: baseOpacity
          });
        }
      }
    };

    const drawBackground = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Base fill
      ctx.fillStyle = "#04101f";
      ctx.fillRect(0, 0, w, h);

      // Soft radial vignette for depth
      const grad = ctx.createRadialGradient(
        w * 0.5, h * 0.4, 0,
        w * 0.5, h * 0.4, Math.max(w, h) * 0.75
      );
      grad.addColorStop(0, "rgba(10, 30, 56, 0.9)");
      grad.addColorStop(1, "rgba(2, 8, 16, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    const draw = () => {
      drawBackground();

      // Lighter weight, refined spacing
      ctx.font = `400 ${fontSize}px monospace`;
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
      const targetCol = Math.floor(mouse.x / charSpacing);
      const targetRow = Math.floor(mouse.y / charSpacing);

      // 2. Draw the grid
      for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        // --- AMBIENT LIVE DATA EFFECT ---
        if (Math.random() > 0.998) {
          cell.char = Math.random() > 0.5 ? "1" : "0";
        }

        // Base opacity calculation (The Flashlight Hover)
        const dx = mouse.x - (cell.x + charSpacing / 2);
        const dy = mouse.y - (cell.y + charSpacing / 2);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        let hoverOpacity = 0;
        if (distanceToMouse < hoverRadius) {
          hoverOpacity = 1 - (distanceToMouse / hoverRadius);
        }

        // Ripple calculation (The Shockwave)
        let rippleOpacity = 0;
        for (let r = 0; r < ripples.length; r++) {
          const rdx = ripples[r].x - (cell.x + charSpacing / 2);
          const rdy = ripples[r].y - (cell.y + charSpacing / 2);
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

        // Ensure the target never drops below the base dull visibility
        cell.targetOpacity = Math.max(baseOpacity, hoverOpacity, rippleOpacity);

        // Smoothly approach the target opacity
        if (cell.targetOpacity > cell.opacity) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.2;
        } else {
          cell.opacity -= 0.03;
          // Stop fading out once it hits the dull baseline
          if (cell.opacity < baseOpacity) {
            cell.opacity = baseOpacity;
          }
        }

        // --- THE PINPOINT CURSOR LOGIC ---
        const cellCol = Math.floor(cell.x / charSpacing);
        const cellRow = Math.floor(cell.y / charSpacing);

        // Check if this specific cell is exactly under the mouse
        const isCursorCell = (cellCol === targetCol && cellRow === targetRow) && (mouse.x > 0);

        // Force the cell under the cursor to be fully visible and near-white
        if (isCursorCell) {
          ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
          ctx.fillText(cell.char, cell.x, cell.y);
        }
        // Draw the rest of the grid in blue based on opacity
        else {
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

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", handleResize);

      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [color, fontSize, charSpacing, hoverRadius, baseOpacity]);

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