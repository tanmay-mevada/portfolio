import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "../Components/ProjectCard"; // Make sure path is correct
import { supabase } from "../supabaseClient"; // Import Supabase!
import { Search, X, ChevronDown, Loader2 } from "lucide-react";

function Projects() {
  // 1. New State for Cloud Data
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Your Existing Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const searchInputRef = useRef(null);

  // --- FETCH FROM CLOUD ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setProjects(data);
        setFilteredProjects(data); // Set initial filtered view
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Dynamically generate categories based on what's in the DB
  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  // Keyboard shortcut for search
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

  // Filter and sort logic
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tech && p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.created_at) - new Date(a.created_at);
        case "date-asc":
          return new Date(a.created_at) - new Date(b.created_at);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
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

  // Loading State
  if (loading) {
    return (
      <section id="projects" className="flex flex-col items-center justify-center w-full min-h-screen py-16 text-white bg-dark">
        <Loader2 className="w-10 h-10 mb-4 animate-spin text-blue" />
        <p className="text-gray-400">Loading your awesome projects...</p>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="w-full min-h-screen px-4 py-16 text-center text-white sm:px-10 lg:px-20 xl:px-32 2xl:px-48 bg-dark"
    >
      {/* Compact Search and Filter Controls */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col gap-3 mb-1 sm:flex-row">
          
          {/* Search Bar */}
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

          {/* Category Filter */}
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

          {/* Sort Filter */}
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

        {/* Clear Filters + Count */}
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

      {/* Projects Grid or Empty State */}
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