import React, { useState, useEffect } from 'react';
import { Icons } from '../Icons';

export default function Observatory({ navigate }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Center node coords
  const cx = 450;
  const cy = 300;

  const nodes = [
    { id: 'Projects', label: 'PROJECTS', icon: Icons.grid, color: 'var(--accent-cyan)', x: 450, y: 100, typeBadge: '[dataset]', tooltipLinks: [
      { text: 'Website Classifier', url: 'Projects' },
      { text: 'Market Analysis ETL', url: 'Projects' },
      { text: 'Women Safety SOS', url: 'Projects' }
    ]},
    { id: 'Profiles', label: 'PROFILES', icon: Icons.link, color: 'var(--accent-purple)', x: 150, y: 300, typeBadge: '[api]', tooltipText: 'GitHub · LinkedIn · LeetCode · Resume' },
    { id: 'Skills', label: 'SKILLS', icon: Icons.brain, color: 'var(--accent-cyan)', x: 750, y: 300, typeBadge: '[model]', tooltipText: 'ML · Data Eng · Software Dev · Analytics' },
    { id: 'Achievements', label: 'ACHIEVEMENTS', icon: Icons.trophy, color: 'var(--accent-amber)', x: 250, y: 500, typeBadge: '[output]', tooltipText: '2025 Excellence · 2024 Top 5% · 2023 Best UI/UX' },
    { id: 'Experience', label: 'EXPERIENCE', icon: Icons.briefcase, color: 'var(--accent-amber)', x: 650, y: 500, typeBadge: '[input]', tooltipText: 'Data Science Intern (2025) · CS B.S. Ongoing' },
  ];

  // System Status counters
  const [sysStats, setSysStats] = useState({ models: 0, pipelines: 0, apis: 0 });
  useEffect(() => {
    let current = 0;
    const int = setInterval(() => {
      current += 1;
      setSysStats({
        models: Math.min(current, 3),
        pipelines: Math.min(current, 2),
        apis: Math.min(current, 4)
      });
      if (current >= 4) clearInterval(int);
    }, 300);
    return () => clearInterval(int);
  }, []);

  // Floating data fragments
  const fragments = [
    { text: "df.groupby()", left: "10%", top: "15%", delay: "0s" },
    { text: "model.fit(X,y)", left: "80%", top: "80%", delay: "2s" },
    { text: "SELECT * FROM", left: "85%", top: "25%", delay: "1s" },
    { text: "import numpy", left: "15%", top: "75%", delay: "3s" },
  ];

  return (
    <div className="fade-in" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <button 
        className="clickable"
        onClick={() => navigate('Home')}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          zIndex: 10
        }}
      >
        ← Back to Home
      </button>

      <h1 style={{ position: 'absolute', top: '30px', width: '100%', textAlign: 'center', color: 'white', margin: 0, zIndex: 10 }}>
        Data Observatory
      </h1>

      {/* Floating Fragments */}
      {fragments.map((frag, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: frag.left,
          top: frag.top,
          color: 'white',
          opacity: 0.05,
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.9rem',
          filter: 'blur(1px)',
          animation: `driftUp 20s linear infinite ${frag.delay}`
        }}>
          {frag.text}
        </div>
      ))}

      {/* Left Panel: System Status */}
      <div style={{ position: 'absolute', left: '2%', top: '20%', width: '180px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', zIndex: 5, fontFamily: 'Space Mono, monospace' }}>
        <div style={{ color: 'var(--accent-cyan)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.1em' }}>SYSTEM STATUS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>
          <span><span className="blink-dot"></span> Models Active</span>
          <span>{sysStats.models}/3</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontSize: '0.8rem', marginBottom: '8px' }}>
          <span><span className="blink-dot"></span> Data Pipelines</span>
          <span>{sysStats.pipelines}/2</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
          <span><span className="blink-dot"></span> APIs Connected</span>
          <span>{sysStats.apis}/4</span>
        </div>
      </div>

      {/* Right Panel: Skill Matrix */}
      <div style={{ position: 'absolute', right: '2%', top: '20%', width: '200px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', zIndex: 5, fontFamily: 'Space Mono, monospace' }}>
        <div style={{ color: 'var(--accent-cyan)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.1em' }}>SKILL MATRIX</div>
        {[
          { label: 'Python', p: 85 },
          { label: 'SQL', p: 70 },
          { label: 'ML', p: 82 },
          { label: 'React', p: 55 },
          { label: 'DataEng', p: 72 }
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
            <span style={{ width: '60px' }}>{s.label}</span>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', margin: '0 8px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: mounted ? `${s.p}%` : '0%', background: 'var(--accent-cyan)', transition: 'width 1s ease-out' }} />
            </div>
            <span style={{ width: '25px', textAlign: 'right' }}>{s.p}%</span>
          </div>
        ))}
      </div>

      {/* Main Node Graph */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '900px', height: '600px' }}>
        <svg width="900" height="600" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          {nodes.map(node => {
            const pathId = `path-${node.id}`;
            const pathD = `M ${node.x} ${node.y} L ${cx} ${cy}`;
            return (
              <g key={node.id}>
                <path 
                  id={pathId}
                  d={pathD}
                  stroke={node.color} 
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  className="data-flow-line"
                />
                {/* Data Packet */}
                <circle r="3" fill="var(--accent-cyan)" style={{ filter: 'drop-shadow(0 0 4px var(--accent-cyan))' }}>
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Center Node */}
        <div style={{
          position: 'absolute',
          top: cy,
          left: cx,
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '70px',
          background: 'var(--card-bg)',
          borderRadius: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          fontFamily: 'Space Mono, monospace',
          fontWeight: 'bold',
          zIndex: 2,
        }}>
          {/* Inner ring */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid var(--accent-purple)', borderRadius: '35px', boxShadow: 'inset 0 0 15px rgba(124,58,237,0.5), 0 0 15px rgba(124,58,237,0.5)' }} />
          {/* Outer rotating ring */}
          <div className="outer-spin-ring" style={{ position: 'absolute', width: '220px', height: '90px', border: '1px dashed rgba(6,182,212,0.4)', borderRadius: '45px' }} />
          
          <div style={{ zIndex: 3 }}>Vetrivel A</div>
          <div style={{ zIndex: 3, fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>DATA SCIENCE</div>
        </div>

        {/* Satellite Nodes */}
        {nodes.map(node => {
          const isHovered = hoveredNode === node.id;
          return (
            <div 
              key={node.id}
              className="clickable"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => navigate(node.id === 'Projects' ? 'Projects' : node.id)}
              style={{
                position: 'absolute',
                top: node.y,
                left: node.x,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.05 : 1})`,
                width: '120px',
                height: '80px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                boxShadow: isHovered ? `0 0 20px ${node.color}60` : 'none',
                borderColor: isHovered ? node.color : 'var(--border)',
                zIndex: 10
              }}
            >
              {/* Type Badge */}
              <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--bg-base)', border: `1px solid ${node.color}`, color: node.color, fontSize: '0.5rem', padding: '2px 4px', borderRadius: '4px', fontFamily: 'Space Mono, monospace' }}>
                {node.typeBadge}
              </div>

              <div style={{ color: node.color }}>{node.icon}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white', margin: '4px 0' }}>{node.label}</div>

              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '16px',
                  background: 'var(--card-bg)',
                  border: `1px solid ${node.color}`,
                  borderRadius: '8px',
                  padding: '12px',
                  minWidth: '220px',
                  zIndex: 20,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  textAlign: 'center'
                }}>
                  {node.tooltipLinks ? (
                    node.tooltipLinks.map((link, i) => (
                      <div 
                        key={i}
                        className="clickable"
                        style={{ fontSize: '0.8rem', padding: '6px', color: 'var(--text-primary)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = node.color}
                        onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                        onClick={(e) => { e.stopPropagation(); navigate(link.url); }}
                      >
                        {link.text}
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                      {node.tooltipText}
                    </div>
                  )}
                  {/* Tooltip arrow */}
                  <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: 'var(--card-bg)', borderBottom: `1px solid ${node.color}`, borderRight: `1px solid ${node.color}` }} />
                </div>
              )}
            </div>
          );
        })}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flowDash {
            to { stroke-dashoffset: -24; }
          }
          .data-flow-line {
            animation: flowDash 1s linear infinite;
          }
          @keyframes spinRing {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .outer-spin-ring {
            animation: spinRing 20s linear infinite;
          }
          @keyframes driftUp {
            from { transform: translateY(0); }
            to { transform: translateY(-100px); opacity: 0; }
          }
          .blink-dot {
            display: inline-block;
            width: 6px; height: 6px;
            background-color: #10b981;
            border-radius: 50%;
            margin-right: 6px;
            animation: blinker 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes blinker {
            50% { opacity: 0.3; }
          }
        `}} />
      </div>
    </div>
  );
}
