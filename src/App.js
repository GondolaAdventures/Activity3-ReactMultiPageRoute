import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";

// Page components
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

// Layout component
import Layout from "./components/Layout";

function App() {
  const articles = [
    {
      id: "1",
      title: "Welcome to the Site",
      author: "Mario",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
    },
    {
      id: "2",
      title: "5 React Tips for Beginners",
      author: "Luigi",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
    },
    {
      id: "3",
      title: "VS Code Best Packages",
      author: "Mario",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
    }
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home articles={articles} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles/:urlId" element={<Article articles={articles} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
