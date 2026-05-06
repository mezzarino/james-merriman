import { FaEnvelope, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";

import { cn } from "@/lib/utils";

const linkClass =
  "p-3 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-full " +
  "border border-gray-300 text-gray-600 " +
  "hover:bg-black hover:text-white hover:border-black " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 " +
  "transition motion-reduce:transition-none";

const iconClass = "w-5 h-5 sm:w-6 sm:h-6";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("not-prose flex gap-4", className)}>
      <a
        href="mailto:info@jamesmerriman.co.uk"
        aria-label="Email James Merriman"
        className={linkClass}
      >
        <FaEnvelope className={iconClass} />
      </a>

      <a
        href="https://instagram.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on Instagram"
        className={linkClass}
      >
        <FaInstagram className={iconClass} />
      </a>

      <a
        href="https://linkedin.com/in/jamesmerriman"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with James on LinkedIn"
        className={linkClass}
      >
        <FaLinkedinIn className={iconClass} />
      </a>

      <a
        href="https://mezzarino.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Subscribe to James on Substack"
        className={linkClass}
      >
        <SiSubstack className={iconClass} />
      </a>

      <a
        href="https://x.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on X"
        className={linkClass}
      >
        <FaXTwitter className={iconClass} />
      </a>

      <a
        href="https://www.youtube.com/jamesmerrimancouk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on YouTube"
        className={linkClass}
      >
        <FaYoutube className={iconClass} />
      </a>
    </div>
  );
}
