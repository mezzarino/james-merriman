"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const buildUrl = (id: string, format?: string) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${id}.${format || "jpg"}`;

  const buildBlurUrl = (id: string, format?: string) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/w_50,q_10,e_blur:1000/${id}.${format || "jpg"}`;

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
      {/* ✅ Preload next + prev */}
      {nextPhoto && (
        <link rel="preload" as="image" href={buildUrl(nextPhoto.public_id, nextPhoto.format)} />
      )}
      {prevPhoto && (
        <link rel="preload" as="image" href={buildUrl(prevPhoto.public_id, prevPhoto.format)} />
      )}

      {/* ✅ Preload next-next (direction aware) */}
      {direction === "next" && nextNextPhoto && (
        <link
          rel="preload"
          as="image"
          href={buildUrl(nextNextPhoto.public_id, nextNextPhoto.format)}
        />
      )}

      {/* ✅ Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        aria-label={photo.alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* ✅ Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl z-20"
          aria-label="Close image"
        >
          ✕
        </button>

        {/* ✅ Click zones (desktop UX upgrade) */}
        <button
          onClick={() => {
            setDirection("prev");
            onPrev();
          }}
          className="absolute left-0 top-0 h-full w-1/2 z-10 cursor-w-resize focus:outline-none"
          aria-label="Previous image"
        />

        <button
          onClick={() => {
            setDirection("next");
            onNext();
          }}
          className="absolute right-0 top-0 h-full w-1/2 z-10 cursor-e-resize focus:outline-none"
          aria-label="Next image"
        />

        {/* ✅ Image container */}
        <div className="relative max-w-5xl w-full px-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.public_id} // ✅ resets state & enables transitions
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                const SWIPE_THRESHOLD = 120;
                const SWIPE_VELOCITY = 400;

                if (offset < -SWIPE_THRESHOLD || velocity < -SWIPE_VELOCITY) {
                  setDirection("next");
                  onNext();
                }

                if (offset > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
                  setDirection("prev");
                  onPrev();
                }
              }}
              // ✅ Crossfade animation
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }
              }
              className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <CldImage
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
                overlays={[
                  {
                    publicId: "james-merriman-watermark",
                    width: "1.5", // ✅ LARGE watermark
                    crop: "scale",
                    effects: [{ name: "opacity", value: 40 }],
                    position: { gravity: "center" },
                  },
                ]}
                className="w-full h-auto object-contain rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ✅ Nav buttons */}
        <button
          onClick={() => {
            setDirection("prev");
            onPrev();
          }}
          className="absolute left-6 text-white text-3xl z-20"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          onClick={() => {
            setDirection("next");
            onNext();
          }}
          className="absolute right-6 text-white text-3xl z-20"
          aria-label="Next image"
        >
          →
        </button>
      </motion.div>
    </>
  );
};
