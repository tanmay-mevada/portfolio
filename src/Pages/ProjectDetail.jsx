import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  ArrowLeft, Github, ExternalLink, Youtube,
  Calendar, Tag, Users, Loader2, AlertCircle,
  GitBranch, Layers, CheckCircle2, Clock, Archive, Wrench
} from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageLayout from "../Components/PageLayout";

/* ── animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

/* ── status config ── */
const STATUS = {
  completed:          { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", icon: CheckCircle2 },
  ongoing:            { color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/25",    icon: Clock       },
  "partially working":{ color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/25",   icon: Wrench      },
  archived:           { color: "text-gray-400",    bg: "bg-gray-500/10",    border: "border-gray-500/25",    icon: Archive     },
};

/* ────────────────────────────────────────────── */
function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects").select("*").eq("slug", slug).single();
      if (error || !data) setNotFound(true);
      else setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  /* ── loading ── */
  if (loading) return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        <p className="text-sm tracking-wide">Loading project…</p>
      </div>
    </PageLayout>
  );

  /* ── 404 ── */
  if (notFound) return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-5 text-center">
        <AlertCircle className="w-14 h-14 text-red-400/80" />
        <h2 className="text-2xl font-bold text-white">Project not found</h2>
        <p className="text-gray-400">Nothing lives at <span className="font-mono text-blue-400">/projects/{slug}</span></p>
        <Link to="/projects"
          className="flex items-center gap-2 px-5 py-2.5 mt-1 text-sm font-semibold text-white transition-all border rounded-xl border-blue/30 hover:bg-blue/10">
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>
    </PageLayout>
  );

  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
    : "Ongoing";

  const statusCfg = STATUS[project.status] || STATUS.archived;
  const StatusIcon = statusCfg.icon;
  const hasImages = project.images && project.images.length > 0;
  const hasLinks  = project.git_link || project.live_link || project.demo_link;

  return (
    <PageLayout>
      <div className="pt-6 pb-24 sm:pt-10">

        {/* ── Back ── */}
        <motion.div {...fadeUp(0)}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-gray-500 transition-colors hover:text-white group">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            All Projects
          </Link>
        </motion.div>

        {/* ══════════════════════════════════════
            HERO — full-width title block
        ══════════════════════════════════════ */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${statusCfg.color} ${statusCfg.bg} ${statusCfg.border}`}>
              <StatusIcon size={11} strokeWidth={2.5} />
              {project.status}
            </span>
            {project.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-400 border rounded-full bg-white/5 border-white/10">
                <Tag size={10} /> {project.category}
              </span>
            )}
            {project.type && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-500 border rounded-full bg-white/5 border-white/10">
                <Layers size={10} /> {project.type}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
            {project.title_disp}
          </h1>

          {/* Concise desc */}
          <p className="max-w-3xl text-base leading-relaxed sm:text-lg text-slate-400">
            {project.desc_concise}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {formattedDate}
            </span>
            {project.tech_stack?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <GitBranch size={12} /> {project.tech_stack.length} technologies
              </span>
            )}
            {project.contributors?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Users size={12} /> {project.contributors.length} contributor{project.contributors.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </motion.div>

        {/* Thin divider */}
        <div className="w-full h-px mb-10" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.3), rgba(59,130,246,0.05) 80%, transparent)" }} />

        {/* ══════════════════════════════════════
            TWO-COLUMN LAYOUT
            Left: images + markdown
            Right: sticky sidebar
        ══════════════════════════════════════ */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0">

            {/* Images */}
            {hasImages && (
              <motion.div {...fadeUp(0.1)} className="mb-10">
                {/* Main viewer */}
                <div
                  className="relative flex items-center justify-center w-full mb-3 overflow-hidden rounded-2xl"
                  style={{
                    background: "linear-gradient(145deg, #060d18, #0a1628)",
                    border: "1px solid rgba(59,130,246,0.15)",
                    minHeight: "260px",
                    maxHeight: "520px",
                  }}
                >
                  {/* top glow line */}
                  <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" }} />

                  <motion.img
                    key={activeImage}
                    src={project.images[activeImage]}
                    alt={`${project.title_disp} screenshot ${activeImage + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="object-contain w-full p-4"
                    style={{ maxHeight: "520px" }}
                  />

                  {/* image counter */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 text-xs font-medium text-gray-400 rounded-lg"
                      style={{ background: "rgba(6,13,24,0.8)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      {activeImage + 1} / {project.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {project.images.length > 1 && (
                  <div className="flex gap-2 pb-1 overflow-x-auto">
                    {project.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)}
                        className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                          activeImage === i
                            ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0a1628] opacity-100"
                            : "opacity-40 hover:opacity-70"
                        }`}
                        style={{ background: "#060d18", border: "1px solid rgba(59,130,246,0.1)" }}
                      >
                        <img src={img} alt={`thumb ${i + 1}`} className="object-contain w-full h-full p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Markdown — detailed description */}
            {project.desc_detailed && (
              <motion.div {...fadeUp(0.15)}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">About</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(59,130,246,0.15)" }} />
                </div>

                <div
                  className="p-6 rounded-2xl sm:p-8"
                  style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.1)" }}
                >
                  <div className="
                    prose prose-invert max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                    prose-h3:text-lg prose-h3:text-blue-300 prose-h3:mt-6
                    prose-p:text-slate-400 prose-p:leading-7
                    prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white prose-strong:font-semibold
                    prose-em:text-slate-300
                    prose-ul:text-slate-400 prose-ol:text-slate-400
                    prose-li:marker:text-blue-500
                    prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-[#040c17] prose-pre:border prose-pre:border-blue-500/15 prose-pre:rounded-xl prose-pre:text-sm
                    prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-400 prose-blockquote:bg-blue-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
                    prose-hr:border-blue-500/10
                    prose-table:text-sm
                    prose-th:text-white prose-th:border-blue-500/20
                    prose-td:text-slate-400 prose-td:border-blue-500/10
                    prose-img:rounded-xl prose-img:border prose-img:border-blue-500/10
                  ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {project.desc_detailed}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <motion.aside
            {...fadeUp(0.2)}
            className="flex flex-col w-full gap-5 lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-8"
          >

            {/* Action links card */}
            {hasLinks && (
              <div className="overflow-hidden rounded-2xl"
                style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.15)" }}>
                <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                  <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Links</span>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {project.live_link && (
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-all duration-200 bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20">
                      <ExternalLink size={15} /> View Live
                    </a>
                  )}
                  {project.git_link && (
                    <a href={project.git_link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-gray-300 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/5"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Github size={15} /> Source Code
                    </a>
                  )}
                  {project.demo_link && (
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-gray-300 rounded-xl transition-all duration-200 hover:text-white hover:bg-red-500/10"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Youtube size={15} /> Watch Demo
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Tech stack card */}
            {project.tech_stack?.length > 0 && (
              <div className="overflow-hidden rounded-2xl"
                style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.12)" }}>
                <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                  <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                  {project.tech_stack.map((tech, i) => (
                    <span key={i}
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 rounded-lg"
                      style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project info card */}
            <div className="overflow-hidden rounded-2xl"
              style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Details</span>
              </div>
              <div className="p-4">
                {[
                  { label: "Status",   value: project.status,   extra: project.status_info },
                  { label: "Category", value: project.category  },
                  { label: "Type",     value: project.type      },
                  { label: "Date",     value: formattedDate     },
                ].filter(r => r.value).map(({ label, value, extra }) => (
                  <div key={label} className="flex items-start justify-between gap-3 py-2.5 border-b last:border-0"
                    style={{ borderColor: "rgba(59,130,246,0.07)" }}>
                    <span className="text-xs text-gray-500 shrink-0 pt-0.5">{label}</span>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-300 capitalize">{value}</span>
                      {extra && <p className="mt-0.5 text-[10px] text-gray-500">{extra}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributors card */}
            {project.contributors?.length > 0 && (
              <div className="overflow-hidden rounded-2xl"
                style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.12)" }}>
                <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                  <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Contributors</span>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {project.contributors.map((c, i) => (
                    <a key={i}
                      href={c.github || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${c.github ? "hover:bg-white/5 cursor-pointer" : "cursor-default"}`}
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-300 rounded-full shrink-0"
                        style={{ background: "rgba(59,130,246,0.15)" }}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-300">{c.name}</span>
                      {c.github && <Github size={13} className="ml-auto text-gray-600" />}
                    </a>
                  ))}
                </div>
              </div>
            )}

          </motion.aside>
        </div>

      </div>
    </PageLayout>
  );
}

export default ProjectDetail;