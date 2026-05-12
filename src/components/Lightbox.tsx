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

      {/* ✅ Lightbox overlay */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        aria-label={photo.alt}
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

        {/* ✅ Image container */}
        <div className="relative max-w-5xl w-full px-4 flex items-center justify-center cursor-grab active:cursor-grabbing">
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.public_id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                if (offset < -80 || velocity < -500) {
                  setDirection("next");
                  onNext();
                }

                if (offset > 80 || velocity > 500) {
                  setDirection("prev");
                  onPrev();
                }
              }}
              className="relative w-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }
              }
            >
              {/* ✅ Progressive blur image */}
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
                    width: "1.5",
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

        {/* Navigation */}
        <button
          onClick={() => {
            setDirection("prev");
            onPrev();
          }}
          className="absolute left-6 text-white text-3xl"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          onClick={() => {
            setDirection("next");
            onNext();
          }}
          className="absolute right-6 text-white text-3xl"
          aria-label="Next image"
        >
          →
        </button>
      </motion.div>
    </>
  );
};
