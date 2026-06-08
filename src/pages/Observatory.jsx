import React, { useState } from 'react';
import { Icons } from '../Icons';

export default function Observatory({ navigate }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Center node coords
  const cx = 450;
  const cy = 300;

  const nodes = [
    { id: 'Projects', label: 'PROJECTS', icon: Icons.grid, color: 'var(--accent-cyan)', x: 450, y: 100, tags: ['Python', 'SQL', 'ML'] },
    { id: 'Profiles', label: 'PROFILES', icon: Icons.link, color: 'var(--accent-purple)', x: 150, y: 300, tags: ['GitHub', 'LinkedIn'] },
    { id: 'Skills', label: 'SKILLS', icon: Icons.brain, color: 'var(--accent-cyan)', x: 750, y: 300, tags: ['Data', 'Dev', 'Analytics'] },
    { id: 'Achievements', label: 'ACHIEVEMENTS', icon: Icons.trophy, color: 'var(--accent-amber)', x: 250, y: 500, tags: ['Awards', 'Hackathons'] },
    { id: 'Experience', label: 'EXPERIENCE', icon: Icons.briefcase, color: 'var(--accent-amber)', x: 650, y: 500, tags: ['Internship', 'Education'] },
  ];

  return (
    <div className="fade-in" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <button 
        onClick={() => navigate('Home')}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          cursor: 'none',
          zIndex: 10
        }}
      >
        ← Back to Home
      </button>

      <h1 style={{
        position: 'absolute',
        top: '30px',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        margin: 0,
        zIndex: 10
      }}>
        Data Observatory
      </h1>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '600px'
      }}>
        <svg width="900" height="600" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          {nodes.map(node => {
            const isHovered = hoveredNode === node.id;
            return (
              <g key={node.id}>
                <line 
                  x1={cx} y1={cy} x2={node.x} y2={node.y} 
                  stroke={isHovered ? node.color : 'var(--border)'} 
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray="4 4"
                  className={isHovered ? 'line-pulse' : ''}
                />
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
          padding: '12px 24px',
          background: 'var(--card-bg)',
          border: '1px solid var(--accent-purple)',
          borderRadius: '50px',
          color: 'white',
          boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
          fontFamily: 'Space Mono, monospace',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Vetrivel A <br/> <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)' }}>DATA SCIENCE</span>
        </div>

        {/* Satellite Nodes */}
        {nodes.map(node => {
          const isHovered = hoveredNode === node.id;
          return (
            <div 
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                if (node.id === 'Projects') {
                  // The prompt specifies tooltip click navigation, but we don't have a separate Projects page designed in the prompt. 
                  // "Clicking a project name navigates directly to that project's detail on the Projects page." 
                  // The prompt didn't supply a full Projects page spec, but we can navigate to 'Projects' and handle it later.
                } else {
                  navigate(node.id);
                }
              }}
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
                cursor: 'none',
                transition: 'all 0.3s',
                boxShadow: isHovered ? `0 0 15px ${node.color}40` : 'none',
                borderColor: isHovered ? node.color : 'var(--border)'
              }}
            >
              <div style={{ color: node.color }}>{node.icon}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white', margin: '4px 0' }}>{node.label}</div>
              <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{node.tags.join('·')}</div>

              {/* Tooltip for Projects */}
              {node.id === 'Projects' && isHovered && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '10px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--accent-cyan)',
                  borderRadius: '8px',
                  padding: '8px',
                  width: '200px',
                  zIndex: 20
                }}>
                  <div 
                    style={{ fontSize: '0.8rem', padding: '4px', cursor: 'none', color: 'var(--text-primary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                    onClick={(e) => { e.stopPropagation(); navigate('Projects'); }}
                  >Website Classifier</div>
                  <div 
                    style={{ fontSize: '0.8rem', padding: '4px', cursor: 'none', color: 'var(--text-primary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                    onClick={(e) => { e.stopPropagation(); navigate('Projects'); }}
                  >Market Analysis ETL</div>
                  <div 
                    style={{ fontSize: '0.8rem', padding: '4px', cursor: 'none', color: 'var(--text-primary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                    onClick={(e) => { e.stopPropagation(); navigate('Projects'); }}
                  >Women Safety SOS</div>
                </div>
              )}
            </div>
          );
        })}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flow {
            from { stroke-dashoffset: 8; }
            to { stroke-dashoffset: 0; }
          }
          .line-pulse {
            animation: flow 0.5s linear infinite;
          }
        `}} />
      </div>
    </div>
  );
}
