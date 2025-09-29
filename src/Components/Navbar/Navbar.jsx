import { Link } from "react-router-dom";
import React, { useState } from "react";
import { RiCloseLine, RiMenu2Line } from "@remixicon/react";
const Navbar = () => {
  const [menu, openMenu] = useState(false);
  const [showMenu, setShowmenu] = useState(true);

  // Email to copy
  const email = "tanushreeshaw01@gmail.com";

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        alert("Email copied to clipboard!");
      })
      .catch((error) => {
        console.error("Copy failed", error);
      });
  };

  const handleNavClick = () => {
    openMenu(false);
    setShowmenu(true);
  };

  return (
    <nav className="flex flex-wrap justify-between md:items-center text-white px-10 pt-6 md:px-20">
      <div className='mt-5 md:md-10 text-white text-sm md:text-lg md:py-2 md:px-3 duration-300 font-semibold bg-[#465697] flex items-center gap-x-2.5 py-[10px] px-[15px] rounded-[30px] shadow-md'>
        <span>tanushreeshaw01@gmail.com</span>
        <button
          onClick={copyToClipboard}
          className="border-none bg-white text-black cursor-pointer text-sm py-2 px-[15px] rounded-[20px] hover:opacity-85 hover:scale-105"
        >
          Copy
        </button>
        <a
          className="border-none bg-white text-black cursor-pointer text-sm py-2 px-[15px] rounded-[20px] hover:opacity-85 hover:scale-105"
          href="/docs/RESUME(Tanushree Shaw).pdf"
          target="_blank"
        >
          <button className="cv-btn">Resume</button>
        </a>
      </div>

      <ul className={`${menu ? "block" : "hidden"
        } 
              mx-24 p-y2 mt-4 font-semibold md:mt-5 bg-black px-2 rounded-xl bg-opacity-30 md:border-none text-center md:bg-transparent md:static md:mx-0 md:flex gap-6`}>
        <li className="text-md transition-all duration-300 p-1 md:p-0">
          <Link to="/#About" onClick={handleNavClick}>About</Link>
        </li>
        <li className="text-md transition-all duration-300 p-1 md:p-0">
          <Link to="/#Experience" onClick={handleNavClick}>Experience</Link>
        </li>
        <li className="text-md transition-all duration-300 p-1 md:p-0">
          <Link to="/#Projects" onClick={handleNavClick}>Projects</Link>
        </li>
        <li className="text-md transition-all duration-300 p-1 md:p-0">
          <Link to="/blog" onClick={handleNavClick}>Blog</Link>
        </li>
        <li className="text-md transition-all duration-300 p-1 md:p-0">
          <Link to="/#Contacts" onClick={handleNavClick}>Contact</Link>
        </li>
      </ul>
      {showMenu ? (
        <RiMenu2Line
          size={30}
          className="md:hidden absolute right-10 top-6 transition-all duration-300"
          onClick={() => {
            openMenu(!menu);
            setShowmenu(!showMenu);
          }}
        />
      ) : (
        <RiCloseLine
          size={30}
          className="md:hidden absolute right-10 top-6 transition-all duration-300"
        />
      )}
    </nav>
  );
};



export default Navbar