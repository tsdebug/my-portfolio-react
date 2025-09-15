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
  FaWordpressSimple,
} from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiMongodb } from "react-icons/si";
import { TbSeo } from "react-icons/tb";
import { MdOutlineApi } from "react-icons/md";

const Experience = () => {
  return (
    <div id="Experience" className="p-10 md:p-24 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        My Skills & Experience
      </h1>

      {/* Core Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">
          Core Skills & Technologies
        </h2>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <SkillIcon icon={<FaHtml5 color="#E34F26" />} name="HTML5" />
          <SkillIcon icon={<FaCss3 color="#1572B6" />} name="CSS3" />
          <SkillIcon icon={<FaJs color="#F7DF1E" />} name="JavaScript" />
          <SkillIcon icon={<FaReact color="#61DAFB" />} name="React.js" />
          <SkillIcon icon={<SiTailwindcss color="#06B6D4" />} name="TailwindCSS" />
          <SkillIcon icon={<FaNodeJs color="#339933" />} name="Node.js" />
          <SkillIcon icon={<FaPython color="#3776AB" />} name="Python" />
          <SkillIcon icon={<FaGitAlt color="#F05032" />} name="Git" />
          <SkillIcon icon={<FaGithub color="#fcf7f7" />} name="GitHub" />
          <SkillIcon icon={<SiMysql color="#4479A1" />} name="MySQL" />
          <SkillIcon icon={<SiMongodb color="#47A248" />} name="MongoDB" />
          <SkillIcon icon={<MdOutlineApi color="#F8991D" />} name="APIs" />
          <SkillIcon icon={<TbSeo color="#F4B400" />} name="SEO" />
          <SkillIcon icon={<FaWordpressSimple color="#21759B" />} name="WordPress" />
        </div>
      </section>

      {/* Work Experience Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">
          Work Experience
        </h2>
        <div className="space-y-8 max-w-5xl mx-auto">
          <ExperienceCard
            company="CodSoft"
            title="Web Development Intern (Virtual)"
            duration="Aug 2024 - Sep 2024"
            description={[
              "Explored VS Code functionalities, improving efficiency in debugging and modifying code.",
              "Adapted and modified pre-existing projects (Calculator, Landing Page, Portfolio) by studying and understanding different code components.",
              "Strengthened front-end skills using HTML, CSS, and JavaScript through self-guided learning and hands-on projects."
            ]}
            icon={<FaHtml5 color="#E34F26" size={38} />}
          />

          <ExperienceCard
            company="Unileaf"
            title="Full-Stack Development Intern"
            duration="Nov 2024 - Present"
            description={[
              "SEO & Content Optimization: Researched and analyzed WordPress backup plugins, applying insights to write a detailed and SEO-optimized blog (WordPress Backup Plugins: 10 Best Free & Paid Choices) to educate users and help them make informed decisions about website security and data protection.",
              "Website Performance & Analytics: Mastered Google PageSpeed Insights, utilizing analytic data to enhance website performance and optimize SEO strategies.",
              "Content Management & Editing: Managed, edited, and published blog posts on the company’s WordPress website, ensuring high-quality content and proper SEO structuring.",
              "Web Development & Git Workflow: Gained hands-on experience with HTML, CSS, Jekyll, Git, GitHub, and GitHub Pages, integrating them to build and deploy web projects efficiently.",
              "Design & Branding: Developed engaging graphics and blog assets using Canva to enhance content presentation and brand consistency."
            ]}
            icon={<FaWordpressSimple color="#21759B" size={38} />}
          />
        </div>
      </section>
    </div>
  );
};

/* -------- Skill Card -------- */
const SkillIcon = ({ icon, name }) => (
  <div className="flex flex-col items-center p-5 rounded-xl border border-zinc-600/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-28 h-28 justify-center">
    <div className="text-5xl mb-3 drop-shadow-md">{icon}</div>
    <span className="text-sm text-center font-semibold tracking-wide">{name}</span>
  </div>
);

/* -------- Experience Card -------- */
const ExperienceCard = ({ company, title, duration, description, icon }) => (
  <div className="rounded-xl border border-zinc-600/40 bg-[#1d2a6377] p-7 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4 mb-5">
      <div className="flex-shrink-0 p-2 rounded-lg bg-[#465697]/60">
        {icon}
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-200">{company}</p>
        <p className="text-xs text-gray-300">{duration}</p>
      </div>
    </div>
    <ul className="text-sm list-disc pl-5 space-y-2 text-gray-200">
      {description.map((item, index) => (
        <li key={index} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Experience;
