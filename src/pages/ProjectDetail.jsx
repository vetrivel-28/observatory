import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { NavigationContext } from '../App';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, [slug]);

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center', fontFamily: 'Space Mono' }}>
        <h2>404 - Project Not Found</h2>
        <button onClick={() => navigate('/observatory/projects')} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '4px', cursor: 'pointer' }}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease',
      padding: '0', maxWidth: '840px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif'
    }}>
      <button 
        className="clickable"
        onClick={() => navigate('/observatory/projects')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        ← Back to Projects
      </button>

      <div style={{
        background: 'rgba(15,25,41,0.9)',
        border: '1px solid var(--border)',
        borderTop: `5px solid ${project.color}`,
        borderRadius: '8px',
        padding: '40px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono, monospace', margin: 0 }}>
            {project.title}
          </h1>
          <div style={{
            padding: '6px 12px',
            background: `${project.color}20`,
            color: project.color,
            border: `1px solid ${project.color}40`,
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {project.badge}
          </div>
        </div>

        <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '24px' }}>
          {project.metric}
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'Space Mono' }}>Overview</h2>
          <p style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
            {project.desc}
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'Space Mono' }}>Technologies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map(t => (
              <span key={t} style={{
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: 'white',
                fontSize: '13px',
                borderRadius: '4px',
                padding: '4px 12px'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderLeft: `3px solid var(--accent-cyan)`, paddingLeft: '20px', marginBottom: '40px', background: 'rgba(0,212,255,0.05)', padding: '20px', borderRadius: '0 8px 8px 0' }}>
          <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '8px', fontFamily: 'Space Mono' }}>Key Achievement</h3>
          <div style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6' }}>
            {project.achievement}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            className="clickable"
            onClick={() => window.open("https://github.com/vetrivel-28", "_blank")}
            style={{
              padding: '12px 24px',
              border: `1px solid ${project.color}`,
              borderRadius: '6px',
              background: 'transparent',
              color: project.color,
              fontSize: '14px',
              fontFamily: 'Space Mono, monospace',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(124,58,237,0.1)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            &lt;&gt; View Code Repository
          </button>
        </div>
      </div>
    </div>
  );
}
