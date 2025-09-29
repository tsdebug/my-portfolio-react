import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Existing Portfolio Components
import Navbar from "./Components/Navbar/Navbar"; // Assume this includes your blog link
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Experience from "./Components/Experience/Experience";
import Projects from "./Components/Projects/Projects";
import Footer from "./Components/Footer/Footer";

// New Blog Components
// Assuming you create a new 'Blog' folder in src/Components/
import BlogList from './Components/Blog/BlogList';
import BlogPost from './Components/Blog/BlogPost';
import ScrollToHash from './Components/ScrollToHash';

// This component will render your main portfolio sections
// It will only be shown when the path is '/'
const MainPortfolioLayout = () => (
  <>
    <Home />
    <About />
    <Experience />
    <Projects />
    {/* Footer is moved outside to be global */}
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-[#171d32] min-h-screen text-white"> {/* Apply global styles */}
        <Navbar /> {/* Navbar is always visible */}
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<MainPortfolioLayout />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>

        <Footer /> {/* Footer is always visible */}
      </div>
    </Router>
  );
}

export default App;