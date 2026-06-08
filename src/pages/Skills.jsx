import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../Icons';

export default function Skills({ navigate }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => setMounted(true), []);

  const skills = [
    {
      id: 'ML',
      domain: "Machine Learning",
      project: "Website Classifier",
      outcome: "87% Accuracy",
      tags: ["Python", "Scikit-Learn", "NLP", "Random Forests"],
      icon: Icons.brain,
      color: "var(--accent-purple)",
      bgGradient: "linear-gradient(135deg, #1a0533, #2d1b69)",
      perf: 87
    },
    {
      id: 'Data Eng',
      domain: "Data Engineering",
      project: "Market Analysis ETL",
      outcome: "500+ products <2 min",
      tags: ["PostgreSQL", "SQL", "Selenium", "BeautifulSoup"],
      icon: Icons.database,
      color: "var(--accent-cyan)",
      bgGradient: "linear-gradient(135deg, #012a1a, #024d3b)",
      perf: 95
    },
    {
      id: 'Software',
      domain: "Software Dev",
      project: "Women Safety SOS",
      outcome: "<4s Alert Delivery",
      tags: ["Python", "Flask", "TypeScript", "React"],
      icon: Icons.code,
      color: "var(--accent-purple)",
      bgGradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
      perf: 78
    },
    {
      id: 'Analytics',
      domain: "Analytics",
      project: "Intelligence Dashboards",
      outcome: "Discovered 15% margins",
      tags: ["Pandas", "Matplotlib", "Plotly", "Streamlit"],
      icon: Icons.chart,
      color: "var(--accent-amber)",
      bgGradient: "linear-gradient(135deg, #2a1500, #4a2800)",
      perf: 82
    }
  ];

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
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <button 
        className="clickable"
        onClick={() => navigate('Observatory')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '20px'
        }}
      >
        ← Back to Observatory
      </button>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '20px' }}>Applied Skills</h1>
        
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
                color: activeTab === tab ? '#06b6d4' : 'white',
                border: activeTab === tab ? '1px solid #06b6d4' : '1px solid var(--border)',
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

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '24px',
        marginBottom: '60px',
        justifyContent: 'center'
      }}>
        {visibleSkills.map((skill) => (
          <div 
            key={skill.id}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              minHeight: '300px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
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
            {/* Right edge performance bar */}
            <div style={{ position: 'absolute', right: 0, top: 0, width: '4px', height: '100%', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                width: '100%', 
                height: mounted ? `${skill.perf}%` : '0%', 
                background: skill.color,
                transition: 'height 1s ease-out 0.2s'
              }} />
            </div>

            {/* Top Section */}
            <div style={{
              height: '30%',
              background: skill.bgGradient,
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative'
            }}>
              {skill.id === 'ML' && (
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
                  <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 10h5M15 10h5M10 0v5M10 15v5" stroke="white" strokeWidth="1"/>
                    <circle cx="10" cy="10" r="2" fill="white"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#circuit)"/>
                </svg>
              )}
              <div style={{ color: 'white', width: '32px', height: '32px', zIndex: 2 }}>{skill.icon}</div>
              <div style={{ color: 'white', fontFamily: 'Space Mono, monospace', fontWeight: 'bold', fontSize: '1.2rem', zIndex: 2 }}>{skill.domain}</div>
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
        <div style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto' }}>
          <svg width="360" height="360" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
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
            
            {/* Labels */}
            {[
              { label: 'Python', x: '50%', y: '5%' },
              { label: 'SQL', x: '92%', y: '28%' },
              { label: 'DataEng', x: '85%', y: '78%' },
              { label: 'Visualization', x: '50%', y: '98%' },
              { label: 'WebDev', x: '8%', y: '78%' },
              { label: 'ML', x: '8%', y: '28%' },
            ].map(({ label, x, y }) => (
              <text
                key={label}
                x={x} y={y}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="4.5"
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
