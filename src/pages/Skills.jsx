import React, { useState, useEffect } from 'react';
import { Icons } from '../Icons';

export default function Skills({ navigate }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const skills = [
    {
      title: "Machine Learning",
      project: "Website Classifier",
      outcome: "87% Accuracy, 2s Response Time",
      tags: ["Python", "Scikit-Learn", "NLP", "Random Forests", "TF-IDF"],
      icon: Icons.brain,
      color: "var(--accent-purple)"
    },
    {
      title: "Data Engineering",
      project: "Market Analysis ETL",
      outcome: "Processed 500+ products in <2 min",
      tags: ["PostgreSQL", "SQL", "ETL Pipelines", "Selenium", "BeautifulSoup"],
      icon: Icons.database,
      color: "var(--accent-cyan)"
    },
    {
      title: "Software Development",
      project: "Women Safety SOS",
      outcome: "<4s Alert Delivery, Multi-channel fallback",
      tags: ["Python", "Flask", "TypeScript", "React", "REST APIs"],
      icon: Icons.code,
      color: "var(--accent-purple)"
    },
    {
      title: "Analytics & Visualization",
      project: "Intelligence Dashboards",
      outcome: "Discovered 15% pricing margins",
      tags: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Streamlit"],
      icon: Icons.chart,
      color: "var(--accent-amber)"
    }
  ];

  // SVG Sparkline component
  const Sparkline = ({ color }) => (
    <svg width="60" height="20" viewBox="0 0 60 20" style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0, transition: 'opacity 0.3s' }} className="sparkline">
      <polyline 
        points="0,15 10,10 20,18 30,5 40,12 50,2 60,8" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
        strokeDasharray="100"
        strokeDashoffset="100"
      />
    </svg>
  );

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('Observatory')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          cursor: 'none',
          marginBottom: '20px'
        }}
      >
        ← Back to Observatory
      </button>

      <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>Applied Skills</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Bridging the gap between theoretical knowledge and real-world impact.</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '60px'
      }}>
        {skills.map((skill, i) => (
          <div 
            key={i} 
            className="skill-card"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderLeft: `4px solid ${skill.color}50`,
              borderRadius: '8px',
              padding: '24px',
              position: 'relative',
              transition: 'all 0.3s ease',
              cursor: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderLeftColor = skill.color;
              const spark = e.currentTarget.querySelector('.sparkline');
              if (spark) {
                spark.style.opacity = 1;
                const polyline = spark.querySelector('polyline');
                if (polyline) polyline.style.animation = 'drawSpark 1s forwards';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderLeftColor = `${skill.color}50`;
              const spark = e.currentTarget.querySelector('.sparkline');
              if (spark) {
                spark.style.opacity = 0;
                const polyline = spark.querySelector('polyline');
                if (polyline) polyline.style.animation = 'none';
              }
            }}
          >
            <Sparkline color={skill.color} />
            <div style={{ color: skill.color, marginBottom: '16px' }}>{skill.icon}</div>
            <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>{skill.title}</h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Project: {skill.project}</div>
            <div style={{ fontSize: '0.9rem', color: skill.color, fontWeight: 'bold', marginBottom: '16px' }}>{skill.outcome}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skill.tags.map(tag => (
                <span key={tag} style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: 'white', marginBottom: '20px' }}>Tech Stack Radar</h3>
        <svg width="300" height="300" viewBox="0 0 100 100" style={{ overflow: 'visible', margin: '0 auto' }}>
          {/* Radar background */}
          {[20, 40, 60, 80, 100].map(r => (
            <polygon 
              key={r}
              points={`50,${50-r} ${50+r*0.866},${50-r*0.5} ${50+r*0.866},${50+r*0.5} 50,${50+r} ${50-r*0.866},${50+r*0.5} ${50-r*0.866},${50-r*0.5}`}
              fill="none" 
              stroke="var(--border)" 
              strokeWidth="1"
            />
          ))}
          {/* Axes */}
          <line x1="50" y1="50" x2="50" y2="0" stroke="var(--border)" />
          <line x1="50" y1="50" x2="93.3" y2="25" stroke="var(--border)" />
          <line x1="50" y1="50" x2="93.3" y2="75" stroke="var(--border)" />
          <line x1="50" y1="50" x2="50" y2="100" stroke="var(--border)" />
          <line x1="50" y1="50" x2="6.7" y2="75" stroke="var(--border)" />
          <line x1="50" y1="50" x2="6.7" y2="25" stroke="var(--border)" />
          
          {/* Data fill */}
          {/* Python 90, SQL 80, ML 85, Viz 75, Web 70, DataEng 80 */}
          {/* Scaled to r=50 max */}
          <polygon 
            points={
              mounted ? 
              `50,${50-45} ${50+40*0.866},${50-40*0.5} ${50+42.5*0.866},${50+42.5*0.5} 50,${50+37.5} ${50-35*0.866},${50+35*0.5} ${50-40*0.866},${50-40*0.5}`
              : `50,50 50,50 50,50 50,50 50,50 50,50`
            }
            fill="var(--accent-purple)" 
            fillOpacity="0.3"
            stroke="var(--accent-purple)" 
            strokeWidth="2"
            style={{ transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawSpark {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}
