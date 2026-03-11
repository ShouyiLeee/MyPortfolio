"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

const socials = [
  { icon: FiGithub,   href: "https://github.com/ShouyiLeee",               label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/letrongdaitruong",      label: "LinkedIn" },
  { icon: FiMail,     href: "mailto:22521576@gm.uit.edu.vn",                label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-10 overflow-hidden">
      {/* Subtle gradient top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,.4), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs text-white"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
          >
            DT
          </div>
          <p className="text-white/25 text-sm">
            © 2025{" "}
            <span className="text-white/45 font-medium">Lê Trọng Đại Trường</span>
          </p>
        </div>

        {/* Made with */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/18 text-xs flex items-center gap-1.5 font-mono-code"
        >
          Built with
          <FiHeart size={9} className="text-[#ef4444]" />
          using Next.js &amp; Framer Motion
        </motion.p>

        {/* Socials */}
        <div className="flex items-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/28 hover:text-white hover:bg-white/[0.07] transition-all"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
