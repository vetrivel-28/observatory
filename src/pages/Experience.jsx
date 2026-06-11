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
    <div className="page-content fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
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
          <h1 className="page-title" style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono', margin: '0 0 8px 0' }}>
            Experience.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontFamily: 'Space Mono' }}>
            My professional journey and technical roles.
          </p>
        </div>
      </div>

      <div className="experience-container" style={{ position: 'relative', padding: '20px 0' }}>
        {/* Center Line */}
        <div className="experience-timeline-line" style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'rgba(255,255,255,0.1)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }} />

        {experiences.map((exp, index) => (
          <div 
            key={exp.id}
            className={`experience-timeline-item ${exp.alignment === 'left' ? 'item-left' : 'item-right'}`}
            style={{
              display: 'flex',
              justifyContent: exp.alignment === 'left' ? 'flex-start' : 'flex-end',
              alignItems: 'center',
              width: '100%',
              marginBottom: '60px',
              position: 'relative',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s ease ${index * 200}ms`
            }}
          >
            {/* Timeline Dot */}
            <div className="experience-timeline-dot" style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              top: '50%',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: exp.color,
              border: '4px solid var(--bg-primary)',
              zIndex: 1,
              boxShadow: `0 0 15px ${exp.color}`
            }} />

            {/* Content Card */}
            <div style={{
              width: '45%',
              background: '#0a1628',
              border: '1px solid rgba(255,255,255,0.07)',
              borderLeft: `4px solid ${exp.color}`,
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
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
                  marginLeft: 'auto', fontFamily: 'Space Mono', fontSize: '10px',
                  color: '#fbbf24', letterSpacing: '0.1em',
                }}>
                  {exp.duration}
                </span>
              </div>
              {/* Card content */}
              <div style={{ padding: '20px 24px' }}>
                <h3 style={{ fontFamily: 'Space Mono', fontSize: '1.1rem', fontWeight: '700', color: '#e8eef5', marginBottom: '4px' }}>
                  {exp.role}
                </h3>
                <div style={{ fontFamily: 'Space Mono', fontSize: '12px', color: '#4a5568', marginBottom: '14px' }}>
                  @ {exp.company}
                </div>
                <p style={{ fontFamily: 'DM Sans', color: '#8892a4', fontSize: '14px', lineHeight: '1.65', marginBottom: '16px' }}>
                  {exp.description}
                </p>
                {/* Tech pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.tech.map(tech => (
                    <span key={tech} style={{
                      fontFamily: 'Space Mono', fontSize: '10px', color: '#e2e8f0',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      padding: '3px 8px', borderRadius: '4px',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
