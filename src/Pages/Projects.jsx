import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "../Components/ProjectCard";
import PageLayout from "../Components/PageLayout";
import { supabase } from "../supabaseClient";
import { Search, X, ChevronDown} from "lucide-react";
// 1. Import the Matrix Background
import HoverMatrixBackground from "../Components/HoverMatrixBG";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("date", { ascending: false, nullsFirst: false });
        if (error) throw error;
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") searchInputRef.current?.blur();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.title_disp && p.title_disp.toLowerCase().includes(query)) ||
          (p.desc_concise && p.desc_concise.toLowerCase().includes(query)) ||
          (p.tech_stack && p.tech_stack.some((t) => t.toLowerCase().includes(query)))
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date || a.created_at);
      const dateB = new Date(b.date || b.created_at);
      switch (sortBy) {
        case "date-desc":  return dateB - dateA;
        case "date-asc":   return dateA - dateB;
        case "title-asc":  return (a.title_disp || "").localeCompare(b.title_disp || "");
        case "title-desc": return (b.title_disp || "").localeCompare(a.title_disp || "");
        default:           return 0;
      }
    });
    setFilteredProjects(filtered);
  }, [searchQuery, selectedCategory, sortBy, projects]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("date-desc");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || sortBy !== "date-desc";

  /* 2. UPGRADED Shared styles for glassmorphism inputs */
  const inputStyle = {
    background: "rgba(2,21,38,0.4)", // More transparent
    backdropFilter: "blur(12px)", // Glass blur added
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(30,144,255,0.18)",
    color: "#cbd5e1", // Slightly brighter text so it's readable on glass
  };
  const inputFocusOn  = e => { e.currentTarget.style.borderColor = "rgba(30,144,255,0.45)"; e.currentTarget.style.color = "#ffffff"; };
  const inputFocusOff = e => { e.currentTarget.style.borderColor = "rgba(30,144,255,0.18)"; e.currentTarget.style.color = "#cbd5e1"; };

  if (loading) {
    return (
      <PageLayout className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-10 h-10 mb-4">
          <div className="absolute inset-0 rounded-full animate-spin"
            style={{ border: "2px solid rgba(30,144,255,0.15)", borderTopColor: "#1E90FF" }} />
        </div>
        <p style={{ color: "#475569" }} className="text-sm tracking-wide">Loading projects…</p>
      </PageLayout>
    );
  }

  return (
    <>
      {/* 3. Add Matrix Background at the very top */}
      <HoverMatrixBackground />
      
      <PageLayout>
        {/* Search and Filters */}
        <div className="relative z-10 mb-8 pt-14 sm:mb-10">
          <div className="flex flex-col gap-3 mb-4 md:flex-row md:gap-4">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute transform -translate-y-1/2 left-4 top-1/2" size={16}
                style={{ color: "#94a3b8" }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search projects, tech… (press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pr-4 text-sm transition-all duration-200 outline-none placeholder-gray-400/60 rounded-xl pl-11"
                style={inputStyle}
                onFocus={inputFocusOn}
                onBlur={inputFocusOff}
              />
            </div>

            {/* Category */}
            <div className="relative w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 text-sm transition-all duration-200 outline-none appearance-none cursor-pointer rounded-xl"
                style={inputStyle}
                onFocus={inputFocusOn}
                onBlur={inputFocusOff}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#021526", color: "#94a3b8" }}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2"
                size={15} style={{ color: "#94a3b8" }} />
            </div>

            {/* Sort */}
            <div className="relative w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 text-sm transition-all duration-200 outline-none appearance-none cursor-pointer rounded-xl"
                style={inputStyle}
                onFocus={inputFocusOn}
                onBlur={inputFocusOff}
              >
                <option value="date-desc" style={{ background: "#021526", color: "#94a3b8" }}>Newest First</option>
                <option value="date-asc"  style={{ background: "#021526", color: "#94a3b8" }}>Oldest First</option>
                <option value="title-asc" style={{ background: "#021526", color: "#94a3b8" }}>Title (A–Z)</option>
                <option value="title-desc"style={{ background: "#021526", color: "#94a3b8" }}>Title (Z–A)</option>
              </select>
              <ChevronDown className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2"
                size={15} style={{ color: "#94a3b8" }} />
            </div>
          </div>

          {/* Count + clear */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-medium tracking-widest uppercase">
            <span style={{ color: "#64748b" }}>
              {filteredProjects.length} of {projects.length} projects
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 transition-colors duration-200"
                style={{ color: "#1E90FF" }}
                onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.color = "#1E90FF"}
              >
                <X size={13} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="relative z-10">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed sm:py-24 rounded-2xl backdrop-blur-md"
              style={{ borderColor: "rgba(30,144,255,0.2)", background: "rgba(2,21,38,0.3)" }}>
              <p className="text-lg" style={{ color: "#94a3b8" }}>
                No projects match your filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 mt-6 text-sm font-semibold transition-all duration-200 rounded-xl hover:scale-105"
                style={{
                  color: "#1E90FF",
                  background: "rgba(30,144,255,0.08)",
                  border: "1px solid rgba(30,144,255,0.25)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(30,144,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(30,144,255,0.08)"}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
              {filteredProjects.map((proj) => (
                <ProjectCard key={proj.id} {...proj} />
              ))}
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
}

export default Projects;