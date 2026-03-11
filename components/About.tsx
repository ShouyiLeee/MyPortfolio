"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiCode,
  FiCpu,
  FiActivity,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";
import { SiGithub } from "react-icons/si";

const stats = [
  { label: "Projects Built", value: "10+", icon: FiCode, color: "#6366f1" },
  { label: "GitHub Repos", value: "41", icon: SiGithub, color: "#8b5cf6" },
  { label: "AI Models Deployed", value: "6+", icon: FiCpu, color: "#06b6d4" },
  { label: "Stars Earned", value: "8+", icon: FiAward, color: "#f59e0b" },
];

const highlights = [
  {
    icon: FiCpu,
    title: "AI & Machine Learning",
    desc: "Specialized in building LLM-powered applications, multi-agent systems, and computer vision models.",
    color: "#6366f1",
  },
  {
    icon: FiActivity,
    title: "Backend AI Systems",
    desc: "Architecting scalable APIs with FastAPI, integrating RAG pipelines, vector databases, and real-time AI services.",
    color: "#8b5cf6",
  },
  {
    icon: FiBookOpen,
    title: "Research Driven",
    desc: "Active in AI research—from skin lesion classification with VGG16 to healthcare patient flow optimization with LangGraph.",
    color: "#06b6d4",
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

export default function About() {
  const { ref, inView } = useScrollInView();

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Soft accent */}
      <div
        className="absolute right-0 top-1/3 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0096E0 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-inner" ref={ref}>
        {/* Decorative Terminal Header to replace buggy large numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-lg glass border border-[#0096E0]/20 shadow-lg shadow-[#0096E0]/5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="ml-2 font-mono-code text-sm text-[#0096E0] flex items-center gap-2">
              <span className="text-white/30">~/portfolio</span> $ ./about.sh
            </span>
          </div>
          <h2
            className="font-display font-bold text-white tracking-tight flex flex-col gap-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
          >
            <span className="font-mono-code text-[#ffcc00] text-2xl md:text-4xl mb-2">&gt; whoami</span>
            <span>
              Turning ideas into <span className="gradient-text">intelligent systems</span>
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="space-y-5 text-white/60 leading-relaxed text-[0.95rem]">
              <p>
                I&apos;m{" "}
                <span className="text-white font-semibold">DT</span> — an IT student at{" "}
                <span className="text-[#0096E0] font-medium">
                  University of Information Technology (UIT), Vietnam
                </span>
                , passionate about building AI systems that genuinely solve hard problems.
              </p>
              <p>
                My focus sits at the intersection of{" "}
                <span className="text-white/80">Large Language Models</span>,{" "}
                <span className="text-white/80">multi-agent architectures</span>, and{" "}
                <span className="text-white/80">backend engineering</span>. I love shipping
                complete products — from designing RAG pipelines to building Flutter mobile
                apps backed by FastAPI AI services.
              </p>
              <div className="p-5 mt-6 glass-card rounded-xl border-l-4 border-[#ffcc00] flex gap-5 items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl group-hover:-translate-y-2 group-hover:rotate-12 transition-transform duration-300">🏀</div>
                <p className="text-white/80 italic text-sm m-0 relative z-10 leading-relaxed">
                  &quot;When I&apos;m not writing code, you&apos;ll find me on the basketball court. The same principles apply — teamwork, strategy, and execution.&quot;
                </p>
              </div>

              {/* UIT Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl glass border border-white/[0.08] mt-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1]/30 to-[#8b5cf6]/30 flex items-center justify-center">
                  <FiBookOpen className="text-[#818cf8]" size={14} />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">B.Sc. Information Technology</p>
                  <p className="text-white/40 text-xs">University of Information Technology · VNUHCM</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8 space-y-3">
              {highlights.map(({ icon: Icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-3 p-3 rounded-xl hover:glass transition-all group cursor-default"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-0.5">{title}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ label, value, icon: Icon, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="glass-card rounded-2xl p-6 text-center hover:border-[#0096E0]/40 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p
                    className="text-3xl font-black mb-1"
                    style={{ color }}
                  >
                    {value}
                  </p>
                  <p className="text-white/40 text-xs font-medium">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Timeline / experience strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 glass-card rounded-2xl p-5"
            >
              <p className="text-white/30 text-xs font-mono mb-4 uppercase tracking-widest">
                Journey
              </p>
              <div className="space-y-3">
                {[
                  {
                    year: "2025–Now",
                    label: "Multi-Agent AI Systems",
                    color: "#0096E0",
                  },
                  {
                    year: "2024",
                    label: "LLM & RAG Pipeline Engineering",
                    color: "#4db8ff",
                  },
                  {
                    year: "2023",
                    label: "Computer Vision & Deep Learning",
                    color: "#ffcc00",
                  },
                  {
                    year: "2022",
                    label: "Started B.Sc. CS @ UIT",
                    color: "#10b981",
                  },
                ].map(({ year, label, color }) => (
                  <div key={year} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-white/30 text-xs font-mono w-20 flex-shrink-0">
                      {year}
                    </span>
                    <span className="text-white/70 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
