import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

export default function Resume() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackEvent(AnalyticsEvents.RESUME_DOWNLOAD, { source: 'resume_page_view' });
  }, []);

  const handleDownload = () => {
    trackEvent(AnalyticsEvents.RESUME_DOWNLOAD, { source: 'button_click' });
    // Fallback if actual resume PDF isn't linked
    alert('Resume download triggered. Connect PDF in public/ folder.');
  };

  return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'DM Sans, sans-serif',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.5s ease'
    }}>
      <SEO 
        title="Resume | Recruiter Summary" 
        description="Vetrivel A - Data Scientist & ML Engineer Resume. 30-second recruiter summary of skills, projects, and achievements." 
        type="profile"
      />
      
      <div className="glass-card" style={{
        maxWidth: '800px',
        width: '100%',
        padding: '40px',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '32px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono', margin: '0 0 8px 0' }}>
              Vetrivel A
            </h1>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', margin: '0 0 16px 0', fontFamily: 'Space Mono' }}>
              Data Scientist & ML Engineer
            </h2>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <span>Based in India</span>
              <span>•</span>
              <a href="mailto:vetrivel.data@example.com" style={{ color: 'var(--accent-cyan)' }}>vetrivel.data@example.com</a>
            </div>
          </div>
          
          <button 
            className="hover-lift"
            onClick={handleDownload}
            style={{
              padding: '12px 24px', background: 'var(--accent-cyan)',
              color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontFamily: 'Space Mono', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            Download Full PDF
          </button>
        </div>

        {/* 30-second summary */}
        <div style={{ background: 'rgba(6, 182, 212, 0.05)', borderLeft: '4px solid var(--accent-cyan)', padding: '24px', borderRadius: '0 8px 8px 0', marginBottom: '40px' }}>
          <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '12px', fontFamily: 'Space Mono' }}>30-Second Summary</h3>
          <p style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>
            A driven Data Scientist and Machine Learning Engineer specializing in building scalable ML systems and ETL pipelines. Proven track record of delivering high-impact projects like sub-4-second multi-channel emergency alerts and 87% accuracy content classifiers. Strong foundation in Python, SQL, and Full-Stack deployment architectures.
          </p>
        </div>

        {/* Education & Experience Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <section>
            <h3 style={{ color: 'var(--accent-purple)', fontSize: '1.2rem', marginBottom: '20px', fontFamily: 'Space Mono', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Education</h3>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: 'white' }}>B.Tech Computer Science</strong>
                <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>8.9 CGPA</span>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>SRM Institute of Science and Technology (2020 - 2024)</div>
            </div>
          </section>

          <section>
            <h3 style={{ color: 'var(--accent-amber)', fontSize: '1.2rem', marginBottom: '20px', fontFamily: 'Space Mono', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Experience</h3>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: 'white' }}>Data Science Intern</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>2023 - Present</span>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Tech Corp • Bangalore, India</div>
              <ul style={{ marginTop: '12px', paddingLeft: '20px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                <li>Engineered ETL pipelines processing 50K+ daily records.</li>
                <li>Deployed predictive models reducing overhead by 12%.</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Top Projects */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', marginBottom: '20px', fontFamily: 'Space Mono', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Key Projects</h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            {projects.slice(0, 3).map(p => (
              <div key={p.slug} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: 'white', fontSize: '1.1rem' }}>{p.title}</strong>
                  <span style={{ color: p.color, fontSize: '0.9rem', fontFamily: 'Space Mono' }}>{p.metric}</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} style={{ fontSize: '11px', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-primary)' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--accent-purple)', fontSize: '1.2rem', marginBottom: '20px', fontFamily: 'Space Mono', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Technical Arsenal</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {skills.map(s => (
              <div key={s.slug} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}40`, borderRadius: '20px' }}>
                <span style={{ color: s.color }}>•</span>
                <span style={{ color: 'white', fontSize: '0.95rem' }}>{s.domain}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover-lift" onClick={() => trackEvent(AnalyticsEvents.LINKEDIN_CLICK)} style={{ padding: '10px 20px', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'Space Mono' }}>LinkedIn</a>
          <a href="https://github.com/vetrivel-28" target="_blank" rel="noreferrer" className="hover-lift" onClick={() => trackEvent(AnalyticsEvents.GITHUB_CLICK)} style={{ padding: '10px 20px', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'Space Mono' }}>GitHub</a>
          <a href="/" style={{ padding: '10px 20px', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', borderRadius: '8px', fontFamily: 'Space Mono' }}>Back to Portfolio</a>
        </div>
      </div>
    </div>
  );
}
