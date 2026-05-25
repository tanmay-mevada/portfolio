import React from "react";
import { Github, ExternalLink } from "lucide-react";

// Updated to receive the new database schema properties
function ProjectCard({
    title_disp,
    slug,
    date,
    category,
    desc_concise,
    tech_stack,
    images,
    git_link,
    live_link,
}) {
    // Grab the first image from the array, or use a placeholder if empty
    const thumbnail =
        images && images.length > 0 ? images[0] : "/placeholder-image.jpg";

    return (
        <div className="flex flex-col overflow-hidden text-left transition-all duration-300 border shadow-lg bg-dark2 border-blue/20 rounded-2xl hover:-translate-y-2 hover:shadow-blue/10">
            {/* Top Image Section */}
            <div className="relative h-48 overflow-hidden sm:h-56 bg-dark">
                <img
                    src={thumbnail}
                    alt={title_disp || "Project Thumbnail"}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                {/* Category Badge */}
                {category && (
                    <div className="absolute px-3 py-1 text-xs font-semibold rounded-full top-4 right-4 bg-dark/80 text-blue backdrop-blur-sm">
                        {category}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6 sm:p-8">
                {/* Date / Status Area */}
                <div className="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase">
                    {date
                        ? new Date(date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                        })
                        : "Ongoing"}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    {title_disp}
                </h3>

                {/* Concise Description */}
                <p className="flex-1 mb-6 text-sm leading-relaxed text-gray-400 sm:text-base">
                    {desc_concise}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {/* Notice the safe chaining (?.) below to prevent that crash! */}
                    {tech_stack?.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium transition-colors border rounded-md text-blue bg-blue/5 border-blue/20 hover:bg-blue/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 mt-auto">
                    {git_link && (
                        <a
                            href={git_link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                        >
                            <Github size={18} />
                            Code
                        </a>
                    )}
                    {live_link && (
                        <a
                            href={live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm font-medium transition-colors text-blue hover:text-blue/80"
                        >
                            <ExternalLink size={18} />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
