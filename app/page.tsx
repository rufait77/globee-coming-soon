"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Particles from "@/components/Particles";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background particles */}
      <Particles />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <BottomCTA />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
