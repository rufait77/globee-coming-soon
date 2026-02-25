"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    phase: number;
}

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Initialize particles
        const count = Math.min(60, Math.floor(window.innerWidth / 20));
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.1,
            phase: Math.random() * Math.PI * 2,
        }));

        let time = 0;
        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                // Sinusoidal floating motion
                const offsetX = Math.sin(time + p.phase) * 0.5;
                const offsetY = Math.cos(time * 0.7 + p.phase) * 0.5;

                p.x += p.speedX + offsetX * 0.1;
                p.y += p.speedY + offsetY * 0.1;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Pulsing opacity
                const pulsingOpacity = p.opacity * (0.6 + 0.4 * Math.sin(time * 2 + p.phase));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${pulsingOpacity})`;
                ctx.fill();

                // Small glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${pulsingOpacity * 0.1})`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
