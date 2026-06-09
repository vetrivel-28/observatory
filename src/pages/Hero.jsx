import React, { useState, useEffect } from 'react';

export default function Hero({ navigate }) {
  // Use useMemo to avoid dependency warnings if not defining roles outside
  const roles = ['Machine Learning', 'Data Engineer', 'Problem Solver', 'Python Developer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < current.length) {
          setTypedText(current.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(current.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 90);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050911',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Space Mono, monospace',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }}>
      
      {/* Top label */}
      <div style={{
        fontSize: '10px', color: '#00d4ff',
        letterSpacing: '0.35em', marginBottom: '20px',
      }}>
        DATA SCIENCE STUDENT
      </div>

      {/* Name — big terminal style */}
      <h1 style={{
        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
        fontWeight: '700',
        color: '#e8eef5',
        letterSpacing: '0.04em',
        marginBottom: '8px',
        textShadow: '0 0 40px rgba(0,212,255,0.2)',
        textAlign: 'center'
      }}>
        Vetrivel A
      </h1>

      {/* Typewriter role */}
      <div style={{
        fontSize: '1.6rem',
        color: '#a855f7',
        marginBottom: '16px',
        minHeight: '2.2rem',
        textAlign: 'center'
      }}>
        {typedText}<span style={{ animation: 'blink 0.7s step-end infinite' }}>|</span>
      </div>

      {/* Terminal command line */}
      <div style={{
        fontSize: '12px', color: '#4a5568',
        marginBottom: '36px',
        textAlign: 'center'
      }}>
        <span style={{ color: '#a855f7' }}>vetrivel@portfolio</span>
        <span style={{ color: '#4a5568' }}>:</span>
        <span style={{ color: '#00d4ff' }}>~/data-science</span>
        <span style={{ color: '#4a5568' }}>$ </span>
        <span style={{ color: '#8892a4' }}>ready --for-opportunities</span>
      </div>

      {/* Bio */}
      <p style={{
        maxWidth: '580px',
        textAlign: 'center',
        color: '#8892a4',
        fontSize: '14px',
        lineHeight: '1.7',
        marginBottom: '36px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        Building machine learning systems, analytics workflows, and scalable
        data pipelines to transform raw information into business intelligence.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '52px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('Observatory')}
          style={{
            padding: '12px 28px',
            background: 'transparent',
            border: '1px solid #00d4ff',
            borderRadius: '6px',
            color: '#00d4ff',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          → Explore Observatory
        </button>
        <button
          style={{
            padding: '12px 28px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            color: '#8892a4',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.color = '#e8eef5';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = '#8892a4';
          }}
        >
          ⬡ Resume
        </button>
      </div>

      {/* Stats bar — terminal cards */}
      <div style={{
        display: 'flex', gap: '20px',
        justifyContent: 'center', marginBottom: '52px',
        flexWrap: 'wrap'
      }}>
        {[
          { value: '150+', label: 'LEETCODE_SOLVED', accent: '#00d4ff', viz: 'bars' },
          { value: '8.5', label: 'CGPA_SCORE', accent: '#fbbf24', viz: 'ring' },
          { value: '3', label: 'PROJECTS_BUILT', accent: '#a855f7', viz: 'dots' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#0a1628',
            border: `1px solid ${stat.accent}25`,
            borderRadius: '8px',
            overflow: 'hidden',
            minWidth: '130px',
            transition: 'box-shadow 0.25s',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 20px ${stat.accent}20`}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Stat card title bar */}
            <div style={{
              background: '#1a2332',
              borderBottom: `1px solid ${stat.accent}20`,
              padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ padding: '14px 16px', textAlign: 'center' }}>
              {/* Visualization per stat */}
              {stat.viz === 'bars' && (
                <div style={{
                  display: 'flex', gap: '2px',
                  alignItems: 'flex-end', justifyContent: 'center',
                  height: '24px', marginBottom: '8px',
                }}>
                  {[40, 60, 80, 100, 70].map((h, j) => (
                    <div key={j} style={{
                      width: '5px', height: `${h}%`,
                      background: stat.accent,
                      borderRadius: '1px',
                      animation: `barGrow 0.5s ease forwards`,
                      animationDelay: `${j * 80}ms`,
                      transformOrigin: 'bottom',
                    }} />
                  ))}
                </div>
              )}
              {stat.viz === 'ring' && (
                <svg width="32" height="32" style={{ display: 'block', margin: '0 auto 8px' }}>
                  <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <circle cx="16" cy="16" r="12" fill="none"
                    stroke={stat.accent} strokeWidth="3"
                    strokeDasharray={`${(8.5/10)*75.4} 75.4`}
                    strokeLinecap="round"
                    transform="rotate(-90 16 16)"
                    style={{ transition: 'stroke-dasharray 1s ease' }}
                  />
                </svg>
              )}
              {stat.viz === 'dots' && (
                <div style={{
                  display: 'flex', gap: '4px',
                  justifyContent: 'center', marginBottom: '8px',
                }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{
                      width: '10px', height: '10px',
                      background: stat.accent,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      animation: `hexGlow 0.4s ease forwards`,
                      animationDelay: `${j * 150}ms`,
                    }} />
                  ))}
                </div>
              )}
              <div style={{
                fontFamily: 'Space Mono', fontSize: '1.5rem',
                fontWeight: '700', color: '#e8eef5', marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'Space Mono', fontSize: '8px',
                color: stat.accent, letterSpacing: '0.12em',
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA — terminal theme */}
      <div style={{
        textAlign: 'center',
        background: '#0a1628',
        border: '1px solid rgba(0,212,255,0.1)',
        borderRadius: '12px',
        padding: '28px 48px',
        maxWidth: '500px',
      }}>
        <div style={{
          fontFamily: 'Space Mono', fontSize: '1.2rem',
          fontWeight: '700', color: '#e8eef5', marginBottom: '8px',
        }}>
          Let's build something exceptional.
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
          color: '#8892a4', marginBottom: '20px',
        }}>
          Open to opportunities in Data Science, Machine Learning, and Engineering.
        </div>
        <button
          onClick={() => navigate('Contact')}
          style={{
            padding: '11px 28px',
            background: 'rgba(168,85,247,0.15)',
            border: '1px solid #a855f7',
            borderRadius: '6px',
            color: '#a855f7',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.25s',
            marginBottom: '20px',
            width: '100%',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(168,85,247,0.25)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(168,85,247,0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ✉ Get in Touch
        </button>
        {/* Contact boxes */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div
            onClick={() => window.open('https://wa.me/91XXXXXXXXXX', '_blank')}
            style={{
              flex: 1, padding: '10px',
              background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.25)',
              borderRadius: '8px', cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              minWidth: '140px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,255,136,0.15)';
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,255,136,0.08)';
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.25)';
            }}
          >
            <span style={{ fontSize: '14px' }}>📱</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Space Mono', fontSize: '11px', color: '#00ff88', fontWeight: '700' }}>WhatsApp</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568' }}>Chat directly</div>
            </div>
          </div>
          <div
            onClick={() => window.open('https://linkedin.com/in/vetrivel-a', '_blank')}
            style={{
              flex: 1, padding: '10px',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: '8px', cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              minWidth: '140px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
            }}
          >
            <span style={{ fontSize: '14px' }}>💼</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Space Mono', fontSize: '11px', color: '#00d4ff', fontWeight: '700' }}>LinkedIn</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568' }}>Let's connect</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
