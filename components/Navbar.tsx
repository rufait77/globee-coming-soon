"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "glass-strong shadow-lg shadow-black/20"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="GlobeeLink"
                        width={140}
                        height={36}
                        className="h-9 w-auto"
                        priority
                    />
                </div>

                {/* Coming Soon Pill */}
                <div className="flex items-center">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase glass border border-accent-cyan/20 text-accent-cyan">
                        Coming Soon
                    </span>
                </div>
            </div>
        </motion.nav>
    );
}
