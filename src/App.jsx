import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Experience from "./Components/Experience/Experience";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Projects from "./Components/Projects/Projects";
import About from "./Components/About/About";

import BlogList from "./Components/BlogList";
import Post from "./Components/Post";

function App() {
  return (
    <Router>
      <div className="bg-[#171d32] h-auto w-full overflow-hidden">
        <Navbar />
        <Routes>
          {/* Portfolio pages */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Experience />
                <Projects />
              </>
            }
          />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
