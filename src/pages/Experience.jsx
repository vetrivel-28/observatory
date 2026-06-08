import React from 'react';
import { Icons } from '../Icons';

export default function Experience({ navigate }) {
  
  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
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

      <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>Experience</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Professional journey...</p>

      {/* CARD 1 - Internship */}
      <div 
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent-purple)',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '40px',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.15)';
          e.currentTarget.style.borderColor = 'var(--accent-purple)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.borderLeftColor = 'var(--accent-purple)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>Data Science Intern</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>TECH SOLUTIONS INC.</span>
            <span style={{ color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>SUMMER 2025</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-primary)', marginBottom: '24px', lineHeight: '1.6' }}>
          Collaborated directly with the senior engineering team to design and deploy internal analytical tools, streamline raw data pipelines, and build predictive models for customer retention.
        </p>

        <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '16px' }}>Responsibilities & Impact</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
          {[
            "Engineered automated ETL pipelines reducing manual data formatting times by 40 hours a week.",
            "Designed a random forest classifier to predict customer churn, achieving an 82% validation accuracy.",
            "Created interactive executive dashboards using Streamlit and Plotly to visualize key performance indicators."
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>✓</span> {item}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Streamlit', 'Git'].map(tech => (
            <span key={tech} style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ color: 'var(--accent-amber)' }}>{Icons.lightbulb}</div>
          <p style={{ margin: 0 }}>
            Transitioning from Jupyter notebooks to production-ready codebase requires rigorous testing and version control. Stakeholder communication is just as important as statistical accuracy when presenting model results.
          </p>
        </div>
      </div>

      {/* CARD 2 - Education */}
      <div 
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.15)';
          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>Computer Science B.S.</h2>
          <span className="pulse-tag" style={{ color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>ONGOING</span>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Focusing on Machine Learning, Algorithms, and Distributed Systems
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {[
            { name: "Machine Learning", progress: "80%" },
            { name: "Algorithms", progress: "90%" },
            { name: "Distributed Systems", progress: "60%" },
            { name: "Data Structures", progress: "95%" }
          ].map(course => (
            <div key={course.name} style={{ flex: '1 1 200px' }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '8px 12px', 
                borderRadius: '8px 8px 0 0',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                textAlign: 'center'
              }}>
                {course.name}
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: course.progress, background: 'var(--accent-cyan)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(6, 182, 212, 0); }
          100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
        }
        .pulse-tag {
          animation: pulse 2s infinite;
        }
      `}} />
    </div>
  );
}
