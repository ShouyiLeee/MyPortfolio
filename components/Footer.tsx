"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
            <FiCode className="text-white w-3.5 h-3.5" />
          </div>
          <p className="text-white/30 text-sm">
            © 2025{" "}
            <span className="text-white/50 font-medium">Lê Trọng Đại Trường</span>
          </p>
        </div>

        {/* Made with */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/20 text-xs flex items-center gap-1.5"
        >
          Built with
          <FiHeart size={10} className="text-[#ef4444]" />
          using Next.js & Framer Motion
        </motion.p>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {[
            {
              icon: FiGithub,
              href: "https://github.com/ShouyiLeee",
              label: "GitHub",
            },
            {
              icon: FiLinkedin,
              href: "https://linkedin.com/in/letrongdaitruong",
              label: "LinkedIn",
            },
            {
              icon: FiMail,
              href: "mailto:22521576@gm.uit.edu.vn",
              label: "Email",
            },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
