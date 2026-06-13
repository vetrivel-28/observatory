import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function Experience() {
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const experiences = [
    {
      id: 1,
      role: "Data Science Intern",
      company: "Tech Solutions Inc.",
      duration: "June 2024 - Present",
      description: "Engineered scalable ETL pipelines using Python and PostgreSQL, processing 50,000+ daily records. Deployed predictive models that identified a 12% reduction in operational overhead. Designed and delivered Streamlit dashboards for real-time executive business intelligence.",
      tech: ["Python", "PostgreSQL", "Pandas", "Scikit-Learn", "Streamlit"],
      color: "var(--accent-cyan)",
      alignment: "left"
    },
    {
      id: 2,
      role: "Machine Learning Researcher",
      company: "University AI Lab",
      duration: "Jan 2024 - May 2024",
      description: "Researched and optimized NLP models for short-text classification. Implemented ensemble architectures achieving an 87% accuracy rate across 8 categories. Co-authored an internal paper detailing the performance versus inference speed trade-offs of TF-IDF vs BERT.",
      tech: ["NLP", "NLTK", "PyTorch", "BeautifulSoup"],
      color: "var(--accent-purple)",
      alignment: "right"
    },
    {
      id: 3,
      role: "Lead Software Engineer (Capstone)",
      company: "University Engineering Dept",
      duration: "Aug 2023 - Dec 2023",
      description: "Led a team of 4 engineers to build a real-time emergency alert system with multi-channel notification fallback. Engineered the system to achieve sub-4-second delivery SLAs under simulated load of 1,000 concurrent triggers.",
      tech: ["React", "TypeScript", "Node.js", "Redis", "Celery"],
      color: "var(--accent-amber)",
      alignment: "left"
    }
  ];

  return (
    <div className="page-content fade-in page-container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
      <SEO 
        title="Experience Timeline | Vetrivel A" 
        description="Professional experience timeline spanning Data Science, Machine Learning, and Full-Stack Development." 
        type="website" 
      />
      
      <Breadcrumb items={[
        {label: 'Home', page: 'home'},
        {label: 'Observatory', page: 'observatory'},
        {label: 'Experience', page: null}
      ]} />
      <button
        onClick={() => navigate('/observatory')}
        style={{
          background: 'none', border: 'none',
          color: '#4a5568', fontFamily: 'Space Mono', fontSize: '13px',
          cursor: 'pointer', padding: '0', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
        onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
      >
        ← Back to Observatory
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <h1 className="page-title" style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '700', color: '#e8eef5', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.01em' }}>
            Experience
          </h1>
          <p className="page-subtitle" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontFamily: 'Space Mono' }}>
            My professional journey and technical roles.
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {experiences.map((exp, index) => (
          <div key={index} className="terminal-card" style={{
            width: '100%',
            background: '#0a1628',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: `4px solid ${exp.color || '#00d4ff'}`,
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'box-shadow 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,212,255,0.1)`}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Terminal title bar */}
            <div style={{
              background: '#111d2e',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '7px 14px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#4a5568', marginLeft: '8px' }}>
                {exp.role.includes('Intern') ? 'intern_2024.py' : exp.role.includes('Research') ? 'research_2024.py' : 'lead_engineer_2023.ts'}
              </span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'Space Mono', fontSize: '10px',
                color: '#fbbf24', letterSpacing: '0.08em',
              }}>
                {exp.duration}
              </span>
            </div>
            
            {/* Content */}
            <div className="section-content" style={{ padding: '20px 24px' }}>
              <h3 className="card-heading" style={{
                fontFamily: 'Space Mono', fontSize: '1.1rem',
                fontWeight: '700', color: '#e8eef5', marginBottom: '4px',
              }}>
                {exp.role}
              </h3>
              <div style={{
                fontFamily: 'Space Mono', fontSize: '12px',
                color: '#4a5568', marginBottom: '14px',
              }}>
                @ {exp.company}
              </div>
              <p className="body-text" style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#8892a4', fontSize: '14px',
                lineHeight: '1.65', marginBottom: '16px',
              }}>
                {exp.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {exp.tech.map(tech => (
                  <span key={tech} className="tag-pill" style={{
                    fontFamily: 'Space Mono', fontSize: '10px',
                    color: '#e2e8f0',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '3px 8px', borderRadius: '4px',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
