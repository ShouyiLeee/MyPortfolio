"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiChevronRight } from "react-icons/fi";

const ROLES = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Backend AI Developer",
  "Multi-Agent Systems",
  "LLM Applications",
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string };
    const cols = ["#6366f1", "#8b5cf6", "#06b6d4", "#818cf8"];
    const pts: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: cols[Math.floor(Math.random() * cols.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fillStyle = a.color + Math.round(a.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div className="orb-1 absolute w-[500px] h-[500px] rounded-full opacity-40"
          style={{ top: "10%", right: "10%", background: "radial-gradient(circle,rgba(99,102,241,.35) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="orb-2 absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{ bottom: "5%", left: "-10%", background: "radial-gradient(circle,rgba(139,92,246,.35) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div className="orb-3 absolute w-[350px] h-[350px] rounded-full opacity-25"
          style={{ top: "50%", left: "40%", background: "radial-gradient(circle,rgba(6,182,212,.3) 0%,transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-mono text-[#6366f1] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          Available for opportunities
          <FiChevronRight size={12} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-none"
        >
          <span className="block text-white/90">Lê Trọng</span>
          <span className="block gradient-text">Đại Trường</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: EASE }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl font-mono text-white/50">&lt; </span>
          <span className="text-xl md:text-2xl font-semibold text-[#818cf8] font-mono mx-2 min-w-[280px] text-left inline-block">
            {role}<span className="cursor-blink text-[#6366f1]">|</span>
          </span>
          <span className="text-xl md:text-2xl font-mono text-white/50"> /&gt;</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease: EASE }}
          className="text-base md:text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          Building intelligent systems that bridge AI research and real-world impact.
          Passionate about Multi-Agent AI, LLMs, and scalable backend architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-8 py-3.5 rounded-xl font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 0 30px rgba(99,102,241,.4)" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2">
              View Projects
              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
          <motion.a
            href="https://github.com/ShouyiLeee" target="_blank" rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl font-semibold text-white/80 hover:text-white glass border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          >
            <FiGithub size={16} /> GitHub
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: FiGithub, href: "https://github.com/ShouyiLeee", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/letrongdaitruong", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:22521576@gm.uit.edu.vn", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#6366f1]/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <FiArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
