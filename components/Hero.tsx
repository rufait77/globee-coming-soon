"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import EmailForm from "./EmailForm";

// Lazy load Globe3D to avoid SSR issues with Three.js
const Globe3D = dynamic(() => import("./Globe3D"), {
    ssr: false,
    loading: () => (
        <div className="w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-accent-cyan/20 animate-pulse" />
        </div>
    ),
});

const headlineWords = ["Be", "first", "to"];
const highlightWords = ["land", "and", "connect"];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />

            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
                {/* Headline */}
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    <span className="block">
                        {headlineWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                                className="inline-block mr-3 text-white"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                    <span className="block">
                        {highlightWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.5, delay: 0.64 + i * 0.08 }}
                                className="inline-block mr-3 gradient-text-animated"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                </h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-base sm:text-lg text-white/50 mb-10 max-w-lg mx-auto"
                >
                    Get early access + an exclusive launch discount
                </motion.p>

                {/* 3D Globe */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 1.2,
                        delay: 0.5,
                        ease: [0.16, 1, 0.3, 1], // expo out
                    }}
                    className="mb-10"
                >
                    <Suspense
                        fallback={
                            <div className="w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full border border-accent-cyan/20 animate-pulse" />
                            </div>
                        }
                    >
                        <Globe3D />
                    </Suspense>
                </motion.div>

                {/* Email Form */}
                <EmailForm variant="hero" />
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
                >
                    <div className="w-1 h-2 bg-white/40 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
