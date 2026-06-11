import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import TransitionOverlay from './components/Transitions';
import useScrollAnimation from './hooks/useScrollAnimation';
import ObservatoryLayout from './layouts/ObservatoryLayout';

// Lazy loaded routes for performance
const Hero = React.lazy(() => import('./pages/Hero'));
const Observatory = React.lazy(() => import('./pages/Observatory'));
const Skills = React.lazy(() => import('./pages/Skills'));
const Profiles = React.lazy(() => import('./pages/Profiles'));
const Achievements = React.lazy(() => import('./pages/Achievements'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const SkillDetail = React.lazy(() => import('./pages/SkillDetail'));
const Resume = React.lazy(() => import('./pages/Resume'));

import CommandPalette from './components/CommandPalette';
import BottomNav from './components/BottomNav';

// --- Custom Cursor ---
function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const trail = document.getElementById('cur-trail');
    const ring = document.getElementById('cur-ring');

    let mx = 0, my = 0, tx = 0, ty = 0, rx = 0, ry = 0;

    // START HIDDEN — only show after first mouse move
    if (dot) dot.style.opacity = '0';
    if (trail) trail.style.opacity = '0';
    if (ring) ring.style.opacity = '0';

    let hasMovedOnce = false;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      
      // Reveal cursor on first real mouse movement
      if (!hasMovedOnce) {
        hasMovedOnce = true;
        if (dot) dot.style.opacity = '1';
        if (trail) trail.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
        // Add smooth transition for the reveal
        if (dot) dot.style.transition = 'opacity 0.3s ease';
        if (trail) trail.style.transition = 'opacity 0.3s ease';
        if (ring) ring.style.transition = 'opacity 0.3s ease, width 0.2s, height 0.2s, border-color 0.2s';
      }
      
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
        opacity: 0,
      }} />

      <div id="cur-trail" style={{
        position: 'fixed', width: '8px', height: '8px',
        background: 'transparent',
        border: '1px solid rgba(0,212,255,0.5)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s, height 0.2s',
        opacity: 0,
      }} />

      <div id="cur-ring" style={{
        position: 'fixed', width: '28px', height: '28px',
        background: 'transparent',
        border: '1px solid #00d4ff',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99997,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
        opacity: 0,
      }} />
    </>
  );
}

// --- Star Field Canvas ---
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Mix of dots + tiny data symbols
    const SYMBOLS = ['.', '+', '×', '·'];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.05,
      speed: Math.random() * 0.15 + 0.02,
      // 85% plain dots, 15% symbols
      symbol: Math.random() > 0.85 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : null,
      // Color: mostly white, some cyan, some purple
      color: Math.random() > 0.92 ? '#00d4ff' :
             Math.random() > 0.88 ? '#a855f7' : '#ffffff',
      drift: (Math.random() - 0.5) * 0.05,
    }));

    let animFrame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        if (p.symbol) {
          ctx.font = `${p.size * 8}px Space Mono, monospace`;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Drift upward slowly
        p.y -= p.speed;
        p.x += p.drift;
        
        // Reset when off screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      
      ctx.globalAlpha = 1;
      animFrame = requestAnimationFrame(draw);
    };
    
    draw();
    return () => {
      cancelAnimationFrame(animFrame);
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
    
    // Scroll to top before transition
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const getBaseModule = (p) => {
      const parts = p.split('/').filter(Boolean);
      if (parts.length >= 2 && parts[0] === 'observatory') return parts[1];
      if (parts.length === 1 && parts[0] === 'observatory') return 'observatory-home';
      return null;
    };

    const currentBase = getBaseModule(location.pathname);
    const targetBase = getBaseModule(path);
    
    const isInternal = currentBase && targetBase && currentBase === targetBase;
    
    if (isInternal || path === '/' || path === '/resume') {
      navigate(path);
      window.scrollTo(0, 0);
      return;
    }

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
      <CommandPalette />
      
      <TransitionOverlay
        isVisible={isTransitioning}
        targetPage={transitionTarget}
      />
      
      <BottomNav currentPage={location.pathname === '/' ? 'home' : location.pathname.split('/').pop() || 'observatory'} navigateTo={handleNavigate} />
      
      <ErrorBoundary>
        <Suspense fallback={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,212,255,0.2)', borderTop: '3px solid var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/resume" element={<Resume />} />
            
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
              <Route path="*" element={<NotFound />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </NavigationContext.Provider>
  );
}
