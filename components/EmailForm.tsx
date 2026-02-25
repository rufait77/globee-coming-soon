"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmailFormProps {
    variant?: "hero" | "bottom";
}

export default function EmailForm({ variant = "hero" }: EmailFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || status === "loading") return;

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus("error");
            setMessage("Please enter a valid email address");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setMessage(data.already_subscribed ? "You're already on the list!" : "You're on the list! 🎉");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong. Try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Connection error. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center py-4"
                    >
                        {/* Checkmark animation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                            }}
                        >
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>
                        <p className="text-lg font-semibold text-white">{message}</p>

                        {/* Confetti particles */}
                        <div className="relative h-8 mt-2">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                                    animate={{
                                        y: -(Math.random() * 60 + 20),
                                        x: (Math.random() - 0.5) * 120,
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                                    className="absolute left-1/2 top-0 w-2 h-2 rounded-full"
                                    style={{
                                        background: ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b"][i % 4],
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: variant === "hero" ? 1.2 : 0 }}
                        className="relative"
                    >
                        <div className="glass-strong rounded-full overflow-hidden flex items-center p-1.5">
                            <input
                                ref={inputRef}
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status === "error") setStatus("idle");
                                }}
                                placeholder="you@email.com"
                                className="flex-1 bg-transparent px-5 py-3 text-white placeholder:text-white/30 outline-none text-sm"
                                disabled={status === "loading"}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="relative px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                                style={{
                                    background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 0 30px rgba(6,182,212,0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {status === "loading" ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    "Notify Me"
                                )}
                            </button>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                            {status === "error" && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-400 text-xs mt-2 text-center"
                                >
                                    {message}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Privacy note */}
                        <p className="text-white/30 text-xs text-center mt-3">
                            No spam. Unsubscribe anytime.
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
