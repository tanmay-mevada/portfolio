import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "../Components/ProjectCard";
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
          .from('projects')
          .select('*')
          .order('date', { ascending: false, nullsFirst: false }); // Primary sort by our new date column

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

  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];

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

    // Updated Search filter referencing the new schema
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

    // Updated Sort logic referencing the new schema
    filtered = [...filtered].sort((a, b) => {
      // Fallback to created_at if date is empty
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

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || sortBy !== "date-desc";

  if (loading) {
    return (
      <section id="projects" className="flex flex-col items-center justify-center w-full min-h-screen py-16 text-white bg-dark">
        <Loader2 className="w-10 h-10 mb-4 animate-spin text-blue" />
        <p className="text-gray-400">Loading projects...</p>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="w-full min-h-screen px-4 py-16 text-center text-white sm:px-10 lg:px-20 xl:px-32 2xl:px-48 bg-dark"
    >
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col gap-3 mb-1 sm:flex-row">
          
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pr-3 text-sm text-white placeholder-gray-400 transition-colors border rounded-lg pl-9 bg-dark2 border-blue/20 focus:outline-none focus:border-blue/50"
            />
          </div>

          <div className="relative sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm text-white transition-colors border rounded-lg appearance-none cursor-pointer bg-dark2 border-blue/20 focus:outline-none focus:border-blue/50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" size={16} />
          </div>

          <div className="relative sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-sm text-white transition-colors border rounded-lg appearance-none cursor-pointer bg-dark2 border-blue/20 focus:outline-none focus:border-blue/50"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
            <ChevronDown className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" size={16} />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {filteredProjects.length} of {projects.length} projects
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 transition-colors text-blue hover:text-blue/80"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-400">No projects found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 mt-4 transition-colors border rounded-lg bg-blue/20 border-blue/40 text-blue hover:bg-blue/30"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-2">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} {...proj} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;