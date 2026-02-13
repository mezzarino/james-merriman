import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export function SocialLinks() {
  return (
    <div className="not-prose flex gap-4 mt-8">
      <a
        href="https://x.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on X"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaXTwitter className="w-5 h-5" />
      </a>

      <a
        href="https://linkedin.com/in/jamesmerriman"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with James on LinkedIn"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaLinkedinIn className="w-5 h-5" />
      </a>

      <a
        href="https://instagram.com/mezzarino"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow James on Instagram"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <FaInstagram className="w-5 h-5" />
      </a>

      <a
        href="mailto:mezzarino@outlook.com"
        aria-label="Email James Merriman"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition"
      >
        <HiOutlineMail className="w-5 h-5" />
      </a>
    </div>
  );
}
