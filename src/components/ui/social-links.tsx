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
      <a href="mailto:info@jamesmerriman.co.uk" className={linkClass}>
        <span className="sr-only">Email James Merriman</span>
        <FaEnvelope aria-hidden="true" focusable="false" className={iconClass} />
      </a>

      <a
        href="https://instagram.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <span className="sr-only">Follow James on Instagram</span>
        <FaInstagram aria-hidden="true" focusable="false" className={iconClass} />
      </a>

      <a
        href="https://linkedin.com/in/jamesmerriman"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <span className="sr-only">Connect with James on LinkedIn</span>
        <FaLinkedinIn aria-hidden="true" focusable="false" className={iconClass} />
      </a>

      <a
        href="https://mezzarino.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <span className="sr-only">Subscribe to James on Substack</span>
        <SiSubstack aria-hidden="true" focusable="false" className={iconClass} />
      </a>

      <a
        href="https://x.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <span className="sr-only">Follow James on X</span>
        <FaXTwitter aria-hidden="true" focusable="false" className={iconClass} />
      </a>

      <a
        href="https://www.youtube.com/jamesmerrimancouk"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <span className="sr-only">Follow James on YouTube</span>
        <FaYoutube aria-hidden="true" focusable="false" className={iconClass} />
      </a>
    </div>
  );
}
