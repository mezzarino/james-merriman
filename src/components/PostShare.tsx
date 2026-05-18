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

  function trackShare(platform: string, method?: string) {
    if (typeof window !== "undefined" && "gtag" in window) {
      window.gtag("event", "share_click", {
        platform,
        method,
        page: window.location.pathname,
        url,
      });
    }
  }

  const { linkedinUrl, facebookUrl, whatsappUrl, xUrl } = useMemo(() => {
    const shareId = crypto.randomUUID();
    const baseParams = `utm_source=share&utm_campaign=post_share&utm_content=${shareId}`;

    const linkedinTracked = `${url}?${baseParams}&utm_medium=linkedin`;
    const facebookTracked = `${url}?${baseParams}&utm_medium=facebook`;
    const whatsappTracked = `${url}?${baseParams}&utm_medium=whatsapp`;
    const xTracked = `${url}?${baseParams}&utm_medium=x`;

    const whatsappText = encodeURIComponent("Loved this travel story — worth checking out:");

    return {
      linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        linkedinTracked,
      )}`,
      facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        facebookTracked,
      )}`,
      whatsappUrl: `https://wa.me/?text=${whatsappText}%20${encodeURIComponent(whatsappTracked)}`,
      xUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(xTracked)}`,
    };
  }, [url]);

  async function handleNativeShare() {
    try {
      await navigator.share({
        title: document.title,
        text: "Loved this travel story — worth checking out:",
        url,
      });
      trackShare("native", "web_share_api");
    } catch {
      /* empty */
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      trackShare("copy_link", "clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="not-prose flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
      <span className="text-sm font-medium text-center sm:text-left">
        Enjoyed this article? Share it:
      </span>

      {/* ✅ Semantic list, styling preserved */}
      <ul className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-2">
        {canNativeShare && (
          <li>
            <button
              onClick={handleNativeShare}
              aria-label="Share this article"
              className="
                p-3 md:p-2 md:w-9 md:h-9 shrink-0 flex items-center justify-center
                rounded-full border border-gray-300 text-gray-600
                hover:bg-black hover:text-white hover:border-black
                transition
                hover:scale-105 active:scale-95
                motion-reduce:hover:scale-100
                motion-reduce:active:scale-100
                motion-reduce:transition-none
                touch-manipulation
              "
            >
              <FaShare aria-hidden="true" focusable="false" className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </li>
        )}

        <li>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare("facebook")}
            aria-label="Share this story on Facebook"
            className="
              p-3 md:p-2 md:w-9 md:h-9 shrink-0 flex items-center justify-center
              rounded-full border border-gray-300 text-gray-600
              hover:bg-black hover:text-white hover:border-black
              transition
              hover:scale-105 active:scale-95
              motion-reduce:hover:scale-100
              motion-reduce:active:scale-100
              motion-reduce:transition-none
              touch-manipulation
            "
          >
            <FaFacebookF aria-hidden="true" focusable="false" className="w-5 h-5 sm:w-4 sm:h-4" />
          </a>
        </li>

        <li>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare("linkedin")}
            aria-label="Share this story on LinkedIn"
            className="
              p-3 md:p-2 md:w-9 md:h-9 shrink-0 flex items-center justify-center
              rounded-full border border-gray-300 text-gray-600
              hover:bg-black hover:text-white hover:border-black
              transition
              hover:scale-105 active:scale-95
              motion-reduce:hover:scale-100
              motion-reduce:active:scale-100
              motion-reduce:transition-none
              touch-manipulation
            "
          >
            <FaLinkedinIn aria-hidden="true" focusable="false" className="w-5 h-5 sm:w-4 sm:h-4" />
          </a>
        </li>

        <li>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare("whatsapp")}
            aria-label="Share this story on WhatsApp"
            className="
              p-3 md:p-2 md:w-9 md:h-9 shrink-0 flex items-center justify-center
              rounded-full border border-gray-300 text-gray-600
              hover:bg-black hover:text-white hover:border-black
              transition
              hover:scale-105 active:scale-95
              motion-reduce:hover:scale-100
              motion-reduce:active:scale-100
              motion-reduce:transition-none
              touch-manipulation
            "
          >
            <FaWhatsapp aria-hidden="true" focusable="false" className="w-5 h-5 sm:w-4 sm:h-4" />
          </a>
        </li>

        <li>
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare("x")}
            aria-label="Share this story on X"
            className="
              p-3 md:p-2 md:w-9 md:h-9 shrink-0 flex items-center justify-center
              rounded-full border border-gray-300 text-gray-600
              hover:bg-black hover:text-white hover:border-black
              transition
              hover:scale-105 active:scale-95
              motion-reduce:hover:scale-100
              motion-reduce:active:scale-100
              motion-reduce:transition-none
              touch-manipulation
            "
          >
            <FaXTwitter aria-hidden="true" focusable="false" className="w-5 h-5 sm:w-4 sm:h-4" />
          </a>
        </li>

        <li>
          <button
            onClick={handleCopy}
            aria-label="Copy link to clipboard"
            className="
              p-3 md:p-2 md:w-9 md:h-9 shrink-0 flex items-center justify-center
              rounded-full border border-gray-300 text-gray-600
              hover:bg-black hover:text-white hover:border-black
              transition
              hover:scale-105 active:scale-95
              motion-reduce:hover:scale-100
              motion-reduce:active:scale-100
              motion-reduce:transition-none
              touch-manipulation
            "
          >
            <FaRegCopy aria-hidden="true" focusable="false" className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </li>
      </ul>

      <span aria-live="polite" className="text-xs text-gray-500 min-w-[90px]">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
