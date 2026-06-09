import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import { projects } from '../data/projects';

export default function Projects() {
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <div className="page-content fade-in" style={{ padding: '40px 20px', maxWidth: '840px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
      <button 
        className="clickable back-btn" style={{display: "none"}}
        onClick={() => navigate('/observatory')}
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

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px', fontFamily: 'Space Mono, monospace' }}>Projects</h1>
        <p style={{ color: 'var(--text-muted)' }}>3 production-grade systems built from concept to deployment.</p>
      </div>

      <div className="projects-container" style={{ maxWidth: '820px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {projects.map((p, i) => (
          <div 
            key={i} 
            className="clickable"
            onClick={() => navigate('/observatory/projects/' + p.slug)}
            style={{
              width: '100%',
              background: 'rgba(15,25,41,0.9)',
              border: '1px solid var(--border)',
              borderLeft: `5px solid ${p.color}`,
              borderRadius: '8px',
              padding: '32px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${p.delay}, transform 0.25s ease, box-shadow 0.25s ease`,
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = mounted ? 'translateY(0)' : 'translateY(20px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              <div style={{ fontSize: '1.4rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono, monospace' }}>
                {p.title}
              </div>
              <div style={{
                padding: '4px 8px',
                background: `${p.color}20`,
                color: p.color,
                border: `1px solid ${p.color}40`,
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {p.badge}
              </div>
            </div>

            <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '1rem', marginBottom: '16px' }}>
              {p.metric}
            </div>

            <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '24px' }}>
              {p.desc}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Core Technologies</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    background: 'rgba(124,58,237,0.15)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    color: 'white',
                    fontSize: '11px',
                    borderRadius: '4px',
                    padding: '2px 8px'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderLeft: `3px solid var(--accent-cyan)`, paddingLeft: '16px', marginBottom: '24px' }}>
              <div style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {p.achievement}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                className="clickable"
                onClick={() => window.open("https://github.com/vetrivel-28", "_blank")}
                style={{
                  padding: '9px 20px',
                  border: `1px solid ${p.color}`,
                  borderRadius: '6px',
                  background: 'transparent',
                  color: p.color,
                  fontSize: '13px',
                  fontFamily: 'Space Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(124,58,237,0.1)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                &lt;&gt; View Code
              </button>
              <button 
                className="clickable"
                onClick={() => window.open("#", "_blank")}
                style={{
                  padding: '9px 20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  background: 'transparent',
                  color: '#8892a4',
                  fontSize: '13px',
                  fontFamily: 'Space Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.color = 'white'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { e.target.style.color = '#8892a4'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                ↗ Live Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
