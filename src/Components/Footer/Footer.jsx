import React from "react";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaDev } from "react-icons/fa";

const openMailClient = () => {
  window.location.href = "mailto:tanushreeshaw01@gmail.com?subject=Hiring Inquiry";
};

const Footer = () => {
  return (
    <footer
      id="Contacts"
      className="flex flex-col items-center justify-center text-center bg-[#465697] text-white py-10 md:py-14"
    >
      {/* Icon / Avatar */}
      <div className="mb-4">
        <img
          src="..\docs\ContactMe.webp"
          alt="avatar"
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </div>

      {/* Tagline */}
      <h3 className="text-lg md:text-2xl mb-6">
        Let&apos;s connect and work together!
      </h3>

      {/* Social Icons */}
      <div className="flex space-x-6 mb-6 text-3xl">
        <a
          href="https://github.com/tsdebug"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/tanushree-shaw/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors"
        >
          <CiLinkedin />
        </a>
        <a
          href="https://dev.to/tsdebug"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors"
        >
          <FaDev />
        </a>
        <a
          href="mailto:tanushreeshaw01@gmail.com"
          className="hover:text-gray-300 transition-colors"
          aria-label="Send Email"
        >
          <MdOutlineEmail />
        </a>
      </div>

      {/* Hire Me Button */}
      <button
        onClick={openMailClient}
        className="bg-white text-[#465697] px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
      >
        Hire Me
      </button>

      {/* Copyright */}
      <p className="mt-6 text-sm md:text-base text-gray-200">
        © 2025 All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
