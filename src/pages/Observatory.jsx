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

      {/* LEFT: Live Activity Feed */}
      <div style={{
        position:'absolute', left:'20px', top:'50%',
        transform:'translateY(-50%)', width:'200px',
        background:'rgba(10,18,35,0.92)',
        border:'1px solid rgba(6,182,212,0.35)',
        borderRadius:'12px', padding:'16px',
        overflow:'hidden', zIndex:10,
        backdropFilter:'blur(8px)'
      }}>
        <div style={{
          color:'#06b6d4', fontSize:'11px',
          letterSpacing:'0.15em', fontFamily:'Space Mono',
          marginBottom:'12px'
        }}>● ACTIVITY LOG</div>
        
        {/* Scrolling activity items container */}
        <div style={{
          overflow:'hidden', height:'160px',
          maskImage:'linear-gradient(transparent, black 15%, black 85%, transparent)'
        }}>
          <div style={{
            animation:'scrollUp 10s linear infinite',
            display:'flex', flexDirection:'column', gap:'8px'
          }}>
            {[
              '[02:14] model.fit() done',
              '[01:58] ETL: 500 rows OK',
              '[01:45] accuracy: 87.3%',
              '[01:32] query: 0.3s',
              '[01:19] git push ✓',
              '[01:07] dashboard OK',
              '[00:54] dropna() → 492',
              '[00:41] churn: 18.2%',
              '[02:14] model.fit() done',
              '[01:58] ETL: 500 rows OK',
            ].map((item, i) => (
              <div key={i} style={{fontSize:'10px', fontFamily:'Space Mono', color:'#94a3b8', whiteSpace:'nowrap'}}>
                <span style={{color:'#06b6d4'}}>{item.slice(0,7)}</span>{item.slice(7)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Model Metrics */}
      <div style={{
        position:'absolute', right:'20px', top:'50%',
        transform:'translateY(-50%)', width:'200px',
        background:'rgba(15,25,41,0.85)',
        border:'1px solid rgba(245,158,11,0.2)',
        borderRadius:'12px', padding:'16px', zIndex:10
      }}>
        <div style={{
          color:'#f59e0b', fontSize:'10px',
          letterSpacing:'0.15em', fontFamily:'Space Mono',
          marginBottom:'12px'
        }}>◈ MODEL METRICS</div>

        {[
          {label:'ACCURACY', value:'87.3%', trend:'↑', up:true},
          {label:'PRECISION', value:'84.1%', trend:'↑', up:true},
          {label:'RECALL', value:'89.2%', trend:'→', up:null},
          {label:'F1-SCORE', value:'86.6%', trend:'↑', up:true},
        ].map((m,i) => (
          <div key={i} style={{
            display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:'10px'
          }}>
            <span style={{color:'#64748b', fontSize:'9px', fontFamily:'Space Mono'}}>{m.label}</span>
            <span style={{
              color:'white', fontSize:'13px',
              fontFamily:'Space Mono', fontWeight:'bold'
            }}>
              {m.value}
              <span style={{
                color: m.up===true ? '#22c55e' : m.up===null ? '#06b6d4' : '#ef4444',
                marginLeft:'4px', fontSize:'11px'
              }}>{m.trend}</span>
            </span>
          </div>
        ))}

        {/* Sparkline SVG */}
        <svg width="100%" height="30" style={{marginTop:'8px'}}>
          <polyline
            points="0,25 15,20 30,22 45,14 60,17 75,9 90,11 168,4"
            fill="none" stroke="#f59e0b" strokeWidth="1.5"
            strokeLinejoin="round" strokeLinecap="round"
          />
        </svg>
        <div style={{
          color:'#64748b', fontSize:'9px',
          fontFamily:'Space Mono', textAlign:'center', marginTop:'4px'
        }}>Training Loss</div>
      </div>

      {/* Main Node Graph */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '500px' }}>
        <svg width="700" height="500" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}>
          {nodes.map(node => {
            const pathId = `path-${node.id}`;
            const pathD = `M ${node.x} ${node.y} L ${cx} ${cy}`;
            return (
              <g key={node.id}>
                <path 
                  id={pathId}
                  d={pathD}
                  stroke={node.color}
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  className="data-flow-line"
                  style={{ animation: 'dashFlow 2s linear infinite' }}
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
                  top: node.id === 'Projects' ? 'calc(100% + 8px)' : 'auto',
                  bottom: node.id === 'Projects' ? 'auto' : '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: node.id === 'Projects' ? '0' : '16px',
                  background: 'var(--card-bg)',
                  border: `1px solid ${node.color}`,
                  borderRadius: '8px',
                  padding: '12px',
                  minWidth: '220px',
                  zIndex: 50,
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
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em', lineHeight: '1.4' }}>
                      {node.tooltipText}
                    </div>
                  )}
                  {/* Tooltip arrow */}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: node.id === 'Projects' ? 'auto' : '-6px', 
                    top: node.id === 'Projects' ? '-6px' : 'auto', 
                    left: '50%', 
                    transform: 'translateX(-50%) rotate(45deg)', 
                    width: '10px', 
                    height: '10px', 
                    background: 'var(--card-bg)', 
                    borderBottom: node.id === 'Projects' ? 'none' : `1px solid ${node.color}`, 
                    borderRight: node.id === 'Projects' ? 'none' : `1px solid ${node.color}`,
                    borderTop: node.id === 'Projects' ? `1px solid ${node.color}` : 'none',
                    borderLeft: node.id === 'Projects' ? `1px solid ${node.color}` : 'none'
                  }} />
                </div>
              )}
            </div>
          );
        })}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dashFlow {
            from { stroke-dashoffset: 20; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes flowDash {
            to { stroke-dashoffset: -24; }
          }
          @keyframes scrollUp {
            from { transform: translateY(0); }
            to { transform: translateY(-50%); }
          }
          .activity-scroll {
            animation: scrollUp 8s linear infinite;
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
