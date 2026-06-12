import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import { projects } from '../data/projects';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function Projects() {
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <div className="page-content fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
      <SEO 
        title="Projects | Vetrivel A" 
        description="Machine Learning, NLP, Data Engineering, and Analytics projects with architecture details and measurable impact."
        type="website"
      />
      <Breadcrumb items={[
        {label: 'Home', page: 'home'},
        {label: 'Observatory', page: 'observatory'},
        {label: 'Projects', page: null}
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

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="page-title" style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '700', color: '#e8eef5', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.01em' }}>Projects</h1>
        <p style={{ color: 'var(--text-muted)' }}>3 production-grade systems built from concept to deployment.</p>
      </div>

      <div className="projects-container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
              overflow: 'hidden',
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
            {/* Terminal title bar */}
            <div style={{
              background: '#111d2e',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '7px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '0',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{
                fontFamily: 'Space Mono', fontSize: '10px',
                color: '#4a5568', marginLeft: '8px',
              }}>
                {p.filename}
              </span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'Space Mono', fontSize: '9px',
                color: p.color,
                background: `${p.color}15`,
                border: `1px solid ${p.color}30`,
                padding: '1px 8px', borderRadius: '3px',
                letterSpacing: '0.08em',
              }}>
                {p.badge}
              </span>
            </div>
            <div style={{ padding: '32px' }}>
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

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
              
              {/* View Code */}
              <button
                onClick={() => window.open(p.githubUrl || 'https://github.com/vetrivel-28', '_blank')}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: `1px solid ${p.color}`,
                  borderRadius: '5px',
                  color: p.color,
                  fontFamily: 'Space Mono', fontSize: '12px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${p.color}15`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                &lt;/&gt; View Code
              </button>

              {/* View Article — Medium */}
              <button
                onClick={() => window.open(p.mediumUrl || '#', '_blank')}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '5px',
                  color: '#8892a4',
                  fontFamily: 'Space Mono', fontSize: '12px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#fbbf24';
                  e.currentTarget.style.color = '#fbbf24';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = '#8892a4';
                }}
              >
                → View Article
              </button>

              {/* Live Demo */}
              <button
                onClick={() => window.open(p.demoUrl || '#', '_blank')}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '5px',
                  color: '#4a5568',
                  fontFamily: 'Space Mono', fontSize: '12px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.color = '#8892a4';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = '#4a5568';
                }}
              >
                ↗ Live Demo
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
