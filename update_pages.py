import os

# --- 1. Skills.jsx Radar fix ---
with open('d:/observatory/spa-portfolio/src/pages/Skills.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace radar SVG line
content = content.replace(
    '<svg width="360" height="360" viewBox="0 0 100 100" style={{ overflow: \'visible\' }}>',
    '<svg width="100%" height="auto" viewBox="-20 -20 140 140" style={{ overflow: \'visible\' }}>'
)
with open('d:/observatory/spa-portfolio/src/pages/Skills.jsx', 'w', encoding='utf-8') as f:
    f.write(content)


# --- 2. Achievements.jsx Timeline fix ---
with open('d:/observatory/spa-portfolio/src/pages/Achievements.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace timeline mapping logic
# Look for 'isRight = index % 2 === 0;'
old_timeline_logic = "const isRight = index % 2 === 0;"
new_timeline_logic = "const isRight = index % 2 !== 0; // Odd entries on right, Even on left as requested"

content = content.replace(old_timeline_logic, new_timeline_logic)
content = content.replace("badgeColor: '#7c3aed',", "badgeColor: '#f59e0b', // Gold") # Excellence
content = content.replace("badgeColor: '#f59e0b',", "badgeColor: '#7c3aed', // Purple") # Best UI UX -> Participation

with open('d:/observatory/spa-portfolio/src/pages/Achievements.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

# --- 3. Observatory.jsx Update ---
observatory_code = """import React, { useState, useEffect } from 'react';

export default function Observatory({ navigate }) {
  const [mounted, setMounted] = useState(false);
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    setMounted(true);
    let animationId;
    const animate = () => {
      setAngleOffset(prev => (prev + 0.001) % (Math.PI * 2));
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // 6 Nodes now including Contact
  const nodes = [
    { id: 'Projects', label: 'PROJECTS', color: '#7c3aed', radius: 180 },
    { id: 'Skills', label: 'SKILLS', color: '#06b6d4', radius: 180 },
    { id: 'Experience', label: 'EXPERIENCE', color: '#f59e0b', radius: 180 },
    { id: 'Achievements', label: 'HACKATHONS', color: '#10b981', radius: 180 },
    { id: 'Profiles', label: 'PROFILES', color: '#e2e8f0', radius: 180 },
    { id: 'Contact', label: 'CONTACT', color: '#ef4444', radius: 180 },
  ];

  return (
    <div className="fade-in" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Central Glowing Title */}
      <div style={{ textAlign: 'center', zIndex: 5, pointerEvents: 'none' }}>
        <h1 className="glitch-anim" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '4rem',
          fontWeight: '700',
          color: '#f1f5f9',
          letterSpacing: '0.1em',
          textShadow: '0 0 40px rgba(0, 229, 255, 0.4)',
          marginBottom: '8px',
          animation: 'blink 4s infinite'
        }}>
          VETRIVEL.DEV
        </h1>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          color: 'var(--accent-cyan)',
          letterSpacing: '0.2em'
        }}>
          Data Scientist & ML Engineer
        </div>
      </div>

      {/* Orbiting Nodes */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', pointerEvents: 'none' }}>
        {/* Orbital rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '360px', height: '360px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 + angleOffset;
          const x = 300 + Math.cos(angle) * node.radius;
          const y = 300 + Math.sin(angle) * node.radius;

          return (
            <div 
              key={node.id}
              onClick={() => navigate(node.id)}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0})`,
                transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transitionDelay: `${i * 100}ms`,
                cursor: 'pointer',
                pointerEvents: 'auto',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.15)';
                e.currentTarget.style.zIndex = 20;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.zIndex = 10;
              }}
            >
              {/* Terminal window card */}
              <div style={{
                background: 'rgba(13,27,42,0.95)',
                border: `1px solid ${node.color}50`,
                borderRadius: '6px',
                padding: '8px 16px',
                boxShadow: `0 0 20px ${node.color}20`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', gap: '4px', alignSelf: 'flex-start', marginBottom: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: node.color,
                  letterSpacing: '0.15em',
                  fontWeight: 'bold'
                }}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Scanning Text */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: 'var(--text-muted)',
        letterSpacing: '0.15em',
      }}>
        &gt; SCANNING SECTOR... CLICK TO EXPLORE <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
      </div>

    </div>
  );
}
"""

with open('d:/observatory/spa-portfolio/src/pages/Observatory.jsx', 'w', encoding='utf-8') as f:
    f.write(observatory_code)
