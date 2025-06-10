import React from "react";
import ProjectCard from "../Components/ProjectCard";
import { projects } from "../Data/ProjectData";

function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-10 md:px-40 py-16 bg-dark text-white text-center"
    >
      <h2 className="text-4xl font-bold mb-12 text-blue">Projects</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2">
        {projects.map((proj, i) => (
          <ProjectCard key={i} {...proj} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
