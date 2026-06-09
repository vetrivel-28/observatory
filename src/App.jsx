import React, { useState, useEffect, useRef } from 'react';
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

// --- Custom Cursor ---
function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const trail = document.getElementById('cur-trail');
    const ring = document.getElementById('cur-ring');

    let mx = 0, my = 0, tx = 0, ty = 0, rx = 0, ry = 0;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };

    const animate = () => {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
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
          ring.style.width = '48px';
          ring.style.height = '48px';
          ring.style.borderColor = '#a855f7';
          ring.style.boxShadow = '0 0 16px rgba(168,85,247,0.5)';
          dot.style.background = '#a855f7';
        });
        el.addEventListener('mouseleave', () => {
          ring.style.width = '28px';
          ring.style.height = '28px';
          ring.style.borderColor = '#00d4ff';
          ring.style.boxShadow = 'none';
          dot.style.background = '#00d4ff';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');
  
  const scrollPositions = useRef({});

  useScrollAnimation();

  const navigate = (page) => {
    if (isTransitioning || page === currentPage) return;
    
    // Save scroll position for the current page
    scrollPositions.current[currentPage] = window.scrollY;
    
    setTransitionTarget(page);
    setIsTransitioning(true);
    
    // Change page at 600ms
    setTimeout(() => {
      setCurrentPage(page);
      // Restore scroll position or default to 0
      window.scrollTo(0, scrollPositions.current[page] || 0);
    }, 600);
    
    // Hide overlay at 1200ms
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const getStyle = (pageName) => {
    return {
      display: currentPage === pageName ? 'block' : 'none',
      width: '100%'
    };
  };

  return (
    <>
      <CustomCursor />
      <StarCanvas />
      
      <TransitionOverlay
        isVisible={isTransitioning}
        targetPage={transitionTarget}
      />
      
      <div style={getStyle('Home')}><Hero navigate={navigate} /></div>
      <div style={getStyle('Observatory')}><Observatory navigate={navigate} /></div>
      <div style={getStyle('Skills')}><Skills navigate={navigate} /></div>
      <div style={getStyle('Profiles')}><Profiles navigate={navigate} /></div>
      <div style={getStyle('Achievements')}><Achievements navigate={navigate} /></div>
      <div style={getStyle('Experience')}><Experience navigate={navigate} /></div>
      <div style={getStyle('Projects')}><Projects navigate={navigate} /></div>
      <div style={getStyle('Contact')}><Contact navigate={navigate} /></div>
    </>
  );
}
