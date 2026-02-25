"use client";

import { motion } from "framer-motion";
import EmailForm from "./EmailForm";

export default function BottomCTA() {
    return (
        <section className="relative py-24 px-6">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Don&apos;t miss the <span className="gradient-text">launch</span>
                    </h2>
                    <p className="text-white/40 mb-3 max-w-lg mx-auto">
                        Join travelers already on the waitlist. Be first to get access.
                    </p>

                    {/* Animated counter */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-white/60">
                            <span className="text-white font-semibold">2,400+</span> travelers on the waitlist
                        </span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <EmailForm variant="bottom" />
                </motion.div>
            </div>
        </section>
    );
}
