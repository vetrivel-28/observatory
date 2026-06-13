import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const output = [
  { type: 'text', text: 'Connecting to GitHub...', delay: 200 },
  { type: 'link', text: '✓ github.com/vetrivel-28 [OPEN SOURCE · REPOSITORIES]', url: 'https://github.com/vetrivel-28', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'text', text: 'Connecting to LinkedIn...', delay: 200 },
  { type: 'link', text: '✓ linkedin.com/in/vetrivel28 [PROFESSIONAL · NETWORK]', url: 'https://www.linkedin.com/in/vetrivel28', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'text', text: 'Connecting to LeetCode...', delay: 200 },
  { type: 'link', text: '✓ leetcode.com/u/vetri_028 [150+ PROBLEMS · ALGORITHMS]', url: 'https://leetcode.com/u/vetri_028/', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'text', text: 'Loading Resume...', delay: 200 },
  // TODO: Add resume.pdf to the /public directory to make this download work
  { type: 'link', text: '✓ resume.pdf [DOWNLOAD · PDF]', url: '/resume.pdf', delay: 300 },
  { type: 'text', text: '', delay: 0 },
  { type: 'final', text: 'All systems connected.', delay: 200 }
];

export default function Profiles() {
  const { navigate } = useContext(NavigationContext);
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
    <div className="page-content fade-in page-container profiles-page" style={{ 
      minHeight: '100vh',
      background: '#050911',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(16px, 4vw, 80px) clamp(12px, 3vw, 24px)',
      gap: '0',
    }}>
      <SEO 
        title="Professional Profiles | Vetrivel A" 
        description="Official links to GitHub, LinkedIn, LeetCode, and Medium profiles."
        type="profile"
      />

      <div style={{ width: '100%', maxWidth: '760px', marginBottom: '0' }}>
        <Breadcrumb items={[
          {label: 'Home', page: 'home'},
          {label: 'Observatory', page: 'observatory'},
          {label: 'Profiles', page: null}
        ]} />
        <button 
          className="clickable back-btn hover-lift"
          onClick={() => navigate('/observatory')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'Space Mono',
            padding: '0'
          }}
        >
          <span>←</span> Back to Observatory
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title" style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '700', color: '#e8eef5', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.01em' }}>Profiles</h1>
        <p style={{ color: 'var(--text-muted)' }}>Connect across the ecosystem.</p>
      </div>

      {/* Terminal Window */}
      <div className="profiles-terminal terminal-card" style={{
        width: '100%',
        maxWidth: '760px',
        background: '#0a1628',
        border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(0,212,255,0.06)',
        margin: '0 auto',
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
        <div className="profiles-terminal-body terminal-body" style={{ padding: '24px', minHeight: '300px' }}>
          {lines.map((line, i) => {
            if (!line) return null;
            return (
              <div key={i} className={`profile-line ${line.text === '' ? 'empty-line' : ''}`} style={{ marginBottom: line.text === '' ? '12px' : '8px' }}>
                {line.type === 'link' ? (
                  <span 
                    className="clickable profile-link connected-line"
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
                  <span className="connect-line" style={{ 
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
