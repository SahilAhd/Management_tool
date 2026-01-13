import { useState, useRef } from 'react';
import { useEffect } from 'react';
import './App.css';
import background from "./assets/Welcome-to-Bazaar.com.png";
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

import Footer from './Components/footer.jsx'
import Userp from './Components/Userp.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notfound from './Components/Notfound.jsx';
import Signup from './Components/Signup.jsx';
import { useNavigate } from 'react-router-dom'; // Keep this for existing button navigations
import Loginpage from './Components/Loginpage.jsx';
import Admin from './Components/Admin.jsx';
import ProtectedRoute from './Components/Protectedroutes';
import Workupdate from './Components/Workupdate.jsx';
import VoiceAssistant from "./Components/Voiceassistance"; // Corrected import path if needed, assuming it's in Components folder

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const navigate = useNavigate(); // Keep for manual button clicks

  const hasSpoken = useRef(false);

  
  useEffect(() => {
    if (hasSpoken.current) return;

    const hours = new Date().getHours();
    let timeGreeting = "Good evening";

    if (hours < 12) timeGreeting = "Good morning";
    else if (hours < 17) timeGreeting = "Good afternoon";

    const greeting = `${timeGreeting}, SIr`;

    const utterance = new SpeechSynthesisUtterance(greeting);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);

    hasSpoken.current = true;
  }, []);

  return (
    <div className="relative w-screen h-screen main-scroll-hide">
      <div className="w-screen h-screen bg-cover bg-center main-scroll-hide"
        style={{ backgroundImage: `url(${background})` }}>

        <div className="flex flex-row justify-end gap-6 pr-6 py-11 mr-7 font-semibold">
          {/* Removed id="signupBtn" as VoiceAssistant no longer clicks it */}
          <button className="cursor-pointer backdrop-blur-3xl bg-opacity-30 bg-stone-400/40 text-white px-4 py-2 h-10 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => navigate('/Signup')}
          >
            Sign Up
          </button>
          {/* Removed id="loginBtn" as VoiceAssistant no longer clicks it */}
          <button className="cursor-pointer backdrop-blur-3xl bg-opacity-30 bg-stone-400/40 text-white px-4 py-2 h-10 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => navigate('/Loginpage')}>
            Login
          </button>
        </div>

        {/* VoiceAssistant is now rendered globally in App.js, not here */}
        {/* <VoiceAssistant /> */}

        <div className="w-[40rem] flex justify-center pt-4 px-4 absolute
          top-6 right-6 gap-3 mr-80">
          <div className="flex w-full max-w-3xl justify-between items-center
          backdrop-blur-3xl bg-opacity-30 bg-stone-400/40 text-white rounded-md px-6 py-3">
            <div className="text-xl font-bold">Bazaar</div>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <a href="/Home" className="hover:scale-105 hover:text-yellow-400 hover:shadow-3xl transition-all duration-300">Home</a>
              <a href="/About " className=" hover:text-pink-600 hover:scale-105 hover:shadow-3xl transition-all duration-300">About Us</a>
              <a href="/Courses" className="hover:text-orange-500 hover:scale-105 hover:shadow-3xl transition-all duration-300">Courses</a>
              <a href="/Contact" className="hover:text-red-600 hover:scale-105 hover:shadow-3xl transition-all duration-300">Contact</a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 flex flex-col items-center gap-4 text-white bg-zinc-800/50 backdrop-blur-md p-4 rounded-md mx-4">
            <a href="/Home" className="hover:text-blue-400 transition">Home</a>
            <a href="/About" className="hover:text-blue-400 transition">About Us</a>
            <a href="/Courses" className="hover:text-blue-400 transition">Courses</a>
            <a href="/Contact" className="hover:text-blue-400 transition">Contact</a>
          </div>
        )}
        <br /><br /><br />
        <div className="text-center px-4 md:px-8 py-8">

          {/* H1 Animation: from Right with Blur */}
          <motion.h1
            initial={{ x: 200, opacity: 2, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 2, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-dancing font-semibold
            bg-gradient-to-r from-gray-400 via-blue-600 to-gray-400
            text-transparent bg-clip-text pt-20 px-4 absolute top-25 right-6">
            Welcome to Your Personalised LMS
          </motion.h1>

          <br />

          {/* H2 Animation: from Left with Blur */}
          <motion.h2
            initial={{ x: -200, opacity: 2, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 2, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-4xl md:text-4xl lg:text-4xl font-poppins font-semibold
            bg-gradient-to-r from-red-400 via-white to-red-400
            text-transparent bg-clip-text text-center pt-40 px-4 absolute top-25 right-6 left-6"
          >
            Bazaar.com brings you all-time benefits with its unique features
          </motion.h2>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '310px', right: '460px', zIndex: 1000 }}>
        <VoiceAssistant />
      </div>
      {/* HOVER ZONE at the bottom */}
      <div
        className="fixed bottom-0 w-full h-6 z-50"
        onMouseEnter={() => setShowFooter(true)}
        onMouseLeave={() => setShowFooter(false)}
      />

      {/* CONDITIONAL RENDER of Footer when hovering bottom */}
      {showFooter && (
        <div
          className="fixed bottom-0 w-full"
          onMouseEnter={() => setShowFooter(true)}
          onMouseLeave={() => setShowFooter(false)}
        >
          <Footer />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* --- NEW: VoiceAssistant integrated globally --- */}
      {/* This ensures the VoiceAssistant is always mounted and active across all routes. */}
      {/* You can adjust its positioning using CSS if needed. */}
     
      {/* --- END NEW --- */}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Notfound" element={<Notfound />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        {/* Protected routes */}
        <Route path="/Userp" element={<ProtectedRoute><Userp /></ProtectedRoute>} />
        <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        {/* Duplicate routes - consider removing one set for clarity */}
        <Route path="/Userp" element={<Userp />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Workupdate" element={<Workupdate />} />
      </Routes>
    </Router>
  );
}

export default App;