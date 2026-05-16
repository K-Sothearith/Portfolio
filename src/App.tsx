import { useEffect } from 'react';
import Navbar from './components/Navbar';
import SonarReveal from './components/SonarReveal';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full bg-abyss text-white selection:bg-cyanGlow/30 selection:text-white">
      <SonarReveal />
      <Navbar />

      <main className="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto px-6 lg:px-12">
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
