"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

import { Photo } from "@/types/photo";

import { Lightbox } from "./Lightbox";

export const AdvancedGallery = ({ initialPhotos }: { initialPhotos: Photo[] }) => {
  const [photos] = useState<Photo[]>(initialPhotos);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(15);

  const categories = ["all", ...new Set(photos.map((p) => p.category))];

  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setVisibleCount(15);
            }}
            className={`px-4 py-2 rounded ${
              filter === cat ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <motion.ul className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {visible.map((photo, i) => (
            <motion.li
              key={photo.public_id}
              className="break-inside-avoid cursor-pointer"
              onClick={() => setActiveIndex(i)}
            >
              <motion.div className="overflow-hidden rounded-lg">
                <figure>
                  <CldImage
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${photo.version}/${photo.public_id}.${photo.format}`}
                    preserveTransformations
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality="auto"
                    format="auto"
                    loading="lazy"
                    decoding="async"
                    overlays={[
                      {
                        publicId: "james-merriman-watermark",
                        width: 200,
                        crop: "scale",

                        effects: [
                          {
                            name: "opacity",
                            value: 60,
                          },
                        ],

                        position: {
                          gravity: "south_east",
                          x: 20,
                          y: 20,
                        },
                      },
                    ]}
                    className="w-full h-auto object-cover"
                    title={photo.alt}
                  />

                  <figcaption className="mt-2 text-sm text-gray-600">{photo.alt}</figcaption>
                </figure>
              </motion.div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Load More */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((v) => v + 15)}
            className="px-6 py-3 bg-black text-white rounded"
          >
            Load more
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            photo={visible[activeIndex]}
            nextPhoto={visible[activeIndex + 1]}
            prevPhoto={visible[activeIndex - 1]}
            nextNextPhoto={visible[activeIndex + 2]}
            onClose={() => setActiveIndex(null)}
            onNext={() => setActiveIndex((i) => (i !== null && i < visible.length - 1 ? i + 1 : i))}
            onPrev={() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          />
        )}
      </AnimatePresence>
    </>
  );
};
