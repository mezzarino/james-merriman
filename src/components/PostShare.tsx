"use client";

import { useMemo, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaRegCopy,
  FaShare,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

interface PostShareProps {
  url: string;
}

export function PostShare({ url }: PostShareProps) {
  const [copied, setCopied] = useState(false);

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  // ✅ GA4 tracking helper
  function trackShare(platform: string, method?: string) {
    if (typeof window !== "undefined" && "gtag" in window) {
      const path = window.location.pathname;

      window.gtag("event", "share_click", {
        platform,
        method,
        page: path,
        url,
      });
    }
  }

  const { linkedinUrl, facebookUrl, whatsappUrl, xUrl } = useMemo(() => {
    const shareId = crypto.randomUUID();
    const baseParams = `utm_source=share&utm_campaign=post_share&utm_content=${shareId}`;
    const trackedUrl = `${url}?${baseParams}`;

    const encodedUrl = encodeURIComponent(trackedUrl);
    const whatsappShareText = encodeURIComponent("Loved this travel story — worth checking out:");

    return {
      linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&utm_medium=linkedin`,
      facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&utm_medium=facebook`,
      whatsappUrl: `https://wa.me/?text=${whatsappShareText}%20{encodedUrl}&utm_medium=whatsapp`,
      xUrl: `https://twitter.com/intent/tweet?url=${encodedUrl}&utm_medium=twitter`,
    };
  }, [url]);

  // ✅ Native share handler
  async function handleNativeShare() {
    try {
      await navigator.share({
        title: document.title,
        text: "Loved this travel story — worth checking out:",
        url,
      });

      trackShare("native", "web_share_api");
    } catch {
      // user cancelled → do nothing
    }
  }

  // ✅ Copy link
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      trackShare("copy_link"); // ✅ tracked
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="not-prose flex items-center gap-3">
      <span className="text-sm font-medium">Enjoyed this article? Share it:</span>

      {/* ✅ Native share (mobile-first) */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          aria-label="Share this article"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
        >
          <FaShare className="w-4 h-4" />
        </button>
      )}

      {/* Facebook */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackShare("facebook")}
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
        onClick={() => trackShare("linkedin")}
        aria-label="Share this story on LinkedIn"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaLinkedinIn className="w-4 h-4" />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackShare("whatsapp")}
        aria-label="Share this story on WhatsApp"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaWhatsapp className="w-4 h-4" />
      </a>

      {/* X */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackShare("x")}
        aria-label="Share this story on X"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaXTwitter className="w-4 h-4" />
      </a>

      {/* Copy link ✅ */}
      <button
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaRegCopy className="w-4 h-4" />
      </button>

      {/* Accessible feedback */}
      <span aria-live="polite" className="text-xs text-gray-500 min-w-[80px]">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
