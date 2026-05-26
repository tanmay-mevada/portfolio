import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "../Components/ProjectCard";
import PageLayout from "../Components/PageLayout";
import { supabase } from "../supabaseClient";
import { Search, X, ChevronDown, Loader2 } from "lucide-react";

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
      if (e.key === "Escape") {
        searchInputRef.current?.blur();
      }
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
        case "date-desc":
          return dateB - dateA;
        case "date-asc":
          return dateA - dateB;
        case "title-asc":
          return (a.title_disp || "").localeCompare(b.title_disp || "");
        case "title-desc":
          return (b.title_disp || "").localeCompare(a.title_disp || "");
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [searchQuery, selectedCategory, sortBy, projects]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("date-desc");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || sortBy !== "date-desc";

  if (loading) {
    return (
      <PageLayout className="flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 mb-4 animate-spin text-blue" />
        <p className="text-gray-400">Loading projects...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Page heading
      <div className="pt-8 mb-8 sm:pt-10 sm:mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Projects
        </h1>
        <p className="mt-1 text-sm text-gray-500">Things I've built</p>
      </div> */}

      {/* Search and Filters */}
      <div className="mb-8 pt-14 sm:mb-10">
        <div className="flex flex-col gap-3 mb-4 md:flex-row md:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
              size={18}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-4 text-sm text-white placeholder-gray-400 transition-colors border rounded-xl pl-12 bg-dark2 border-blue/20 focus:outline-none focus:border-blue/50 focus:bg-[#0B1221]"
            />
          </div>

          {/* Category */}
          <div className="relative w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 text-sm text-white transition-colors border rounded-xl appearance-none cursor-pointer bg-dark2 border-blue/20 focus:outline-none focus:border-blue/50 focus:bg-[#0B1221]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-4 top-1/2"
              size={16}
            />
          </div>

          {/* Sort */}
          <div className="relative w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 text-sm text-white transition-colors border rounded-xl appearance-none cursor-pointer bg-dark2 border-blue/20 focus:outline-none focus:border-blue/50 focus:bg-[#0B1221]"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
            <ChevronDown
              className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-4 top-1/2"
              size={16}
            />
          </div>
        </div>

        {/* Count + Clear */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
          <span>
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 transition-colors text-blue hover:text-blue/80"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed sm:py-24 rounded-2xl border-blue/10 bg-dark2/30">
          <p className="text-lg text-gray-400">
            No projects found matching your criteria.
          </p>
          <button
            onClick={clearFilters}
            className="px-8 py-3 mt-6 font-semibold transition-all border rounded-lg bg-blue/10 border-blue/30 text-blue hover:bg-blue/20 hover:scale-105"
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
    </PageLayout>
  );
}

export default Projects;