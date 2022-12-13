import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom"
import Home from "./Components/Home"
import About from "./Components/About"
import React, { lazy, Suspense } from "react"

// const Home = lazy(() => import("./Components/Home"))

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY
  return (
  <Router>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
      </Routes>  
    </Router>
  // <div>
  //   <Home />
  //   <About />
  // </div>
  
  )
}

export default App