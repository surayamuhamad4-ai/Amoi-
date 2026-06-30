"use client";

/**
 * components/Hero.tsx
 * Opening scene. The "thesis" of the whole site per design brief: the
 * starfield + the letter title, with the most characteristic interaction
 * (double-click for heart rain) discoverable immediately.
 */
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { GIRLFRIEND_FIRST_NAME } from "@/lib/data";
import HeartRain from "./HeartRain";

const StarfieldCanvas = dynamic(() => import("./StarfieldCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const [heartRainKey, setHeartRainKey] = useState<number | null>(null);

  const triggerHeartRain = useCallback(() => {
    setHeartRainKey(Date.now());
  }, []);

  return (
    <section
      id="hero"
      onDoubleClick={triggerHeartRain}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-plum-deep via-plum to-plum-light flex flex-col items-center justify-center text-center px-6"
      aria-label="Opening scene"
    >
      <StarfieldCanvas />

      {heartRainKey !== null && <HeartRain triggerKey={heartRainKey} />}

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 font-hand text-2xl md:text-3xl text-sakura-light mb-4"
      >
        a love letter, written in code —
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6 }}
        className="relative z-10 font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-cream leading-tight text-balance"
      >
        For {GIRLFRIEND_FIRST_NAME}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-10 mt-6 text-baby-blue/80 text-sm md:text-base tracking-wide"
      >
        double-click anywhere ✨ · scroll to begin our story
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2, duration: 1 }, y: { delay: 2, duration: 2, repeat: Infinity } }}
        className="relative z-10 mt-12 text-cream/70 text-2xl"
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  );
}
