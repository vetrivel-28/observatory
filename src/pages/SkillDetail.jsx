import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { skills } from '../data/skills';
import { NavigationContext } from '../App';
import { Icons } from '../Icons';

export default function SkillDetail() {
  const { slug } = useParams();
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, [slug]);

  const skill = skills.find(s => s.slug === slug);

  if (!skill) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center', fontFamily: 'Space Mono' }}>
        <h2>404 - Skill Not Found</h2>
        <button onClick={() => navigate('/observatory/skills')} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '4px', cursor: 'pointer' }}>
          Back to Skills
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
        onClick={() => navigate('/observatory/skills')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        ← Back to Skills
      </button>

      <div style={{
        background: 'rgba(15,25,41,0.9)',
        border: '1px solid var(--border)',
        borderTop: `5px solid ${skill.color}`,
        borderRadius: '8px',
        padding: '40px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {React.createElement(Icons[skill.iconName] || 'span', { style: { color: skill.color, fontSize: '2rem' } })}
            <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono, monospace', margin: 0 }}>
              {skill.domain}
            </h1>
          </div>
          <div style={{
            padding: '6px 12px',
            background: `${skill.color}20`,
            color: skill.color,
            border: `1px solid ${skill.color}40`,
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {skill.perf}% PROFICIENCY
          </div>
        </div>

        <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '32px' }}>
          Demonstrated through <strong style={{ color: 'white' }}>{skill.project}</strong> resulting in <span style={{ color: skill.color, fontWeight: 'bold' }}>{skill.outcome}</span>.
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'Space Mono' }}>Core Technologies & Tools</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skill.tags.map(t => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '13px',
                borderRadius: '4px',
                padding: '6px 16px',
                fontFamily: 'Space Mono'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderLeft: `3px solid ${skill.color}`, paddingLeft: '20px', background: `${skill.color}05`, padding: '20px', borderRadius: '0 8px 8px 0' }}>
          <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '8px', fontFamily: 'Space Mono' }}>Performance Metrics</h3>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '16px' }}>
            <div style={{ 
              height: '100%', 
              width: mounted ? `${skill.perf}%` : '0%', 
              background: skill.color, 
              borderRadius: '4px',
              transition: 'width 1s ease-out 0.3s'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
