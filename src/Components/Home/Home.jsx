import React from 'react';
import avatarImg from "../../assets/A.png";
import TextChange from "../TextChange";

const Home = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("Contacts");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='text-white flex w-full justify-between items-start p-10 md:p-20'>
      <div className='md:w-2/4 md:pt-10'>
        <h1 className='text-3xl md:text-6xl font-bold flex leading-normal tracking-tighter'>
          <TextChange />
        </h1>
        <p className='text-sm md:text-2xl tracking-tight'>
          Hire a Fullstack Developer, SEO Specialist & WordPress Expert
        </p>
        <p className='text-sm md:text-2xl tracking-tight'>—in West Bengal</p>
        <button
          onClick={scrollToContact}
          className='mt-5 md:mt-10 text-white py-2 px-3 text-sm md:text-lg md:py-2 md:px-4 hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]'
        >
          Contact Me
        </button>
      </div>
      <div>
        <img src={avatarImg} alt="Avatar img" />
      </div>
    </div>
  );
};

export default Home;
