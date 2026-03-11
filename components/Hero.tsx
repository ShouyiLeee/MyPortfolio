"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiChevronRight } from "react-icons/fi";

const ROLES = [
  "AI Engineer",
  "ML Engineer",
  "Multi-Agent Systems",
  "LLM Applications",
  "Backend AI Dev",
];

function useTypewriter(words: string[], speed = 70, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2.2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    type P = {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
      twinkleSpeed: number;
    };
    const COLS = ["#ffffff", "#0096E0", "#ffcc00", "#4db8ff", "#ffffff"];
    const pts: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: COLS[Math.floor(Math.random() * COLS.length)],
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      pts.forEach((a, i) => {
        /* Mouse repulsion */
        const dx = a.x - mx;
        const dy = a.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          a.vx += (dx / dist) * force * 0.08;
          a.vy += (dy / dist) * force * 0.08;
        }
        /* Speed cap */
        const speed = Math.hypot(a.vx, a.vy);
        if (speed > 1.5) { a.vx *= 0.95; a.vy *= 0.95; }

        /* Connections */
        pts.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,150,224,${0.07 * (1 - d / 130)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });

        // Twinkle effect
        a.opacity += a.twinkleSpeed;
        if (a.opacity > 0.9 || a.opacity < 0.2) a.twinkleSpeed *= -1;

        /* Dot */
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fillStyle =
          a.color + Math.round(a.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div
          className="orb-1 absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: "5%", right: "5%",
            background: "radial-gradient(circle,rgba(0,150,224,.25) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="orb-2 absolute w-[700px] h-[700px] rounded-full"
          style={{
            bottom: "-10%", left: "-15%",
            background: "radial-gradient(circle,rgba(255,204,0,.15) 0%,transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="orb-3 absolute w-[400px] h-[400px] rounded-full"
          style={{
            top: "55%", left: "45%",
            background: "radial-gradient(circle,rgba(6,182,212,.20) 0%,transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Giant decorative initials — background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <span
          className="font-display font-black text-center leading-none"
          style={{
            fontSize: "clamp(12rem, 35vw, 28rem)",
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.08em",
          }}
        >
          DT
        </span>
      </div>

      {/* Main content */}
      <div
        className="relative text-center px-6 max-w-5xl mx-auto w-full"
        style={{ zIndex: 10 }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-xs font-mono tracking-wide text-white/60 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
          </span>
          Available for opportunities
          <FiChevronRight size={11} className="text-[#0096E0]" />
        </motion.div>

        {/* Name — Space Grotesk display font */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="font-display font-black leading-[0.92] tracking-tight mb-7"
          style={{ fontSize: "clamp(3.4rem, 11vw, 7.5rem)" }}
        >
          <span className="block font-mono-code font-bold tracking-tighter text-white/90">DT -</span>
          <span className="block shimmer-text">Le Truong</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
          className="flex items-center justify-center gap-2 mb-7"
        >
          <span className="font-mono-code text-sm text-white/30">&lt;</span>
          <span
            className="font-mono-code text-lg md:text-xl font-medium text-[#0096E0] min-w-[220px] md:min-w-[300px] text-left inline-block"
          >
            {role}
            <span className="cursor-blink text-[#ffcc00] ml-0.5">_</span>
          </span>
          <span className="font-mono-code text-sm text-white/30">/&gt;</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.52, ease: EASE }}
          className="text-base md:text-lg text-white/40 max-w-lg mx-auto leading-relaxed mb-11 font-light"
        >
          Building intelligent systems that bridge AI research and real-world
          impact. Passionate about Multi-Agent AI, LLMs, and scalable backend
          architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.62, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#0096E0,#ffcc00)",
              boxShadow: "0 0 35px rgba(0,150,224,.5), 0 4px 20px rgba(0,0,0,.4)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(0,150,224,.65), 0 8px 30px rgba(0,0,0,.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <FiChevronRight
                className="group-hover:translate-x-1 transition-transform"
                size={15}
              />
            </span>
          </motion.button>

          <motion.a
            href="https://github.com/ShouyiLeee"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl font-semibold text-white/75 hover:text-white glass border border-white/10 hover:border-[#0096E0]/50 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiGithub size={15} />
            GitHub
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.72, ease: EASE }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          {[
            { icon: FiGithub, href: "https://github.com/ShouyiLeee", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/letrongdaitruong", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:22521576@gm.uit.edu.vn", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl glass border border-white/08 flex items-center justify-center text-white/40 hover:text-white hover:border-[#0096E0]/50 transition-all"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
            >
              <Icon size={15} />
            </motion.a>
          ))}

          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Quick stats */}
          {[
            { label: "Projects", value: "10+" },
            { label: "Repos", value: "41" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center px-3 py-1 rounded-lg"
            >
              <span className="font-display font-bold text-sm text-white/80 leading-tight">
                {value}
              </span>
              <span className="font-mono-code text-[9px] text-white/30 uppercase tracking-wider mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <span className="font-mono-code text-[9px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <FiArrowDown size={13} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
