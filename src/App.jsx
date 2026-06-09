import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

import Hero from './pages/Hero';
import Observatory from './pages/Observatory';
import Skills from './pages/Skills';
import Profiles from './pages/Profiles';
import Achievements from './pages/Achievements';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import TransitionOverlay from './components/Transitions';
import useScrollAnimation from './hooks/useScrollAnimation';
import ObservatoryLayout from './layouts/ObservatoryLayout';
import ProjectDetail from './pages/ProjectDetail';
import SkillDetail from './pages/SkillDetail';

// --- Custom Cursor ---
function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const trail = document.getElementById('cur-trail');
    const ring = document.getElementById('cur-ring');

    let mx = 0, my = 0, tx = 0, ty = 0, rx = 0, ry = 0;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if(dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    };

    const animate = () => {
      if(trail && ring) {
        tx += (mx - tx) * 0.15;
        ty += (my - ty) * 0.15;
        trail.style.left = tx + 'px';
        trail.style.top = ty + 'px';
        rx += (mx - rx) * 0.08;
        ry += (my - ry) * 0.08;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      requestAnimationFrame(animate);
    };

    const onClick = (e) => {
      const items = ['SELECT', 'JOIN', 'WHERE', 'GROUP BY', 'df[]', 'fit()', '.transform()', 'QUERY'];
      const burst = document.createElement('div');
      burst.style.cssText = `
        position:fixed; left:${e.clientX}px; top:${e.clientY}px;
        pointer-events:none; z-index:99999;
        font-family:Space Mono,monospace; font-size:9px;
        color:#00d4ff; white-space:nowrap;
        transform:translate(-50%,-50%);
      `;
      burst.textContent = items[Math.floor(Math.random() * items.length)];
      document.body.appendChild(burst);
      let op = 1, y = 0;
      const fade = () => {
        op -= 0.04; y -= 1.5;
        burst.style.opacity = op;
        burst.style.transform = `translate(-50%, calc(-50% + ${y}px))`;
        if (op > 0) requestAnimationFrame(fade);
        else burst.remove();
      };
      requestAnimationFrame(fade);
    };

    const addHover = () => {
      document.querySelectorAll('button,a,[role=button],[onClick]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          if(ring && dot) {
            ring.style.width = '48px';
            ring.style.height = '48px';
            ring.style.borderColor = '#a855f7';
            ring.style.boxShadow = '0 0 16px rgba(168,85,247,0.5)';
            dot.style.background = '#a855f7';
          }
        });
        el.addEventListener('mouseleave', () => {
          if(ring && dot) {
            ring.style.width = '28px';
            ring.style.height = '28px';
            ring.style.borderColor = '#00d4ff';
            ring.style.boxShadow = 'none';
            dot.style.background = '#00d4ff';
          }
        });
      });
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('click', onClick);
    setTimeout(addHover, 500);
    requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <div id="cur-dot" style={{
        position: 'fixed', width: '4px', height: '4px',
        background: '#00d4ff', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99999,
        transform: 'translate(-50%,-50%)',
      }} />

      <div id="cur-trail" style={{
        position: 'fixed', width: '8px', height: '8px',
        background: 'transparent',
        border: '1px solid rgba(0,212,255,0.5)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s, height 0.2s',
      }} />

      <div id="cur-ring" style={{
        position: 'fixed', width: '28px', height: '28px',
        background: 'transparent',
        border: '1px solid #00d4ff',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99997,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
      }} />
    </>
  );
}

// --- Star Field Canvas ---
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      moving: Math.random() > 0.98,
      speed: Math.random() * 0.5 + 0.1
    }));

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        if (star.moving) {
          star.x -= star.speed;
          if (star.x < 0) star.x = width;
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas id="star-canvas" ref={canvasRef} />;
}

// --- Custom Navigation Hook Context ---
export const NavigationContext = React.createContext(null);

export default function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const scrollPositions = useRef({});

  useScrollAnimation();

  // Route-based transitions
  const handleNavigate = (path) => {
    if (isTransitioning || location.pathname === path) return;
    
    // Determine a readable target name from the path for the overlay
    let targetName = 'observatory';
    if(path.includes('projects')) targetName = 'projects';
    if(path.includes('skills')) targetName = 'skills';
    if(path.includes('experience')) targetName = 'experience';
    if(path.includes('achievements')) targetName = 'achievements';
    if(path.includes('profiles')) targetName = 'profiles';
    if(path.includes('contact')) targetName = 'contact';
    
    setTransitionTarget(targetName);
    setIsTransitioning(true);
    
    // Wait for the transition out animation
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
    }, 600);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <NavigationContext.Provider value={{ navigate: handleNavigate }}>
      <CustomCursor />
      <StarCanvas />
      
      <TransitionOverlay
        isVisible={isTransitioning}
        targetPage={transitionTarget}
      />
      
      <Routes>
        <Route path="/" element={<Hero />} />
        
        <Route path="/observatory" element={<ObservatoryLayout />}>
          <Route index element={<Observatory />} />
          <Route path="skills" element={<Skills />} />
          <Route path="skills/:slug" element={<SkillDetail />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </NavigationContext.Provider>
  );
}
