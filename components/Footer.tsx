"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative py-12 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
                {/* Logo + copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 text-white/30 text-sm"
                >
                    <Image
                        src="/logo.svg"
                        alt="GlobeeLink"
                        width={100}
                        height={24}
                        className="h-6 w-auto opacity-50"
                    />
                    <span>© 2026 GlobeeLink · Coming Soon</span>
                </motion.div>
            </div>
        </footer>
    );
}
