import React, { useEffect, useState } from 'react';
import { Icons } from '../Icons';

export default function Achievements({ navigate }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const achievements = [
    {
      year: "2025",
      dateLabel: "MAY 2025",
      title: "University Capstone Project Showcase",
      badge: "EXCELLENCE AWARD WINNER",
      role: "Lead Machine Learning Engineer",
      description: "AI-driven accessibility tool translating sign language to audio using edge-deployed computer vision.",
      tags: ["Python", "TensorFlow Lite", "MediaPipe", "React Native"],
      learning: "Optimizing ML models for edge devices requires heavy quantization and pruning. Real-time inference on mobile devices is heavily bottlenecked by thermal throttling.",
      icon: Icons.trophy,
      color: "var(--accent-purple)",
      side: "right"
    },
    {
      year: "2024",
      dateLabel: "AUG 2024",
      title: "Kaggle Tabular Playground Series",
      badge: "TOP 5% FINISH",
      role: "Data Analyst & Modeler",
      description: "Analyzed complex, anonymized dataset to predict multi-class probabilities. Engineered custom interaction features to boost LightGBM performance against 1,000+ competitors.",
      tags: ["Pandas", "Scikit-Learn", "LightGBM", "Optuna"],
      icon: Icons.database,
      color: "var(--accent-cyan)",
      side: "left"
    },
    {
      year: "2023",
      dateLabel: "MAR 2023",
      title: "ACM Student Chapter Hackathon",
      badge: "BEST UI/UX AWARD",
      role: "Full-Stack Developer",
      description: "Built a peer-to-peer tutoring marketplace platform focusing on a zero-friction onboarding flow and algorithmic matching based on subject competency.",
      tags: ["Next.js", "Tailwind CSS", "Firebase", "TypeScript"],
      icon: Icons.grid,
      color: "var(--accent-amber)",
      side: "right"
    }
  ];

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', overflowX: 'hidden' }}>
      <button 
        className="clickable"
        onClick={() => navigate('Observatory')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '20px'
        }}
      >
        ← Back to Observatory
      </button>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>Hackathons & Awards</h1>
        <p style={{ color: 'var(--text-muted)' }}>A timeline of competitive programming, hackathons, and industry challenges.</p>
      </div>

      {/* Timeline Container */}
      <div style={{ position: 'relative', width: '100%', padding: '40px 0' }}>
        {/* Center Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, var(--accent-amber), var(--accent-cyan), var(--accent-purple))',
          transform: 'translateX(-50%)',
          borderRadius: '2px'
        }} />

        {achievements.map((item, i) => {
          const isLeft = item.side === 'left';
          return (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '80px',
              position: 'relative',
              width: '100%'
            }}>
              
              {/* Center Node Block */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
              }}>
                <div style={{ color: item.color, fontSize: '0.7rem', fontFamily: 'Space Mono, monospace', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {item.dateLabel}
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--bg-base)',
                  border: `2px solid ${item.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  boxShadow: `0 0 20px ${item.color}50`
                }}>
                  {item.icon}
                </div>
              </div>

              {/* Card Container (Left or Right) */}
              <div style={{
                width: '50%',
                display: 'flex',
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                paddingRight: isLeft ? '60px' : '0',
                paddingLeft: isLeft ? '0' : '60px',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : `translateX(${isLeft ? '-60px' : '60px'})`,
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2}s`
              }}>
                <div 
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '24px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    maxWidth: '380px',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 10px 30px ${item.color}20`;
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '12px', lineHeight: '1.3' }}>
                    {item.title}
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
                    marginBottom: '12px',
                    fontFamily: 'Space Mono, monospace'
                  }}>
                    {item.badge}
                  </div>

                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', fontFamily: 'Space Mono, monospace' }}>
                    {item.role}
                  </div>

                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'Space Mono, monospace'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: `2px solid ${item.color}` }}>
                    <div style={{ color: item.color, fontSize: '0.8rem', marginBottom: '8px', fontFamily: 'Space Mono, monospace', fontWeight: 'bold' }}>KEY LEARNING</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                      {item.learning}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
