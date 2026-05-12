"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CldImage } from "next-cloudinary";

export const Lightbox = ({
  photo,
  nextPhoto,
  prevPhoto,
  onClose,
  onNext,
  onPrev,
}: any) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return (
    <>
      {/* ✅ Preload images */}
      {nextPhoto && (
        {`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${nextPhoto.public_id}`}
      )}
      {prevPhoto && (
        {`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${prevPhoto.public_id}`}
      )}

      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl"
          aria-label="Close image"
        >
          ✕
        </button>

        {/* Animated Image */}
        <motion.div
          layoutId={photo.public_id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) onNext();
            if (info.offset.x > 100) onPrev();
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          className="max-w-5xl w-full px-4"
        >
          {photo.public_id}
        </motion.div>

        {/* Navigation */}
        <button onClick={onPrev} className="absolute left-6 text-white text-3xl">
          ←
        </button>
        <button    onClick={onNext} className="absolute right-6 text-white text-3xl">
          →
        </button>
      </motion.div>
    </>
  );
};
