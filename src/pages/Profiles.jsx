import React, { useState, useEffect } from 'react';

const output = [
  { type: 'text', text: 'Connecting to GitHub...', delay: 200 },
  { type: 'link', text: '✓ github.com/vetrivel-28 [OPEN SOURCE · REPOSITORIES]', url: 'https://github.com/vetrivel-28', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'text', text: 'Connecting to LinkedIn...', delay: 200 },
  { type: 'link', text: '✓ linkedin.com/in/vetrivel-a [PROFESSIONAL · NETWORK]', url: 'https://linkedin.com/in/vetrivel-a', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'text', text: 'Connecting to LeetCode...', delay: 200 },
  { type: 'link', text: '✓ leetcode.com/vetrivel-a [150+ PROBLEMS · ALGORITHMS]', url: 'https://leetcode.com/vetrivel-a', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'text', text: 'Loading Resume...', delay: 200 },
  { type: 'link', text: '✓ resume.pdf [DOWNLOAD · PDF]', url: '/resume.pdf', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'final', text: 'All systems connected.', delay: 200 }
];

export default function Profiles({ navigate }) {
  const [lines, setLines] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let currentLine = 0;
    let timeoutId;
    
    const processNext = () => {
      if (currentLine < output.length) {
        const line = output[currentLine];
        timeoutId = setTimeout(() => {
          setLines(prev => [...prev, line]);
          currentLine++;
          processNext();
        }, line.delay);
      }
    };
    
    processNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="page-content fade-in" style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px 40px',
      maxWidth: '720px', 
      margin: '0 auto' 
    }}>
      <button 
        className="clickable back-btn"
        onClick={() => navigate('Observatory')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '24px',
          alignSelf: 'flex-start',
          display: 'block',
          textAlign: 'left'
        }}
      >
        ← Back to Observatory
      </button>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>Profiles</h1>
        <p style={{ color: 'var(--text-muted)' }}>Connect across the ecosystem.</p>
      </div>

      {/* Terminal Window */}
      <div className="profiles-terminal" style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        fontFamily: 'Space Mono, monospace'
      }}>
        {/* Terminal Header */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>vetrivel@portfolio:~/profiles$</div>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '24px', minHeight: '300px' }}>
          {lines.map((line, i) => {
            if (!line) return null;
            return (
              <div key={i} style={{ marginBottom: line.text === '' ? '12px' : '8px' }}>
                {line.type === 'link' ? (
                  <span 
                    className="clickable profile-link"
                    onClick={() => window.open(line.url, "_blank")}
                    style={{
                      color: 'var(--accent-cyan)',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'inline-block',
                      transition: 'all 0.2s',
                      padding: '4px 8px',
                      marginLeft: '-8px'
                    }}
                  >
                    {line.text}
                  </span>
                ) : (
                  <span style={{ 
                    color: line.type === 'final' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    fontStyle: line.type === 'final' ? 'italic' : 'normal'
                  }}>
                    {line.text}
                  </span>
                )}
              </div>
            );
          })}
          <div className="cursor-blink" style={{ display: 'inline-block', width: '10px', height: '1.2em', background: 'var(--text-muted)', verticalAlign: 'bottom', marginLeft: '4px' }} />
          
          <div style={{
            marginTop:'20px',
            paddingTop:'12px',
            borderTop:'1px solid rgba(255,255,255,0.07)',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <span style={{color:'#4a5568', fontSize:'10px', fontFamily:'Space Mono'}}>
              4/4 connections active
            </span>
            <span style={{
              color:'#22c55e', fontSize:'10px',
              fontFamily:'Space Mono',
              display:'flex', alignItems:'center', gap:'6px'
            }}>
              <span style={{
                width:'6px', height:'6px',
                background:'#22c55e', borderRadius:'50%',
                display:'inline-block',
                animation:'pulse 2s ease-in-out infinite'
              }}/>
              SECURE
            </span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        .profile-link:hover {
          background: rgba(6,182,212,0.1);
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
