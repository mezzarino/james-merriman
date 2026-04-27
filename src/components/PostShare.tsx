"use client";

import { useMemo } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface PostShareProps {
  url: string;
}

export function PostShare({ url }: PostShareProps) {
  const { linkedinUrl, facebookUrl, xUrl } = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);

    return {
      linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      xUrl: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
    };
  }, [url]);

  return (
    <div className="not-prose flex items-center gap-3">
      <span className="text-sm font-medium">Enjoyed this article? Share it:</span>

      {/* Facebook */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this story on Facebook"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaFacebookF className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this story on LinkedIn"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaLinkedinIn className="w-4 h-4" />
      </a>

      {/* X */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this story on X"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaXTwitter className="w-4 h-4" />
      </a>
    </div>
  );
}
