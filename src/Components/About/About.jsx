import React from "react";
import AboutImg from "../../assets/B.png";
import { IoArrowForward } from "react-icons/io5";
const About = () => {
  return (
    <div
      id="About"
      className="text-white md:flex overflow-hidden items-center md:flex-wrap md:justify-center bg-black shadow-xl mx-0 md:mx-20 bg-opacity-30 rounded-lg p-12"
    >
      <div>
        <h2 className="text-2xl md:text-4xl font-bold">About</h2>
        <div className="md:flex flex-wrap flex-col md:flex-row items-center">
          <img className="md:h-80" src={AboutImg} alt="About img" />

          <ul>
            <div className="flex gap-3 py-4">
              <IoArrowForward size={30} className="mt-1" />

              <span className="w-96">
                <h1 className="text-xl md:text-2xl font-semibold leading-normal">
                  Full Stack Developer
                </h1>
                <p className="text-sm md:text-md leading-tight text-justify">
                  I'm a driven Full Stack Developer, proficient in both front-end and back-end technologies. I build robust, scalable web applications and craft seamless user experiences, always focusing on performance and modern best practices.
                </p>
              </span>
            </div>
            <div className="flex gap-3 py-4">
              <IoArrowForward size={30} className="mt-1" />

              <span className="w-96">
                <h1 className="text-xl md:text-2xl font-semibold leading-normal">
                  SEO Specialist
                </h1>
                <p className="text-sm md:text-md leading-tight text-justify">
                  As an SEO Specialist, I'm passionate about driving organic growth. I specialize in improving search engine visibility, increasing targeted traffic, and maximizing ROI through strategic keyword research, technical SEO, and content optimization.
                </p>
              </span>
            </div>
            <div className="flex gap-3 py-4">
              <IoArrowForward size={30} className="mt-1" />

              <span className="w-96">
                <h1 className="text-xl md:text-2xl font-semibold leading-normal">
                  Wordpress Expert
                </h1>
                <p className="text-sm md:text-md leading-tight text-justify">
                  I'm an experienced WordPress Expert, adept at developing custom themes and plugins. I create secure, high-performing, and visually appealing WordPress websites that empower clients to achieve their online objectives.
                </p>
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;