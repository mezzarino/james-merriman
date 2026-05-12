"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Photo } from "@/types/photo";

type LightboxProps = {
  photo: Photo;
  nextPhoto?: Photo;
  prevPhoto?: Photo;
  nextNextPhoto?: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export const Lightbox = ({
  photo,
  nextPhoto,
  prevPhoto,
  nextNextPhoto,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) => {
  const shouldReduceMotion = useReducedMotion();

  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const buildUrl = (id: string, format?: string) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${id}.${format || "jpg"}`;

  const buildBlurUrl = (id: string, format?: string) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/w_50,q_10,e_blur:1000/${id}.${
      format || "jpg"
    }`;

  // ✅ Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setDirection("next");
        onNext();
      }

      if (e.key === "ArrowLeft") {
        setDirection("prev");
        onPrev();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <>
      {/* ✅ Preload adjacent */}
      {nextPhoto && (
        <link rel="preload" as="image" href={buildUrl(nextPhoto.public_id, nextPhoto.format)} />
      )}

      {prevPhoto && (
        <link rel="preload" as="image" href={buildUrl(prevPhoto.public_id, prevPhoto.format)} />
      )}

      {/* ✅ Direction-aware preload */}
      {direction === "next" && nextNextPhoto && (
        <link
          rel="preload"
          as="image"
          href={buildUrl(nextNextPhoto.public_id, nextNextPhoto.format)}
        />
      )}

      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        aria-label={photo.alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* ✅ Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl"
          aria-label="Close image"
        >
          ✕
        </button>

        {/* ✅ Image container */}
        <motion.div
          layoutId={photo.public_id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) {
              setDirection("next");
              onNext();
            }

            if (info.offset.x > 100) {
              setDirection("prev");
              onPrev();
            }
          }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }
          }
          className="relative max-w-5xl w-full px-4 flex items-center justify-center"
        >
          {/* ✅ Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* ✅ Cloudinary image */}
          <CldImage
            key={photo.public_id}
            src={`https://res.cloudinary.com/${cloudName}/image/upload/v${photo.version}/${photo.public_id}.${photo.format}`}
            preserveTransformations
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            placeholder="blur"
            blurDataURL={buildBlurUrl(photo.public_id, photo.format)}
            quality="auto"
            format="auto"
            loading="eager"
            onLoad={() => setIsLoading(false)}
            className={`w-full h-auto object-contain rounded-lg transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </motion.div>

        {/* ✅ Navigation */}
        <button
          onClick={onPrev}
          className="absolute left-6 text-white text-3xl"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          onClick={onNext}
          className="absolute right-6 text-white text-3xl"
          aria-label="Next image"
        >
          →
        </button>
      </motion.div>
    </>
  );
};
