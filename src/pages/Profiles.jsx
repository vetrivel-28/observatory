import React, { useState, useEffect } from 'react';

const output = [
  { type: 'text', text: 'Connecting to GitHub...' },
  { type: 'link', text: '✓ github.com/vetrivel-a [OPEN SOURCE · REPOSITORIES]', url: 'https://github.com' },
  { type: 'text', text: '' },
  { type: 'text', text: 'Connecting to LinkedIn...' },
  { type: 'link', text: '✓ linkedin.com/in/vetrivel-a [PROFESSIONAL · NETWORK]', url: 'https://linkedin.com' },
  { type: 'text', text: '' },
  { type: 'text', text: 'Connecting to LeetCode...' },
  { type: 'link', text: '✓ leetcode.com/vetrivel-a [150+ PROBLEMS · ALGORITHMS]', url: 'https://leetcode.com' },
  { type: 'text', text: '' },
  { type: 'text', text: 'Loading Resume...' },
  { type: 'link', text: '✓ resume.pdf [DOWNLOAD · PDF]', url: '/resume.pdf' },
  { type: 'text', text: '' },
  { type: 'final', text: 'All systems connected.' }
];

export default function Profiles({ navigate }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < output.length) {
        setLines(prev => {
          if (prev.length >= output.length) return prev;
          return [...prev, output[currentLine]];
        });
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

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

      <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px' }}>Profiles</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Connect across the ecosystem.</p>

      {/* Terminal Window */}
      <div style={{
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
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
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
                  <a 
                    href={line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'color 0.2s',
                      cursor: 'none'
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={e => e.target.style.color = 'white'}
                  >
                    {line.text}
                  </a>
                ) : (
                  <span style={{ color: line.type === 'final' ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                    {line.text}
                  </span>
                )}
              </div>
            );
          })}
          <div className="cursor-blink" style={{ display: 'inline-block', width: '10px', height: '1.2em', background: 'var(--text-muted)', verticalAlign: 'bottom', marginLeft: '4px' }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
      `}} />
    </div>
  );
}
