"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiGithub,
  FiExternalLink,
  FiArrowRight,
} from "react-icons/fi";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  accentColor: string;
  github: string;
  icon: string;
  highlights: string[];
  status: "Production" | "Research" | "Competition" | "MVP";
};

const projects: Project[] = [
  {
    title: "ChefGPT",
    subtitle: "AI Cooking & Nutrition Assistant",
    description:
      "A full-stack mobile application that uses multimodal AI to help users discover recipes from ingredients, plan weekly meals, and track nutrition — powered by Gemini 2.5 Flash.",
    tags: ["Flutter", "FastAPI", "Gemini API", "RAG", "PostgreSQL", "Python", "Riverpod"],
    color: "#10b981",
    accentColor: "rgba(16,185,129,0.15)",
    github: "https://github.com/ShouyiLeee/ChefGPT-MobileCookingAndNutritionAssistant",
    icon: "🍳",
    highlights: [
      "AI recipe suggestions from fridge photos",
      "Gemini Vision ingredient recognition",
      "Weekly meal planning with nutrition goals",
      "RAG-enhanced community recipe search",
    ],
    status: "MVP",
  },
  {
    title: "VDT2025 Patient Flow",
    subtitle: "Multi-Agent Healthcare AI System",
    description:
      "Submitted to Vietnam Developer Technologies 2025. A sophisticated healthcare AI that uses LangGraph multi-agent architecture to route emergency patients through triage, dispatch, and hospital matching.",
    tags: ["LangGraph", "Gemini 2.0", "Python", "Multi-Agent", "Healthcare", "FastAPI"],
    color: "#6366f1",
    accentColor: "rgba(99,102,241,0.15)",
    github: "https://github.com/ShouyiLeee/VDT2025_MultiAgentSystemForPatientFlowScheduling",
    icon: "🏥",
    highlights: [
      "Multimodal medical triage (text + image)",
      "Geographic hospital matching AI",
      "Ambulance dispatch prioritization",
      "Vietnamese healthcare system integration",
    ],
    status: "Competition",
  },
  {
    title: "MoM Note Agent",
    subtitle: "AI Interview Note Assistant",
    description:
      "A multi-agent system that transforms raw interview notes into structured insights. Uses RAG with Qdrant vector DB for semantic search, detecting performance patterns and generating mock interview questions.",
    tags: ["LangGraph", "LangChain", "FastAPI", "Qdrant", "RAG", "PostgreSQL", "Gemini"],
    color: "#8b5cf6",
    accentColor: "rgba(139,92,246,0.15)",
    github: "https://github.com/ShouyiLeee/MoM_NoteAssistantAgent",
    icon: "📝",
    highlights: [
      "4-agent orchestration (Note, Analysis, Simulation, Memory)",
      "Semantic search with Qdrant vector DB",
      "Performance pattern detection via RAG",
      "Mock interview question generation",
    ],
    status: "MVP",
  },
  {
    title: "Skin Lesion Classifier",
    subtitle: "Medical Computer Vision — CS231",
    description:
      "Deep learning study comparing SVM + VGG16 feature extraction vs. end-to-end fine-tuned VGG16 on the HAM10000 skin lesion dataset. Implements both classical ML and transfer learning pipelines.",
    tags: ["TensorFlow", "VGG16", "OpenCV", "Scikit-learn", "Computer Vision", "Python"],
    color: "#f59e0b",
    accentColor: "rgba(245,158,11,0.15)",
    github: "https://github.com/ShouyiLeee/CS231-Skin-Lesion-Classification",
    icon: "🔬",
    highlights: [
      "HAM10000 dataset — 7 skin lesion classes",
      "SVM on VGG16 features vs. fine-tuned end-to-end",
      "Comparative performance analysis",
      "Image preprocessing & data augmentation",
    ],
    status: "Research",
  },
];

const statusColors: Record<string, string> = {
  Production: "#10b981",
  Research: "#f59e0b",
  Competition: "#6366f1",
  MVP: "#06b6d4",
};

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.1 }}
      className="relative glass-card rounded-2xl overflow-hidden group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, ${project.color}, transparent)`
            : "rgba(255,255,255,0.05)",
        }}
      />

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at top left, ${project.accentColor} 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300"
              style={{
                background: project.accentColor,
                transform: hovered ? "scale(1.1) rotate(-3deg)" : "scale(1)",
              }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">{project.title}</h3>
              <p className="text-white/40 text-xs mt-0.5">{project.subtitle}</p>
            </div>
          </div>
          {/* Status badge */}
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{
              color: statusColors[project.status],
              background: `${statusColors[project.status]}15`,
              border: `1px solid ${statusColors[project.status]}30`,
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-6">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-white/40">
              <span style={{ color: project.color }} className="mt-0.5 flex-shrink-0">▸</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium text-white/50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors group/link"
          >
            <FiGithub size={13} />
            <span>Source Code</span>
            <FiArrowRight
              size={10}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </a>

          <span
            className="ml-auto text-xs font-mono font-semibold"
            style={{ color: project.color }}
          >
            #{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Accent */}
      <div
        className="absolute right-0 bottom-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-inner" ref={ref}>
        {/* Decorative section number */}
        <span
          className="section-number select-none pointer-events-none"
          style={{ top: "-1rem", right: "-1rem" }}
          aria-hidden
        >
          03
        </span>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label">03. Projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#06b6d4]/30 to-transparent" />
          </div>
          <h2
            className="font-display font-bold text-white tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
          >
            What I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </h2>
          <p className="text-white/35 mt-4 max-w-lg text-sm leading-relaxed">
            A selection of AI-powered applications — from healthcare multi-agent
            systems to mobile cooking assistants.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/ShouyiLeee?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-[#6366f1]/40 text-white/60 hover:text-white text-sm font-medium transition-all group"
          >
            <FiGithub size={15} />
            View all 41 repositories on GitHub
            <FiExternalLink
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
