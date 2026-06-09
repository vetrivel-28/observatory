import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';

export default function Experience() {
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const experiences = [
    {
      id: 1,
      role: "Data Science Intern",
      company: "Tech Corp",
      duration: "June 2023 - Present",
      description: "Engineered scalable ETL pipelines using Python and PostgreSQL, processing 50K+ daily records. Deployed predictive models that reduced operational overhead by 12%. Collaborated with cross-functional teams to deliver Streamlit dashboards for real-time business intelligence.",
      tech: ["Python", "PostgreSQL", "Pandas", "Scikit-Learn", "Streamlit"],
      color: "var(--accent-cyan)",
      alignment: "left"
    },
    {
      id: 2,
      role: "Machine Learning Researcher",
      company: "University AI Lab",
      duration: "Jan 2023 - May 2023",
      description: "Conducted research on optimizing TF-IDF vectorization for short-text classification. Implemented ensemble models achieving an 87% accuracy rate across 8 categories. Co-authored an internal paper detailing performance vs. inference speed trade-offs.",
      tech: ["NLP", "NLTK", "PyTorch", "BeautifulSoup"],
      color: "var(--accent-purple)",
      alignment: "right"
    },
    {
      id: 3,
      role: "Software Developer (Freelance)",
      company: "Various Clients",
      duration: "2021 - 2022",
      description: "Developed and deployed multiple full-stack web applications using React and Node.js. Built a PWA with offline capabilities for a local NGO. Integrated third-party APIs (Stripe, Twilio) to deliver end-to-end functionality.",
      tech: ["React", "TypeScript", "Node.js", "Docker", "AWS"],
      color: "var(--accent-amber)",
      alignment: "left"
    }
  ];

  return (
    <div className="page-content fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
      <SEO title="Experience Timeline" description="Professional experience timeline including roles in Data Science, Machine Learning, and Full-Stack Development." />
      
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

      <div style={{ position: 'relative', padding: '20px 0' }}>
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
            className="experience-timeline-item"
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
              transform: 'translateX(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: exp.color,
              border: '4px solid var(--bg-primary)',
              zIndex: 1,
              boxShadow: `0 0 15px ${exp.color}`
            }} />

            {/* Content Card */}
            <div 
              className="glass-panel hover-lift experience-timeline-card"
              style={{
                width: '45%',
                padding: '30px',
                borderRadius: '12px',
                borderTop: `4px solid ${exp.color}`,
                textAlign: exp.alignment === 'left' ? 'right' : 'left'
              }}
            >
              <div style={{ color: exp.color, fontFamily: 'Space Mono', fontWeight: 'bold', marginBottom: '8px' }}>
                {exp.duration}
              </div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '4px', fontFamily: 'Space Mono' }}>
                {exp.role}
              </h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '20px' }}>
                {exp.company}
              </div>
              <p style={{ color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '20px', fontSize: '1.05rem', textAlign: 'left' }}>
                {exp.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                justifyContent: exp.alignment === 'left' ? 'flex-end' : 'flex-start'
              }}>
                {exp.tech.map(t => (
                  <span key={t} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontFamily: 'Space Mono'
                  }}>
                    {t}
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
