import React, { useEffect, useState } from 'react';
import { Icons } from '../Icons';

export default function Achievements({ navigate }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const achievements = [
    {
      year: "2025",
      title: "University Capstone Project Showcase",
      badge: "EXCELLENCE AWARD WINNER",
      role: "Lead Machine Learning Engineer",
      description: "AI-driven accessibility tool translating sign language to audio using edge-deployed computer vision.",
      tags: ["Python", "TensorFlow Lite", "MediaPipe", "React Native"],
      learning: "Optimizing ML models for edge devices requires heavy quantization and pruning. Real-time inference on mobile devices is heavily bottlenecked by thermal throttling.",
      icon: Icons.trophy,
      color: "var(--accent-purple)",
      side: "left"
    },
    {
      year: "2024",
      title: "Kaggle Tabular Playground Series",
      badge: "TOP 5% FINISH",
      role: "Data Analyst & Modeler",
      description: "Analyzed complex, anonymized dataset to predict multi-class probabilities. Engineered custom interaction features to boost LightGBM performance against 1,000+ competitors.",
      tags: ["Pandas", "Scikit-Learn", "LightGBM", "Optuna"],
      icon: Icons.database, // using database as medal isn't in Icons, but I can use link or grid or something. Actually trophy fits. Or I'll just use brain.
      color: "var(--accent-cyan)",
      side: "right"
    },
    {
      year: "2023",
      title: "ACM Student Chapter Hackathon",
      badge: "BEST UI/UX AWARD",
      role: "Full-Stack Developer",
      description: "Built a peer-to-peer tutoring marketplace platform focusing on a zero-friction onboarding flow and algorithmic matching based on subject competency.",
      tags: ["Next.js", "Tailwind CSS", "Firebase", "TypeScript"],
      icon: Icons.grid, // star isn't in Icons, using grid
      color: "var(--accent-amber)",
      side: "left"
    }
  ];

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

      <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>Hackathons & Awards</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '60px' }}>A timeline of competitive programming, hackathons, and industry challenges...</p>

      {/* Timeline Container */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Center Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-purple), var(--accent-amber))',
          transform: 'translateX(-50%)'
        }} />

        {achievements.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: item.side === 'left' ? 'flex-end' : 'flex-start',
            flexDirection: item.side === 'left' ? 'row' : 'row-reverse',
            alignItems: 'center',
            marginBottom: '40px',
            position: 'relative',
            width: '100%'
          }}>
            
            {/* Center Node Icon */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-base)',
              border: `2px solid ${item.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.color,
              zIndex: 2,
              boxShadow: `0 0 15px ${item.color}40`
            }}>
              {item.icon}
            </div>

            {/* Card Content */}
            <div style={{
              width: '45%',
              padding: item.side === 'left' ? '0 40px 0 0' : '0 0 0 40px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateX(0)' : `translateX(${item.side === 'left' ? '-50px' : '50px'})`,
              transition: `all 0.6s ease ${i * 0.2}s`
            }}>
              <div 
                className="achievement-card"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${item.color}20`;
                  e.currentTarget.style.borderColor = item.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                  {item.title} <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'normal' }}>({item.year})</span>
                </div>
                
                <div style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: `${item.color}15`,
                  color: item.color,
                  border: `1px solid ${item.color}30`,
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  marginBottom: '12px'
                }}>
                  {item.badge}
                </div>

                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
                  {item.role}
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <details style={{ cursor: 'none' }}>
                  <summary style={{ color: item.color, fontSize: '0.8rem', outline: 'none' }}>Key Learning</summary>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.4' }}>
                    {item.learning}
                  </p>
                </details>

              </div>
            </div>

          </div>
        ))}

        {/* Mobile responsive styles for the timeline */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .achievement-card {
              width: 100% !important;
            }
          }
        `}} />
      </div>

    </div>
  );
}
