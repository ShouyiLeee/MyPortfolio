"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiCode } from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "skills", "projects", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0096E0] to-[#4db8ff] flex items-center justify-center shadow-lg shadow-[#0096E0]/30">
              <FiCode className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold text-white/90 text-base tracking-tight group-hover:text-white transition-colors">
              DT<span className="text-[#ffcc00]">_</span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/[0.07] rounded-lg"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.button>
              );
            })}

            <motion.a
              href="mailto:22521576@gm.uit.edu.vn"
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg text-white transition-all"
              style={{
                background: "linear-gradient(135deg,#0096E0,#ffcc00)",
                boxShadow: "0 0 20px rgba(0,150,224,.35)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,150,224,.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/[0.07] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/[0.06] md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.07] rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:22521576@gm.uit.edu.vn"
                className="mt-2 px-4 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#0096E0] to-[#ffcc00] text-white text-center shadow-lg shadow-[#0096E0]/20"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
