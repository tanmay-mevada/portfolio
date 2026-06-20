import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function MatrixRingLoader({
    color = "70, 160, 255",   // Same blue as HoverMatrixBackground
    fontSize = 14,
    charSpacing = 20,
    baseOpacity = 0.05,
    ringRadiusRatio = 0.22,   // Ring radius as a fraction of min(width, height)
    ringThickness = 32,       // How thick the glowing band is
    arcSpan = 280,            // Degrees of the fading arc (360 = full circle, no gap)
    rotationSpeed = 1.6       // Degrees added per frame
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let grid = [];
        let columns = 0;
        let rows = 0;
        let w = 0;
        let h = 0;
        let cx = 0;
        let cy = 0;
        let ringRadius = 70;
        let angle = 0;
        let animationFrameId;

        const initCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            w = window.innerWidth;
            h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            ctx.scale(dpr, dpr);

            cx = w / 2;
            cy = h / 2;
            ringRadius = Math.min(w, h) * ringRadiusRatio;

            columns = Math.ceil(w / charSpacing);
            rows = Math.ceil(h / charSpacing);

            grid = [];
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < columns; x++) {
                    grid.push({
                        x: x * charSpacing,
                        y: y * charSpacing,
                        char: Math.random() > 0.5 ? "1" : "0",
                        opacity: baseOpacity
                    });
                }
            }
        };

        const drawBackground = () => {
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

            angle = (angle + rotationSpeed) % 360;

            for (let i = 0; i < grid.length; i++) {
                let cell = grid[i];

                // Ambient live data flicker
                if (Math.random() > 0.998) {
                    cell.char = Math.random() > 0.5 ? "1" : "0";
                }

                const dx = (cell.x + charSpacing / 2) - cx;
                const dy = (cell.y + charSpacing / 2) - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let cellAngle = Math.atan2(dy, dx) * 180 / Math.PI;
                if (cellAngle < 0) cellAngle += 360;
                const cellAngleFromTop = (cellAngle + 90) % 360;

                let ringGlow = 0;
                if (Math.abs(dist - ringRadius) < ringThickness) {
                    const radialFade = 1 - Math.abs(dist - ringRadius) / ringThickness;
                    const posInArc = ((cellAngleFromTop - angle + 360) % 360);
                    let arcFade = 0;
                    if (posInArc <= arcSpan) {
                        arcFade = 1 - (posInArc / arcSpan);
                    }
                    ringGlow = radialFade * arcFade;
                }

                const targetOpacity = Math.max(baseOpacity, ringGlow);
                if (targetOpacity > cell.opacity) {
                    cell.opacity += (targetOpacity - cell.opacity) * 0.6;
                } else {
                    cell.opacity -= 0.05;
                    if (cell.opacity < baseOpacity) cell.opacity = baseOpacity;
                }

                const isBright = ringGlow > 0.75;
                ctx.fillStyle = isBright
                    ? `rgba(255,255,255,${Math.min(1, cell.opacity + 0.2)})`
                    : `rgba(${color}, ${cell.opacity})`;
                ctx.fillText(cell.char, cell.x, cell.y);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            initCanvas();
        };

        initCanvas();
        draw();

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [color, fontSize, charSpacing, baseOpacity, ringRadiusRatio, ringThickness, arcSpan, rotationSpeed]);

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed top-0 left-0 z-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        />
    );
}

export default MatrixRingLoader;