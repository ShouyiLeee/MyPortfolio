"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiPython, SiDart, SiCplusplus, SiJavascript, SiTypescript,
  SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiFastapi, SiDjango, SiSpringboot, SiNextdotjs, SiReact, SiFlutter,
  SiPostgresql, SiMongodb, SiMysql, SiSqlite, SiRedis,
  SiDocker, SiGit, SiGithub,
} from "react-icons/si";
import { FiCpu, FiDatabase, FiCode, FiPackage, FiLayers, FiTool, FiZap, FiCloud } from "react-icons/fi";
import { FaJava } from "react-icons/fa";

type Skill = {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
};

type Category = {
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    label: "Languages",
    icon: FiCode,
    color: "#6366f1",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
    ],
  },
  {
    label: "AI / ML",
    icon: FiCpu,
    color: "#8b5cf6",
    skills: [
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "LangChain", icon: FiZap, color: "#1C9C6C" },
      { name: "Gemini API", icon: FiCloud, color: "#4285F4" },
    ],
  },
  {
    label: "Backend",
    icon: FiLayers,
    color: "#06b6d4",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    ],
  },
  {
    label: "Frontend / Mobile",
    icon: FiPackage,
    color: "#f59e0b",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
    ],
  },
  {
    label: "Databases",
    icon: FiDatabase,
    color: "#10b981",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    label: "Tools & DevOps",
    icon: FiTool,
    color: "#ef4444",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
    ],
  },
];

const specialisms = [
  { label: "RAG Pipelines", color: "#0096E0" },
  { label: "Multi-Agent Systems", color: "#ffcc00" },
  { label: "LLM Integration", color: "#06b6d4" },
  { label: "Computer Vision", color: "#f59e0b" },
  { label: "REST API Design", color: "#10b981" },
  { label: "Vector Databases", color: "#ef4444" },
  { label: "LangGraph", color: "#0096E0" },
  { label: "Qdrant", color: "#ffcc00" },
  { label: "Gemini Flash", color: "#4285F4" },
  { label: "Mobile AI", color: "#06b6d4" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: "rgba(12,12,26,0.5)" }}
    >
      {/* Accent */}
      <div
        className="absolute left-0 top-1/2 w-80 h-80 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
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
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-lg glass border border-[#06b6d4]/20 shadow-lg shadow-[#06b6d4]/5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="ml-2 font-mono-code text-sm text-[#06b6d4] flex items-center gap-2">
              <span className="text-white/30">~/portfolio</span> $ cat skills.json
            </span>
          </div>
          <h2
            className="font-display font-bold text-white tracking-tight flex flex-col gap-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
          >
            <span className="font-mono-code text-[#ffcc00] text-2xl md:text-4xl mb-2">&gt; grep "Tech"</span>
            <span>
              Tech <span className="gradient-text">Stack</span>
            </span>
          </h2>
          <p className="text-white/35 mt-4 max-w-lg text-sm leading-relaxed">
            Tools and technologies I use to build production-grade AI systems.
          </p>
        </motion.div>

        {/* Specialisms strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {specialisms.map(({ label, color }) => (
            <span
              key={label}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 cursor-default"
              style={{
                background: `${color}15`,
                color,
                border: `1px solid ${color}30`,
              }}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, catIdx) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + catIdx * 0.07 }}
                className="glass-card rounded-2xl p-5 hover:border-[#0096E0]/20 transition-all"
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${cat.color}18` }}
                  >
                    <CatIcon size={14} style={{ color: cat.color }} />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(({ name, icon: Icon, color }) => (
                    <motion.div
                      key={name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-all group cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      whileHover={{
                        scale: 1.06,
                        background: `${color}18`,
                        borderColor: `${color}40`,
                      }}
                    >
                      <Icon size={12} style={{ color }} />
                      {name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
