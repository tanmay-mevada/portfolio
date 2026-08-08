import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function HoverMatrixBackground({
  color = "70, 160, 255",
  fontSize = 14,
  charSpacing = 20,
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
      const vvp = window.visualViewport;

      const w = vvp ? vvp.width : window.innerWidth;
      const h = vvp ? vvp.height : window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = vvp ? `${vvp.offsetLeft}px` : "0px";
      canvas.style.top = vvp ? `${vvp.offsetTop}px` : "0px";

      // Reset transform first to prevent stacking on resize
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      columns = Math.ceil(w / charSpacing);
      rows = Math.ceil(h / charSpacing);

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
      const vvp = window.visualViewport;
      const w = vvp ? vvp.width : window.innerWidth;
      const h = vvp ? vvp.height : window.innerHeight;

      ctx.fillStyle = "#04101f";
      ctx.fillRect(0, 0, w, h);

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

      ctx.font = `400 ${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let r = ripples.length - 1; r >= 0; r--) {
        ripples[r].radius += ripples[r].speed;
        ripples[r].alpha -= 0.02;
        if (ripples[r].alpha <= 0) {
          ripples.splice(r, 1);
        }
      }

      const targetCol = Math.floor(mouse.x / charSpacing);
      const targetRow = Math.floor(mouse.y / charSpacing);

      for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        if (Math.random() > 0.998) {
          cell.char = Math.random() > 0.5 ? "1" : "0";
        }

        const dx = mouse.x - (cell.x + charSpacing / 2);
        const dy = mouse.y - (cell.y + charSpacing / 2);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        let hoverOpacity = 0;
        if (distanceToMouse < hoverRadius) {
          hoverOpacity = 1 - distanceToMouse / hoverRadius;
        }

        let rippleOpacity = 0;
        for (let r = 0; r < ripples.length; r++) {
          const rdx = ripples[r].x - (cell.x + charSpacing / 2);
          const rdy = ripples[r].y - (cell.y + charSpacing / 2);
          const distanceToRippleCenter = Math.sqrt(rdx * rdx + rdy * rdy);
          const distanceFromRing = Math.abs(distanceToRippleCenter - ripples[r].radius);

          if (distanceFromRing < ripples[r].thickness) {
            const currentRippleIntensity =
              (1 - distanceFromRing / ripples[r].thickness) * ripples[r].alpha;
            rippleOpacity = Math.max(rippleOpacity, currentRippleIntensity);

            if (Math.random() > 0.7) {
              cell.char = Math.random() > 0.5 ? "1" : "0";
            }
          }
        }

        cell.targetOpacity = Math.max(baseOpacity, hoverOpacity, rippleOpacity);

        if (cell.targetOpacity > cell.opacity) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.2;
        } else {
          cell.opacity -= 0.03;
          if (cell.opacity < baseOpacity) {
            cell.opacity = baseOpacity;
          }
        }

        const cellCol = Math.floor(cell.x / charSpacing);
        const cellRow = Math.floor(cell.y / charSpacing);
        const isCursorCell =
          cellCol === targetCol && cellRow === targetRow && mouse.x > 0;

        if (isCursorCell) {
          ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
          ctx.fillText(cell.char, cell.x, cell.y);
        } else {
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

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseleave", handleMouseLeave);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      }
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