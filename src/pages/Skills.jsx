import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavigationContext } from '../App';
import { skills } from '../data/skills';
import { Icons } from '../Icons';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function Skills() {
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => setMounted(true), []);


  const visibleSkills = activeTab === 'All' ? skills : skills.filter(s => s.id === activeTab);

  // Radar Animation
  const [radarProgress, setRadarProgress] = useState(0);
  useEffect(() => {
    let start = null;
    const duration = 1500;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setRadarProgress(easeProgress);
      if (progress < 1) window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }, []);

  return (
    <div className="page-content fade-in" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <SEO 
        title="Skills | Vetrivel A" 
        description="Technical expertise across Machine Learning, Data Engineering, NLP, Python, SQL, and Analytics."
        type="website"
      />
      <Breadcrumb items={[
        {label: 'Home', page: 'home'},
        {label: 'Observatory', page: 'observatory'},
        {label: 'Skills', page: null}
      ]} />
      <button 
        className="clickable back-btn hover-lift"
        onClick={() => navigate('/observatory')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Space Mono'
        }}
      >
        <span>←</span> Back to Observatory
      </button>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title" style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '700', color: '#e8eef5', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.01em' }}>Applied Skills</h1>
        
        {/* Switcher Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {['All', 'ML', 'Data Eng', 'Software', 'Analytics'].map(tab => (
            <button
              key={tab}
              className="clickable"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab ? 'rgba(6,182,212,0.15)' : 'var(--card-bg)',
                color: activeTab === tab ? '#00d4ff' : 'white',
                border: activeTab === tab ? '1px solid #00d4ff' : '1px solid var(--border)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontFamily: 'Space Mono, monospace',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                transition: 'all 0.3s'
              }}
            >
              {tab === 'All' ? 'All' : `[${tab}]`}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '24px',
        marginBottom: '60px',
        justifyContent: 'center'
      }}>
        {visibleSkills.map((skill) => (
          <div 
            key={skill.id}
            className="clickable"
            onClick={() => navigate('/observatory/skills/' + skill.slug)}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              minHeight: '300px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${skill.color}20`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Right edge accent line */}
            <div style={{ position: 'absolute', right: 0, top: 0, width: '4px', height: '100%', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                width: '100%', 
                height: mounted ? '100%' : '0%', 
                background: skill.color,
                transition: 'height 1s ease-out 0.2s'
              }} />
            </div>

            <div style={{
              background: '#111d2e',
              borderBottom: `1px solid ${skill.color}20`,
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}>
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
              </div>
              
              {/* Filename */}
              <span style={{
                fontFamily: 'Space Mono', fontSize: '10px',
                color: '#4a5568', marginLeft: '4px',
                overflow: 'hidden', textOverflow: 'ellipsis',
                flexShrink: 1,
              }}>
                {skill.filename}
              </span>
              
              {/* Domain name — RIGHT side, accent color, NO proficiency label */}
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'Space Mono', fontSize: '10px',
                fontWeight: '700', color: skill.color,
                flexShrink: 0,
              }}>
                {skill.domain}
              </span>
              
              {/* Proficiency bar — compact, no text label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '40px', height: '3px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.level === 'Advanced' ? 95 : skill.level === 'Intermediate' ? 75 : 85}%`,
                    background: skill.color,
                    borderRadius: '2px',
                  }} />
                </div>
                <span style={{
                  fontFamily: 'Space Mono', fontSize: '9px',
                  color: skill.color, flexShrink: 0,
                }}>
                  {skill.level === 'Advanced' ? 95 : skill.level === 'Intermediate' ? 75 : 85}%
                </span>
              </div>
            </div>

            {/* Middle Section */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Project:</span>
                <span style={{ color: 'white', fontWeight: '500' }}>{skill.project}</span>
              </div>
              <div style={{ color: skill.color, fontSize: '1.5rem', fontWeight: 'bold' }}>
                {skill.outcome}
              </div>
            </div>

            {/* Bottom Section */}
            <div style={{ padding: '20px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skill.tags.map(tag => (
                <span key={tag} style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--border)',
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '11px',
                  fontFamily: 'Space Mono, monospace',
                  color: 'var(--text-muted)'
                }}>
                  `{tag}`
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: 'white', marginBottom: '40px', fontFamily: 'Space Mono, monospace' }}>Tech Stack Radar</h3>
        <div style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto', overflow: 'visible', padding: '40px 20px' }}>
          <svg viewBox="-60 -60 220 220" style={{ maxWidth: '400px', display: 'block', margin: '0 auto', overflow: 'visible' }} width="100%" height="100%">
            {/* Radar background */}
            {[20, 40, 60, 80, 100].map(r => {
              const scaledR = r * 0.4; // max radius 40
              return (
                <polygon 
                  key={r}
                  points={`50,${50-scaledR} ${50+scaledR*0.866},${50-scaledR*0.5} ${50+scaledR*0.866},${50+scaledR*0.5} 50,${50+scaledR} ${50-scaledR*0.866},${50+scaledR*0.5} ${50-scaledR*0.866},${50-scaledR*0.5}`}
                  fill="none" 
                  stroke="var(--border)" 
                  strokeWidth="0.5"
                />
              );
            })}
            
            {/* Axes */}
            {[
              { x2: 50, y2: 10 },
              { x2: 84.6, y2: 30 },
              { x2: 84.6, y2: 70 },
              { x2: 50, y2: 90 },
              { x2: 15.4, y2: 70 },
              { x2: 15.4, y2: 30 }
            ].map((p, i) => (
              <line key={i} x1="50" y1="50" x2={p.x2} y2={p.y2} stroke="var(--border)" strokeWidth="0.5" />
            ))}
            
            {/* Labels — move them further out from the hexagon */}
            {[
              { label: 'Python', x: 50, y: -25 },      // top
              { label: 'SQL', x: 105, y: -5 },         // top-right
              { label: 'DataEng', x: 105, y: 78 },      // bottom-right
              { label: 'Visualization', x: 50, y: 105 }, // bottom
              { label: 'WebDev', x: -5, y: 78 },       // bottom-left
              { label: 'ML', x: -5, y: -5 },          // top-left
            ].map(({ label, x, y }) => (
              <text
                key={label}
                x={`${x}%`} y={`${y}%`}
                textAnchor="middle"
                fill="#8892a4"
                fontSize="11"
                fontFamily="Space Mono, monospace"
              >
                {label}
              </text>
            ))}

            {/* Data points (scaled out of 40 max radius) */}
            {/* Python 90%, SQL 80%, ML 85%, DataEng 75%, WebDev 60%, Viz 70% */}
            {(() => {
              const pts = [
                { r: 40 * 0.90, angle: -Math.PI/2 },            // Python (Top)
                { r: 40 * 0.80, angle: -Math.PI/6 },            // SQL
                { r: 40 * 0.85, angle: Math.PI/6 },             // ML
                { r: 40 * 0.75, angle: Math.PI/2 },             // DataEng (Bottom)
                { r: 40 * 0.60, angle: 5*Math.PI/6 },           // WebDev
                { r: 40 * 0.70, angle: -5*Math.PI/6 }           // Viz
              ];
              
              const currentPts = pts.map(p => ({
                x: 50 + p.r * radarProgress * Math.cos(p.angle),
                y: 50 + p.r * radarProgress * Math.sin(p.angle)
              }));

              const polyPoints = currentPts.map(p => `${p.x},${p.y}`).join(' ');

              return (
                <>
                  <polygon 
                    points={polyPoints}
                    fill="rgba(6, 182, 212, 0.2)" 
                    stroke="var(--accent-cyan)" 
                    strokeWidth="1"
                  />
                  {currentPts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={1.5 * radarProgress} fill="var(--accent-cyan)" />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
        <div style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Space Mono, monospace', animation: 'pulse 2s infinite' }}>
          ↓ SCROLL FOR TECH STACK RADAR
        </div>
      </div>
    </div>
  );
}
