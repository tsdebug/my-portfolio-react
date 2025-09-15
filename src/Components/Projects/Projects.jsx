import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <div id="Projects" className="p-10 md:p-24 text-white ">
      <h1 className="text-2xl md:text-4xl text-white font-bold">Projects</h1>
      <div className="py-12 px-8 flex flex-wrap gap-5">
        <ProjectCard
          title="Bg-Color Changer"
          main="A background color changing mini project using React Vite, making use of the basics of React features."
        />
        <ProjectCard
          title="To-Do-List"
          main="A theme changing mini project using JavaScript, to show how the Javascript is used to add logic."
        />
        <ProjectCard
          title="Code Generator"
          main="A React vite and tailwindcss project to show how react hooks work and the logics used."
        />
        <ProjectCard
          title="Theme Changer"
          main="A theme changing mini project using React Vite, just like the toggle button for the offical tailwindcss site"
        />
      </div>
    </div>
  );
};

export default Projects;