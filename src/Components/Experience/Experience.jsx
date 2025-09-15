import React from "react";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaJava,
  FaWordpressSimple,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiMongodb
} from "react-icons/si";
import { TbSeo } from "react-icons/tb";
import { MdOutlineApi } from "react-icons/md";

const Experience = () => {
  return (
    <div id="Experience" className="p-10 md:p-24 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        My Skills & Experience
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">
          Core Skills & Technologies
        </h2>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {/* Main Web Development & Programming */}
          <SkillIcon icon={<FaHtml5 color="#E34F26" />} name="HTML5" />
          <SkillIcon icon={<FaCss3 color="#1572B6" />} name="CSS3" />
          <SkillIcon icon={<FaJs color="#F7DF1E" />} name="JavaScript" />
          <SkillIcon icon={<FaReact color="#61DAFB" />} name="React.js" />
          <SkillIcon
            icon={<SiTailwindcss color="#06B6D4" />}
            name="TailwindCSS"
          />
          <SkillIcon icon={<FaNodeJs color="#339933" />} name="Node.js" />
          <SkillIcon icon={<FaPython color="#3776AB" />} name="Python" />
          <SkillIcon icon={<FaGitAlt color="#F05032" />} name="Git" />
          <SkillIcon icon={<FaGithub color="#181717" />} name="GitHub" />

          {/* Databases */}
          <SkillIcon icon={<SiMysql color="#4479A1" />} name="MySQL" />
          <SkillIcon icon={<SiMongodb color="#47A248" />} name="MongoDB" />

          {/* Other Important Tools/Concepts */}
          
          <SkillIcon icon={<MdOutlineApi color="#F8991D" />} name="APIs" />
          <SkillIcon icon={<TbSeo color="#F4B400" />} name="SEO" />
          <SkillIcon
            icon={<FaWordpressSimple color="#21759B" />}
            name="WordPress"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">
          Work Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExperienceCard
            company="Tech Solutions Inc."
            title="Software Developer Intern"
            duration="May 2023 - Aug 2023"
            description={[
              "Developed responsive web applications using React and Node.js.",
              "Implemented RESTful APIs for data management.",
              "Collaborated with senior engineers on project features.",
            ]}
            icon={<FaReact color="#61DAFB" size={40} />}
          />
          <ExperienceCard
            company="Data Innovations Co."
            title="Data Analyst Assistant"
            duration="Jan 2023 - Apr 2023"
            description={[
              "Assisted in data cleaning and analysis using Python (NumPy, Pandas).",
              "Created dashboards and reports to visualize key metrics.",
              "Utilized MySQL for database querying and management.",
            ]}
            icon={<SiMysql color="#4479A1" size={40} />}
          />
          <ExperienceCard
            company="Web Design Studio"
            title="Freelance Web Designer"
            duration="Sept 2022 - Present"
            description={[
              "Designed and developed custom WordPress websites for clients.",
              "Ensured responsive design and SEO best practices.",
              "Used Canva and Photoshop for graphic elements.",
            ]}
            icon={<FaWordpressSimple color="#21759B" size={40} />}
          />
        </div>
      </section>
    </div>
  );
};

// Helper component for Skill Icons
const SkillIcon = ({ icon, name }) => (
  <div className="flex flex-col items-center p-4 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 rounded-lg shadow-lg w-28 h-28 justify-center">
    <div className="text-5xl mb-2">{icon}</div>
    <span className="text-sm text-center font-medium">{name}</span>
  </div>
);

// Helper component for Experience Cards
const ExperienceCard = ({ company, title, duration, description, icon }) => (
  <div className="bg-zinc-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold leading-tight">{title}</h3>
        <p className="text-base text-gray-300 leading-tight">{company}</p>
        <p className="text-sm font-thin text-gray-400 leading-tight">
          {duration}
        </p>
      </div>
    </div>
    <ul className="text-sm list-disc pl-5 text-gray-300">
      {description.map((item, index) => (
        <li key={index} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Experience;