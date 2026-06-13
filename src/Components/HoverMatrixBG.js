import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function InteractiveNetworkBG({ 
  color = "30, 144, 255", // Dodger Blue RGB
  bgColor = "#021526",    // Your dark background
  particleCount = 80,     // Number of nodes on screen
  connectionRadius = 150, // How close nodes must be to draw a line
  mouseRadius = 200       // How far the mouse pushes the nodes
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(dpr, dpr);

      // Adjust particle count slightly based on screen size so mobile isn't crowded
      const area = window.innerWidth * window.innerHeight;
      const responsiveParticleCount = Math.min(particleCount, Math.floor(area / 15000));

      particles = [];
      for (let i = 0; i < responsiveParticleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.5, // Velocity X
          vy: (Math.random() - 0.5) * 1.5, // Velocity Y
          radius: Math.random() * 2 + 1    // Node size
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // 1. Move particles
        p.x += p.vx;
        p.y += p.vy;

        // 2. Bounce off screen edges
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        // 3. Mouse Interaction (Repel)
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          // Push particles away smoothly
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouseRadius - distance) / mouseRadius;
          
          p.x -= forceDirectionX * force * 3;
          p.y -= forceDirectionY * force * 3;
        }

        // 4. Draw the node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.8)`;
        ctx.fill();

        // 5. Draw connections between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let distX = p.x - p2.x;
          let distY = p.y - p2.y;
          let nodeDistance = Math.sqrt(distX * distX + distY * distY);

          if (nodeDistance < connectionRadius) {
            // Opacity fades as nodes get further apart
            let opacity = 1 - (nodeDistance / connectionRadius);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.5})`; // Keep lines subtle
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 6. Draw connection to the mouse cursor
        if (distance < connectionRadius) {
          let opacity = 1 - (distance / connectionRadius);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(224, 255, 255, ${opacity * 0.8})`; // Icy white line to cursor
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
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
  }, [color, bgColor, particleCount, connectionRadius, mouseRadius]);

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

export default InteractiveNetworkBG;