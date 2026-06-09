import React from 'react';
import { Icons } from '../Icons';

export default function Experience({ navigate }) {
  
  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <button 
        className="clickable"
        onClick={() => navigate('Observatory')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '20px',
          alignSelf: 'flex-start'
        }}
      >
        ← Back to Observatory
      </button>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* LEFT SIDEBAR */}
        <div style={{ flex: '1 1 300px', maxWidth: '35%', position: 'sticky', top: '40px' }}>
          <h2 style={{ color: 'var(--accent-cyan)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
            Career Timeline
          </h2>
          
          <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--border)', marginBottom: '40px' }}>
            
            {/* Node 1 */}
            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', background: 'var(--accent-amber)', borderRadius: '50%' }} />
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Space Mono, monospace', marginBottom: '4px' }}>SUMMER 2025</div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Data Science Intern</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tech Solutions Inc.</div>
            </div>

            {/* Node 2 */}
            <div style={{ position: 'relative' }}>
              <div className="pulse-purple" style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', background: 'var(--accent-purple)', borderRadius: '50%' }} />
              <div style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontFamily: 'Space Mono, monospace', marginBottom: '4px' }}>ONGOING</div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Computer Science B.S.</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>University Name</div>
            </div>

          </div>

          <h2 style={{ color: 'var(--accent-cyan)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            Tech Proficiency
          </h2>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.9rem' }}>
            {[
              { name: 'Python', dots: 5 },
              { name: 'SQL', dots: 4 },
              { name: 'ML', dots: 5 },
              { name: 'Pandas', dots: 4 }
            ].map(skill => (
              <div key={skill.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-primary)' }}>
                <span style={{ width: '80px' }}>{skill.name}</span>
                <span style={{ color: 'var(--accent-cyan)', letterSpacing: '2px' }}>
                  {'●'.repeat(skill.dots)}{'○'.repeat(5 - skill.dots)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MAIN PANEL */}
        <div style={{ flex: '1 1 500px' }}>
          
          {/* IDE Card - Internship */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid #a855f7',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            {/* Title Bar */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div style={{ color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace', fontSize: '0.85rem' }}>
                intern_experience.py
              </div>
              <div style={{ flex: 1 }} />
            </div>
            
            {/* Body */}
            <div style={{ padding: '24px', fontFamily: 'Space Mono, monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div style={{ color: 'var(--text-muted)' }}># Role: Data Science Intern @ Tech Solutions Inc.</div>
              <div style={{ color: 'var(--text-muted)' }}># Duration: Summer 2025</div>
              <br/>
              <div>
                <span style={{ color: 'white' }}>responsibilities</span> <span style={{ color: 'var(--accent-purple)' }}>=</span> <span style={{ color: 'white' }}>[</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>"Engineered automated ETL pipelines → -40hrs/week"</span><span style={{ color: 'white' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>"Built random forest classifier → 82% accuracy"</span><span style={{ color: 'white' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>"Created Streamlit dashboards for KPI tracking"</span>
              </div>
              <div><span style={{ color: 'white' }}>]</span></div>
              <br/>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', alignItems: 'center' }}>
                <span style={{ color: 'white' }}>tech_stack</span> <span style={{ color: 'var(--accent-purple)' }}>=</span> <span style={{ color: 'white' }}>[</span>
                {['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Git'].map(tag => (
                  <span key={tag} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    color: 'var(--text-muted)',
                  }}>
                    {tag}
                  </span>
                ))}
                <span style={{ color: 'white' }}>]</span>
              </div>
              <br/>
              <div style={{ color: 'var(--text-muted)' }}># Key Learning:</div>
              <div style={{ color: 'var(--text-muted)' }}># "Production code ≠ notebook code. Version control matters."</div>
            </div>
          </div>

          {/* Database Schema Card - Education */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '1.2rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ color: 'var(--accent-amber)' }}>{Icons.database}</span> education_db
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Space Mono, monospace', fontSize: '0.9rem', marginBottom: '32px' }}>
              <thead>
                <tr>
                  <th colSpan="2" style={{ border: '1px solid var(--border)', padding: '12px', textAlign: 'left', color: 'white', background: 'rgba(255,255,255,0.05)' }}>
                    degree_programs
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'var(--text-muted)', width: '30%' }}>degree</td>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'white' }}>CS B.S.</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'var(--text-muted)' }}>status</td>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'var(--accent-cyan)' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6,182,212,0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(6,182,212,0.3)' }}>
                      <span className="pulse-purple" style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%' }} />
                      ONGOING
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'var(--text-muted)' }}>focus</td>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'white' }}>ML, Algorithms</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'var(--text-muted)' }}>gpa</td>
                  <td style={{ border: '1px solid var(--border)', padding: '12px', color: 'white' }}>8.5 / 10.0</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {[
                { name: "Machine Learning", progress: "80%" },
                { name: "Algorithms", progress: "90%" },
                { name: "Distributed Sys", progress: "60%" },
                { name: "Data Structures", progress: "95%" }
              ].map(course => (
                <div key={course.name} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '8px', textAlign: 'center' }}>
                    {course.name}
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: course.progress, background: 'var(--accent-cyan)' }} />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulsePurple {
          0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0); }
          100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
        }
        .pulse-purple {
          animation: pulsePurple 2s infinite;
        }
      `}} />
    </div>
  );
}
