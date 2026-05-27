import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  ArrowLeft, Github, ExternalLink, Youtube,
  Calendar, Tag, Users, AlertCircle,
  GitBranch, Layers, CheckCircle2, Clock, Archive, Wrench, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageLayout from "../Components/PageLayout";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const STATUS = {
  completed: {
    color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)",
    icon: CheckCircle2,
    detail: "This project is fully complete and stable.",
  },
  ongoing: {
    color: "#1E90FF", bg: "rgba(30,144,255,0.1)", border: "rgba(30,144,255,0.25)",
    icon: Clock,
    detail: "Actively being worked on — expect updates.",
  },
  "partially working": {
    color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)",
    icon: Wrench,
    detail: "Core features work but some parts are incomplete or broken.",
  },
  archived: {
    color: "#6b7280", bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.25)",
    icon: Archive,
    detail: "No longer maintained. Kept for reference only.",
  },
};

/* ── Status badge with tooltip ── */
function StatusBadge({ status, statusInfo }) {
  const [hover, setHover] = useState(false);
  const cfg = STATUS[status] || STATUS.archived;
  const Icon = cfg.icon;
  const tooltip = statusInfo || cfg.detail;

  return (
    <div className="relative inline-flex" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-default select-none"
        style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
        <Icon size={11} strokeWidth={2.5} />
        <span className="capitalize">{status}</span>
        <Info size={10} style={{ color: cfg.color, opacity: 0.6, marginLeft: "1px" }} />
      </div>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 z-50 w-52 text-xs rounded-xl px-3 py-2.5 pointer-events-none"
            style={{
              background: "rgba(2,21,38,0.97)",
              border: `1px solid ${cfg.border}`,
              color: "#94a3b8",
              boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${cfg.border}`,
              lineHeight: 1.6,
            }}>
            <span style={{ color: cfg.color, fontWeight: 600 }} className="capitalize">{status}</span>
            <span style={{ margin: "0 6px", opacity: 0.3 }}>—</span>
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sidebar card ── */
function SideCard({ label, children }) {
  return (
    <div className="overflow-hidden rounded-2xl"
      style={{ background: "rgba(2,21,38,0.8)", border: "1px solid rgba(30,144,255,0.14)" }}>
      <div className="flex items-center gap-2 px-5 py-3 border-b"
        style={{ borderColor: "rgba(30,144,255,0.1)", background: "rgba(30,144,255,0.04)" }}>
        <div className="w-1 h-3 rounded-full" style={{ background: "#1E90FF", opacity: 0.7 }} />
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: "#1E90FF" }}>{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ── Syntax highlighter ── */
function colorizeCode(raw) {
  // escape HTML first
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split("\n")
    .map(line => {
      let out = line;

      // single-line comments  (do this first before string replacement eats //)
      out = out.replace(/(\/\/[^\n]*|#[^\n]*)/g,
        '<span style="color:#6A9955;font-style:italic">$1</span>');

      // strings (avoid replacing inside already-injected spans)
      out = out.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
        '<span style="color:#CE9178">$1</span>');

      // keywords
      out = out.replace(/\b(import|export|from|default|const|let|var|function|return|if|else|else if|for|while|do|switch|case|break|continue|class|extends|new|this|super|async|await|try|catch|finally|throw|typeof|instanceof|void|null|undefined|true|false|int|char|float|double|long|short|bool|include|define|printf|scanf|cout|cin|main|public|private|protected|static|void)\b/g,
        '<span style="color:#569CD6;font-weight:600">$1</span>');

      // numbers
      out = out.replace(/\b(\d+\.?\d*[fFuUlL]*)\b/g,
        '<span style="color:#B5CEA8">$1</span>');

      // function calls
      out = out.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g,
        '<span style="color:#DCDCAA">$1</span>');

      // types / custom identifiers starting uppercase
      out = out.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g,
        '<span style="color:#4EC9B0">$1</span>');

      return out;
    })
    .join("\n");
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const raw = String(children).replace(/\n$/, "");

  const copy = () => {
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(30,144,255,0.18)" }}>
      {/* titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "rgba(30,144,255,0.06)", borderBottom: "1px solid rgba(30,144,255,0.12)" }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444", opacity: 0.75 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b", opacity: 0.75 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10b981", opacity: 0.75 }} />
        </div>
        <button onClick={copy}
          className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md transition-all duration-200"
          style={{
            color: copied ? "#10b981" : "rgba(148,163,184,0.5)",
            background: copied ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)"}`,
          }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      {/* code */}
      <pre style={{
        background: "#040c17", margin: 0,
        padding: "1.25rem 1.5rem", overflowX: "auto",
        fontSize: "0.84rem", lineHeight: 1.85,
        fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace",
      }}>
        <code dangerouslySetInnerHTML={{ __html: colorizeCode(raw) }} />
      </pre>
    </div>
  );
}

/* ── Markdown renderers ── */
const md = {
  h1: ({ children }) => (
    <h1 style={{ color: "#e2e8f0", fontSize: "1.9rem", fontWeight: 800, marginTop: "2.5rem", marginBottom: "1rem", letterSpacing: "-0.025em", lineHeight: 1.2, borderBottom: "2px solid rgba(30,144,255,0.2)", paddingBottom: "0.5rem" }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ color: "#cbd5e1", fontSize: "1.35rem", fontWeight: 700, marginTop: "2.25rem", marginBottom: "0.75rem", letterSpacing: "-0.015em", lineHeight: 1.3, paddingLeft: "0.85rem", borderLeft: "3px solid #1E90FF" }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ color: "#7dd3fc", fontSize: "1.08rem", fontWeight: 600, marginTop: "1.75rem", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ color: "#bae6fd", fontSize: "0.95rem", fontWeight: 600, marginTop: "1.25rem", marginBottom: "0.4rem" }}>{children}</h4>
  ),
  p: ({ children }) => (
    <p style={{ color: "#94a3b8", lineHeight: 1.85, marginBottom: "1.1rem", fontSize: "0.95rem" }}>{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ color: "#1E90FF", textDecoration: "none", borderBottom: "1px solid rgba(30,144,255,0.35)" }}
      onMouseEnter={e => { e.currentTarget.style.color = "#60a5fa"; e.currentTarget.style.borderBottomColor = "#60a5fa"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "#1E90FF"; e.currentTarget.style.borderBottomColor = "rgba(30,144,255,0.35)"; }}>
      {children}
    </a>
  ),
  strong: ({ children }) => <strong style={{ color: "#cbd5e1", fontWeight: 700 }}>{children}</strong>,
  em: ({ children }) => <em style={{ color: "#cbd5e1", fontStyle: "italic" }}>{children}</em>,
  ul: ({ children }) => <ul style={{ paddingLeft: 0, marginBottom: "1.1rem", listStyle: "none" }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ color: "#94a3b8", paddingLeft: "1.5rem", marginBottom: "1.1rem", listStyleType: "decimal" }}>{children}</ol>,
  li: ({ children }) => (
    <li style={{ marginBottom: "0.45rem", lineHeight: 1.75, fontSize: "0.95rem", display: "flex", alignItems: "flex-start", gap: "0.6rem", color: "#94a3b8" }}>
      <span style={{ color: "#1E90FF", marginTop: "0.52rem", flexShrink: 0, fontSize: "0.45rem" }}>◆</span>
      <span>{children}</span>
    </li>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code style={{ color: "#93c5fd", background: "rgba(30,144,255,0.12)", border: "1px solid rgba(30,144,255,0.2)", padding: "0.1em 0.45em", borderRadius: "0.3rem", fontSize: "0.85em", fontFamily: "'Fira Code', monospace" }}>{children}</code>
    ) : (
      <code>{children}</code>
    ),
  pre: ({ children }) => <CodeBlock>{children?.props?.children}</CodeBlock>,
  blockquote: ({ children }) => (
    <blockquote style={{ borderLeft: "3px solid #1E90FF", background: "rgba(30,144,255,0.06)", borderRadius: "0 0.75rem 0.75rem 0", padding: "1rem 1.25rem", marginBottom: "1.25rem", color: "#94a3b8", fontStyle: "italic" }}>{children}</blockquote>
  ),
  hr: () => (
    <div style={{ margin: "2rem 0", height: "1px", background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.4), transparent)" }} />
  ),
  table: ({ children }) => (
    <div style={{ overflowX: "auto", marginBottom: "1.5rem", borderRadius: "0.75rem", border: "1px solid rgba(30,144,255,0.15)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead style={{ background: "rgba(30,144,255,0.08)" }}>{children}</thead>,
  th: ({ children }) => <th style={{ color: "#94a3b8", padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, borderBottom: "1px solid rgba(30,144,255,0.2)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>{children}</th>,
  td: ({ children }) => <td style={{ color: "#94a3b8", padding: "0.65rem 1rem", borderBottom: "1px solid rgba(30,144,255,0.07)" }}>{children}</td>,
  img: ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: "100%", borderRadius: "0.85rem", border: "1px solid rgba(30,144,255,0.15)", margin: "1.25rem 0", display: "block" }} />,
};

/* ══════════════════════════════════ */
function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [notFound, setNotFound]       = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects").select("*").eq("slug", slug).single();
      if (error || !data) setNotFound(true);
      else setProject(data);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full animate-spin"
            style={{ border: "2px solid rgba(30,144,255,0.15)", borderTopColor: "#1E90FF" }} />
          <div className="absolute inset-0 rounded-full blur-md" style={{ background: "rgba(30,144,255,0.15)" }} />
        </div>
        <p className="text-sm tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.5)" }}>Loading…</p>
      </div>
    </PageLayout>
  );

  if (notFound) return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-5 text-center">
        <AlertCircle className="w-14 h-14" style={{ color: "rgba(239,68,68,0.7)" }} />
        <h2 className="text-2xl font-bold" style={{ color: "#94a3b8" }}>Project not found</h2>
        <p style={{ color: "#64748b" }}>Nothing lives at <span style={{ color: "#1E90FF", fontFamily: "monospace" }}>/projects/{slug}</span></p>
        <Link to="/projects"
          className="flex items-center gap-2 px-5 py-2.5 mt-1 text-sm font-semibold rounded-xl transition-all"
          style={{ border: "1px solid rgba(30,144,255,0.3)", color: "#94a3b8" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(30,144,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>
    </PageLayout>
  );

  // ── short date: "Sep 2022"
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Ongoing";

  const hasImages = project.images?.length > 0;
  const hasLinks  = project.git_link || project.live_link || project.demo_link;

  return (
    <PageLayout>
      {/* ambient glow */}
      <div className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 60% 10%, rgba(30,144,255,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 pt-6 pb-24 sm:pt-10">

        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 mb-10 text-sm font-medium transition-colors group"
            style={{ color: "rgba(148,163,184,0.55)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#e2e8f0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(148,163,184,0.55)"}>
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            All Projects
          </Link>
        </motion.div>

        {/* ── HERO ── */}
        <motion.div {...fadeUp(0.05)} className="mb-12">

          {/* ── Status badge (prominent, standalone) ── */}
          <div className="mb-4">
            <StatusBadge status={project.status} statusInfo={project.status_info} />
          </div>

          {/* title */}
          <div className="relative mb-4">
            <div className="absolute -left-4 top-1 bottom-1 w-0.5 rounded-full hidden sm:block"
              style={{ background: "linear-gradient(180deg, #1E90FF 0%, rgba(30,144,255,0) 100%)" }} />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#e2e8f0", lineHeight: 1.1 }}>
              {project.title_disp}
            </h1>
          </div>

          {/* concise desc */}
          <p className="max-w-3xl mb-5 text-base leading-relaxed sm:text-lg" style={{ color: "#64748b" }}>
            {project.desc_concise}
          </p>

          {/* meta strip — category, type, date all here as small pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* date */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full"
              style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Calendar size={10} style={{ color: "#1E90FF", opacity: 0.7 }} />
              {formattedDate}
            </span>

            {/* category */}
            {project.category && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full"
                style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Tag size={10} style={{ color: "#1E90FF", opacity: 0.7 }} />
                {project.category}
              </span>
            )}

            {/* type */}
            {project.type && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full"
                style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Layers size={10} style={{ color: "#1E90FF", opacity: 0.7 }} />
                {project.type}
              </span>
            )}

            {/* tech count */}
            {project.tech_stack?.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full"
                style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <GitBranch size={10} style={{ color: "#1E90FF", opacity: 0.7 }} />
                {project.tech_stack.length} technologies
              </span>
            )}

            {/* contributors count */}
            {project.contributors?.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full"
                style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Users size={10} style={{ color: "#1E90FF", opacity: 0.7 }} />
                {project.contributors.length} contributor{project.contributors.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </motion.div>

        {/* divider */}
        <div className="w-full h-px mb-12"
          style={{ background: "linear-gradient(90deg, rgba(30,144,255,0.4), rgba(30,144,255,0.05) 70%, transparent)" }} />

        {/* ── IMAGES + SIDEBAR ── */}
        <div className="flex flex-col gap-8 mb-14 lg:flex-row lg:gap-10 lg:items-start">

          {/* images */}
          {hasImages && (
            <motion.div {...fadeUp(0.1)} className="flex-1 min-w-0">
              <div className="relative flex items-center justify-center w-full mb-3 overflow-hidden rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, #040c17, #021526)",
                  border: "1px solid rgba(30,144,255,0.18)",
                  minHeight: "260px", maxHeight: "520px",
                  boxShadow: "0 0 40px rgba(30,144,255,0.05) inset",
                }}>
                <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.5), transparent)" }} />
                <motion.img
                  key={activeImage}
                  src={project.images[activeImage]}
                  alt={`${project.title_disp} screenshot ${activeImage + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="object-contain w-full p-4"
                  style={{ maxHeight: "520px" }}
                />
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 text-xs font-mono rounded-lg"
                    style={{ background: "rgba(4,12,23,0.9)", border: "1px solid rgba(30,144,255,0.2)", color: "rgba(148,163,184,0.6)" }}>
                    {activeImage + 1} / {project.images.length}
                  </div>
                )}
              </div>

              {project.images.length > 1 && (
                <div className="flex gap-2 pb-1 mt-2 overflow-x-auto">
                  {project.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 ${activeImage === i ? "opacity-100" : "opacity-35 hover:opacity-65"}`}
                      style={{
                        background: "#040c17",
                        border: activeImage === i ? "2px solid #1E90FF" : "1px solid rgba(30,144,255,0.12)",
                        boxShadow: activeImage === i ? "0 0 12px rgba(30,144,255,0.3)" : "none",
                        outline: "none",
                      }}>
                      <img src={img} alt={`thumb ${i + 1}`} className="object-contain w-full h-full p-1" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* sidebar */}
          <motion.aside {...fadeUp(0.15)} className="flex flex-col w-full gap-4 lg:w-72 xl:w-80 shrink-0">

            {/* Links */}
            {hasLinks && (
              <SideCard label="Links">
                <div className="flex flex-col gap-2">
                  {project.live_link && (
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200"
                      style={{ color: "#1E90FF", background: "rgba(30,144,255,0.1)", border: "1px solid rgba(30,144,255,0.3)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,144,255,0.18)"; e.currentTarget.style.borderColor = "rgba(30,144,255,0.5)"; e.currentTarget.style.color = "#60a5fa"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,144,255,0.1)"; e.currentTarget.style.borderColor = "rgba(30,144,255,0.3)"; e.currentTarget.style.color = "#1E90FF"; }}>
                      <ExternalLink size={15} /> View Live
                    </a>
                  )}
                  {project.git_link && (
                    <a href={project.git_link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200"
                      style={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                      <Github size={15} /> Source Code
                    </a>
                  )}
                  {project.demo_link && (
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200"
                      style={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#fca5a5"; e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                      <Youtube size={15} /> Watch Demo
                    </a>
                  )}
                </div>
              </SideCard>
            )}

            {/* Tech Stack */}
            {project.tech_stack?.length > 0 && (
              <SideCard label="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, i) => (
                    <span key={i}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 cursor-default"
                      style={{ background: "rgba(30,144,255,0.08)", border: "1px solid rgba(30,144,255,0.18)", color: "#64748b" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,144,255,0.16)"; e.currentTarget.style.borderColor = "rgba(30,144,255,0.4)"; e.currentTarget.style.color = "#93c5fd"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,144,255,0.08)"; e.currentTarget.style.borderColor = "rgba(30,144,255,0.18)"; e.currentTarget.style.color = "#64748b"; }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </SideCard>
            )}

            {/* Details — status removed from here, lives in hero now */}
            <SideCard label="Details">
              <div>
                {[
                  { label: "Category", value: project.category },
                  { label: "Type",     value: project.type     },
                  { label: "Date",     value: formattedDate    },
                ].filter(r => r.value).map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3 py-2.5 border-b last:border-0"
                    style={{ borderColor: "rgba(30,144,255,0.07)" }}>
                    <span className="text-xs shrink-0" style={{ color: "rgba(100,116,139,0.7)" }}>{label}</span>
                    <span className="text-xs font-medium capitalize" style={{ color: "#94a3b8" }}>{value}</span>
                  </div>
                ))}
              </div>
            </SideCard>

            {/* Contributors */}
            {project.contributors?.length > 0 && (
              <SideCard label="Contributors">
                <div className="flex flex-col gap-2">
                  {project.contributors.map((c, i) => (
                    <a key={i}
                      href={c.github || undefined} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${c.github ? "cursor-pointer" : "cursor-default"}`}
                      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                      onMouseEnter={e => c.github && (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full shrink-0"
                        style={{ background: "rgba(30,144,255,0.12)", color: "#60a5fa" }}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>{c.name}</span>
                      {c.github && <Github size={13} className="ml-auto" style={{ color: "rgba(148,163,184,0.25)" }} />}
                    </a>
                  ))}
                </div>
              </SideCard>
            )}

          </motion.aside>
        </div>

        {/* ── FULL-WIDTH MARKDOWN ── */}
        {project.desc_detailed && (
          <motion.div {...fadeUp(0.2)}>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-1 h-4 rounded-full" style={{ background: "#1E90FF" }} />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "#1E90FF" }}>
                  About this project
                </span>
              </div>
              <div className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(30,144,255,0.25), transparent)" }} />
            </div>

            <div className="w-full p-6 rounded-2xl sm:p-10"
              style={{
                background: "rgba(2,21,38,0.7)",
                border: "1px solid rgba(30,144,255,0.12)",
                boxShadow: "0 0 60px rgba(30,144,255,0.03) inset",
              }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                {project.desc_detailed}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}

      </div>
    </PageLayout>
  );
}

export default ProjectDetail;