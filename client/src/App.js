
import React from "react";

import Navbar from "./components/Navbar";
import "./App.css";

import Hero from "./components/Hero";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./Dashboard";

import CreateImage from "./pages/CreateImage";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import PromptStore from "./pages/PromptStore";
import Subscription from "./pages/Subscription";
import TextureGeneration from "./pages/TextureGeneration";
import MotionGeneration from "./pages/MotionGeneration";
import CanvasEditor from "./pages/CanvasEditor";
import About from "./components/About";

function App() {

  const currentPath = window.location.pathname;

  // Login Page
  if (currentPath === "/login") {
    return <Login />;
  }

  // Signup Page
  if (currentPath === "/signup") {
    return <Signup />;
  }

  // Dashboard Page
  if (currentPath === "/dashboard") {
    return <Dashboard />;
  }

  // Create Image Page
  if (currentPath === "/create-image") {
  return <CreateImage />;
}
if (currentPath === "/settings") {
  return <Settings />;}

  if (currentPath === "/community")
    { return <Community />;}

  if (currentPath === "/prompt-store")
    { return <PromptStore/>;

    }

    if (currentPath === "/subscription") 
      {return <Subscription />;
        
      }if (currentPath === "/texture-generation") {return <TextureGeneration />;
        
      }
      if (currentPath === "/motion-generation")
        { return <MotionGeneration />;}
if (currentPath === "/canvas-editor") {
  return <CanvasEditor />;}
       

      // Home Page
  return (
    <div className="page-frame">
      <div className="main-container">

        <Navbar />

        <Hero />
         


      </div>
    </div>
  );
}

export default App;
