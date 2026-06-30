"use client";

/**
 * components/WishJar.tsx
 * Lets Megan type a wish, which gets "sealed" into a jar (persisted via
 * the zustand store -> localStorage). Each wish renders as a small
 * floating star inside the jar visualization.
 */
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoveStore } from "@/lib/store";

const MAX_WISH_LENGTH = 280;

export default function WishJar() {
  const wishes = useLoveStore((s) => s.wishes);
  const addWish = useLoveStore((s) => s.addWish);
  const [draft, setDraft] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    addWish(trimmed);
    setDraft("");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <section
      id="wish-jar"
      className="relative w-full bg-gradient-to-b from-baby-blue/20 to-cream px-6 py-24"
      aria-label="Wish jar"
    >
      <h2 className="font-display text-4xl md:text-5xl text-plum text-center mb-3">Star Wishes</h2>
      <p className="text-center text-plum/60 font-body mb-12 max-w-md mx-auto">
        write a wish for us, and watch it join the jar — it stays here for as long as this site does
      </p>

      <div className="max-w-md mx-auto">
        {/* Jar visualization */}
        <div className="relative h-64 rounded-b-[3rem] rounded-t-xl border-4 border-baby-blue/40 bg-white/40 backdrop-blur-sm overflow-hidden mb-6">
          <div className="absolute top-0 inset-x-6 h-3 bg-baby-blue/40 rounded-b-md" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-wrap content-end gap-2 p-4 overflow-y-auto" aria-live="polite">
            <AnimatePresence>
              {wishes.length === 0 ? (
                <p className="w-full text-center text-plum/40 text-sm self-center font-body">
                  the jar is empty, for now ✨
                </p>
              ) : (
                wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    title={wish.text}
                    className="text-2xl cursor-default"
                    aria-label={wish.text}
                  >
                    ⭐
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="wish-input" className="sr-only">
            Write a wish
          </label>
          <textarea
            id="wish-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_WISH_LENGTH))}
            placeholder="I wish for us..."
            rows={3}
            maxLength={MAX_WISH_LENGTH}
            className="w-full rounded-xl border border-sakura/40 bg-white/90 px-4 py-3 font-body text-plum placeholder:text-plum/30 resize-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-plum/40">
              {draft.length}/{MAX_WISH_LENGTH}
            </span>
            <button
              type="submit"
              disabled={!draft.trim()}
              className="px-5 py-2.5 rounded-full bg-baby-blue text-plum font-semibold shadow-md hover:bg-baby-blue/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2"
            >
              {justAdded ? "Sealed ✨" : "Seal this wish"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
