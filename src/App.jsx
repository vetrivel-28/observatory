import React, { useState, useEffect, useRef } from 'react';
import './index.css';

import Hero from './pages/Hero';
import Observatory from './pages/Observatory';
import Skills from './pages/Skills';
import Profiles from './pages/Profiles';
import Achievements from './pages/Achievements';
import Experience from './pages/Experience';

// --- Custom Cursor ---
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="custom-cursor" style={{ left: pos.x, top: pos.y }} />;
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

// --- Database Schema Transition ---
function DatabaseTransition({ isActive, targetName }) {
  const [queryText, setQueryText] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setQueryText("");
      setProgress(0);
      const query = `SELECT * FROM ${targetName.toLowerCase()} WHERE active = true;`;
      let i = 0;
      const typeInterval = setInterval(() => {
        setQueryText(query.substring(0, i));
        i++;
        if (i > query.length) clearInterval(typeInterval);
      }, 30);
      
      const progInterval = setInterval(() => {
        setProgress(p => (p < 100 ? p + Math.random() * 15 : 100));
      }, 100);

      return () => {
        clearInterval(typeInterval);
        clearInterval(progInterval);
      };
    }
  }, [isActive, targetName]);

  return (
    <div className={`db-transition-overlay ${!isActive ? 'hidden' : ''}`}>
      <div className="schema-diagram">
        <div className="schema-table">
          <div className="header">users</div>
          <div className="row"><span>id</span><span>INT PK</span></div>
          <div className="row"><span>name</span><span>VARCHAR</span></div>
        </div>
        <div className="schema-line" />
        <div className="schema-table" style={{ marginLeft: '60px' }}>
          <div className="header">{targetName.toLowerCase()}</div>
          <div className="row"><span>id</span><span>INT PK</span></div>
          <div className="row"><span>user_id</span><span>INT FK</span></div>
          <div className="row"><span>created_at</span><span>TIMESTAMP</span></div>
        </div>
      </div>
      <div className="sql-query">{queryText}</div>
      <div className="loading-bar-container">
        <div className="loading-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div style={{ marginTop: '20px', color: 'var(--accent-cyan)' }}>LOADING {targetName.toUpperCase()}...</div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPage, setTargetPage] = useState('Home');

  const navigate = (page) => {
    if (page === currentPage) return;
    setTargetPage(page);
    setIsNavigating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => setIsNavigating(false), 100);
    }, 1200);
  };

  return (
    <>
      <CustomCursor />
      <StarCanvas />
      <DatabaseTransition isActive={isNavigating} targetName={targetPage} />
      
      {!isNavigating && (
        <div style={{ opacity: isNavigating ? 0 : 1, transition: 'opacity 0.3s' }}>
          {currentPage === 'Home' && <Hero navigate={navigate} />}
          {currentPage === 'Observatory' && <Observatory navigate={navigate} />}
          {currentPage === 'Skills' && <Skills navigate={navigate} />}
          {currentPage === 'Profiles' && <Profiles navigate={navigate} />}
          {currentPage === 'Achievements' && <Achievements navigate={navigate} />}
          {currentPage === 'Experience' && <Experience navigate={navigate} />}
          {currentPage === 'Projects' && (
            <div className="fade-in" style={{ padding: '40px' }}>
              <button onClick={() => navigate('Observatory')} style={{ cursor: 'none', background: 'transparent', border: 'none', color: 'var(--text-muted)' }}>← Back</button>
              <h1 style={{ color: 'white', marginTop: '20px' }}>Projects Detail View</h1>
              <p style={{ color: 'var(--text-muted)' }}>This page was reached via the tooltip.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
