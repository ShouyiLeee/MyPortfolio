"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

const contacts = [
  {
    icon: FiMail,
    label: "Email",
    value: "22521576@gm.uit.edu.vn",
    href: "mailto:22521576@gm.uit.edu.vn",
    color: "#6366f1",
    desc: "Best way to reach me",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/ShouyiLeee",
    href: "https://github.com/ShouyiLeee",
    color: "#8b5cf6",
    desc: "41 public repositories",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/letrongdaitruong",
    href: "https://linkedin.com/in/letrongdaitruong",
    color: "#06b6d4",
    desc: "Let's connect professionally",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending (replace with actual email service like Resend or Formspree)
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="section-padding relative"
      style={{ background: "rgba(13,13,26,0.4)" }}
    >
      {/* Accent glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-2xl h-64 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #6366f1 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-inner" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">04. Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s{" "}
            <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
            I&apos;m open to full-time roles, research collaborations, and
            exciting AI projects. Drop me a message!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-white/30 text-xs">
            <FiMapPin size={12} />
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left — Contact cards */}
          <div className="md:col-span-2 space-y-3">
            {contacts.map(({ icon: Icon, label, value, href, color, desc }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:border-white/15 transition-all group block"
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={17} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-white/80 text-sm font-semibold">{label}</p>
                  <p className="text-white/40 text-xs truncate">{value}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{desc}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-4 glass-card rounded-2xl border border-[#10b981]/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#10b981] text-xs font-semibold">Available Now</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Open to AI/ML engineering roles, internships, and research
                collaborations.
              </p>
            </motion.div>
          </div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="md:col-span-3 glass-card rounded-2xl p-6 md:p-8"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center mb-4">
                  <FiCheckCircle size={32} className="text-[#10b981]" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(99,102,241,0.5)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(99,102,241,0.5)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-1.5 ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(99,102,241,0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 0 30px rgba(99,102,241,0.35)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-center text-white/20 text-xs">
                  Or email directly:{" "}
                  <a
                    href="mailto:22521576@gm.uit.edu.vn"
                    className="text-[#818cf8] hover:text-[#6366f1] transition-colors"
                  >
                    22521576@gm.uit.edu.vn
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
