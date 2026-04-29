import { FaEnvelope, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";

import { cn } from "@/lib/utils";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("not-prose flex gap-4", className)}>
      <a
        href="mailto:info@jamesmerriman.co.uk"
        aria-label="Email James Merriman"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaEnvelope className="w-4 h-4" />
      </a>

      <a
        href="https://instagram.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on Instagram"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaInstagram className="w-4 h-4" />
      </a>

      <a
        href="https://linkedin.com/in/jamesmerriman"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with James on LinkedIn"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaLinkedinIn className="w-4 h-4" />
      </a>

      <a
        href="https://mezzarino.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Subscribe to James on Substack"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <SiSubstack className="w-4 h-4" />
      </a>

      <a
        href="https://x.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on X"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaXTwitter className="w-4 h-4" />
      </a>

      <a
        href="https://www.youtube.com/jamesmerrimancouk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on YouTube"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaYoutube className="w-4 h-4" />
      </a>
    </div>
  );
}
