import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { skills } from '../data/skills';
import { NavigationContext } from '../App';
import { Icons } from '../Icons';
import SEO from '../components/SEO';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';

export default function SkillDetail() {
  const { slug } = useParams();
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    
    if (slug) {
      trackEvent(AnalyticsEvents.SKILL_VIEW, { skill_slug: slug });
    }
  }, [slug]);

  const skill = skills.find(s => s.slug === slug);

  if (!skill) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center', fontFamily: 'Space Mono' }}>
        <SEO title="Skill Not Found" />
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
      <SEO 
        title={`${skill.domain} Skill`} 
        description={skill.evidence} 
      />

      <button 
        className="clickable hover-lift"
        onClick={() => navigate('/observatory/skills')}
        style={{
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: '1rem',
          marginBottom: '20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'Space Mono'
        }}
      >
        <span>←</span> Back to Skills
      </button>

      <div className="glass-panel" style={{
        borderTop: `5px solid ${skill.color}`,
        borderRadius: '12px', padding: '40px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              {React.createElement(Icons[skill.iconName] || 'span', { style: { color: skill.color, fontSize: '2.5rem' } })}
            </div>
            <div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono, monospace', margin: '0 0 8px 0' }}>
                {skill.domain}
              </h1>
              <div style={{ color: 'var(--text-muted)', fontFamily: 'Space Mono', fontSize: '14px' }}>
                System Module: {skill.filename}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', color: skill.color, fontWeight: 'bold', fontFamily: 'Space Mono', lineHeight: 1 }}>
              {skill.perf}%
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
              Proficiency
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginBottom: '40px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', width: mounted ? `${skill.perf}%` : '0%', 
            background: skill.color, borderRadius: '3px',
            transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
            boxShadow: `0 0 10px ${skill.color}80`
          }} />
        </div>

        <div style={{ display: 'grid', gap: '40px' }}>
          <section>
            <h2 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '16px', fontFamily: 'Space Mono' }}>Evidence of Usage</h2>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '24px', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '16px' }}>
                {skill.evidence}
              </p>
              <div style={{ borderLeft: `3px solid ${skill.color}`, paddingLeft: '16px', marginTop: '20px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Key Outcome</div>
                <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>{skill.outcome}</div>
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '16px', fontFamily: 'Space Mono' }}>Learning Journey</h2>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {skill.learningJourney}
            </p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '16px', fontFamily: 'Space Mono' }}>Core Technologies & Tools</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skill.tags.map(t => (
                <span key={t} className="hover-lift" style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white', fontSize: '14px', borderRadius: '6px',
                  padding: '8px 16px', fontFamily: 'Space Mono'
                }}>
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '16px', fontFamily: 'Space Mono' }}>Related Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {skill.projectsUsing.map((p, i) => (
                <div 
                  key={i} 
                  className="glass-card hover-lift clickable"
                  onClick={() => navigate(`/observatory/projects/${p.slug}`)}
                  style={{ padding: '20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ color: 'white', fontWeight: 'bold' }}>{p.name}</span>
                  <span style={{ color: skill.color }}>→</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
