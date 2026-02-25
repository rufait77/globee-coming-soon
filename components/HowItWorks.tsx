"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Choose your destination",
        description: "Select from 150+ countries",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Scan the QR code",
        description: "Download your eSIM instantly",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "You're connected!",
        description: "Start using data immediately",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
        ),
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

export default function HowItWorks() {
    return (
        <section className="relative py-24 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        How it <span className="gradient-text">works</span>
                    </h2>
                    <p className="text-white/40 max-w-md mx-auto">
                        Get connected in three simple steps
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4"
                >
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px]">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                            className="w-full h-full origin-left"
                            style={{
                                background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)",
                                opacity: 0.3,
                            }}
                        />
                        {/* Traveling dot */}
                        <motion.div
                            initial={{ left: "0%" }}
                            whileInView={{ left: "100%" }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 2,
                                delay: 0.6,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "linear",
                            }}
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-cyan"
                            style={{
                                boxShadow: "0 0 10px rgba(6, 182, 212, 0.8)",
                            }}
                        />
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            variants={stepVariants}
                            className="relative flex flex-col items-center text-center"
                        >
                            {/* Step number with gradient */}
                            <div className="relative mb-6">
                                <div
                                    className="w-[120px] h-[120px] rounded-full flex items-center justify-center glass-strong"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent)",
                                    }}
                                >
                                    <div className="text-accent-cyan">{step.icon}</div>
                                </div>
                                <span
                                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                    style={{
                                        background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                                    }}
                                >
                                    {step.number}
                                </span>
                            </div>

                            {/* Content */}
                            <h3
                                className="text-lg font-bold text-white mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-white/40 text-sm">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
