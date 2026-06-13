import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';

export default function Hero() {
  const { navigate } = useContext(NavigationContext);
  // Recruiter-focused roles
  const roles = ['Machine Learning Engineer', 'Data Engineer', 'AI Solutions Architect', 'Data Scientist'];
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
    <div className="hero-container" style={{
      minHeight: '100vh',
      background: '#050911',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px 40px',
      fontFamily: 'Space Mono, monospace',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <SEO 
        title="Vetrivel A | Data Science & Machine Learning Portfolio" 
        description="Data Science student specializing in Machine Learning, NLP, Data Engineering, Analytics, and scalable systems."
        type="website"
      />
      
      {/* Top label */}
      <div className="hero-label" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0,255,136,0.08)',
        border: '1px solid rgba(0,255,136,0.3)',
        borderRadius: '20px',
        padding: '6px 16px',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#00ff88',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          color: '#00ff88',
          letterSpacing: '0.2em',
          fontWeight: '700',
        }}>
          AVAILABLE FOR HIRE
        </span>
      </div>

      {/* Name */}
      <h1 className="hero-name" style={{
        fontSize: 'clamp(2.2rem, 6vw, 5rem)',
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
      <div className="hero-role" style={{
        fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
        color: '#a855f7',
        marginBottom: '16px',
        minHeight: '2.2rem',
        textAlign: 'center'
      }}>
        {typedText}<span style={{ animation: 'blink 0.7s step-end infinite' }}>|</span>
      </div>

      {/* Terminal command line */}
      <div className="hero-terminal" style={{
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
      <p className="hero-bio" style={{
        maxWidth: '600px',
        padding: '0 8px',
        textAlign: 'center',
        color: '#8892a4',
        fontSize: '15px',
        lineHeight: '1.7',
        marginBottom: '40px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        Delivering end-to-end machine learning systems and scalable data pipelines.
        Proven ability to translate complex data into measurable business impact.
      </p>

      {/* 1-Click Access Buttons for Recruiters */}
      <div className="hero-cta-buttons" style={{ display: 'flex', gap: '12px', marginBottom: '52px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/resume')}
          style={{
            padding: '11px 28px',
            background: 'transparent',
            border: '1px solid #00d4ff',
            borderRadius: '6px',
            color: '#00d4ff',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'all 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View Resume →
        </button>
        <button
          onClick={() => window.open('https://www.linkedin.com/in/vetrivel28', '_blank')}
          style={{
            padding: '11px 28px',
            background: 'transparent',
            border: '1px solid #a855f7',
            borderRadius: '6px',
            color: '#a855f7',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'all 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(168,85,247,0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          LinkedIn Profile →
        </button>
        {/* TODO: Replace YOURNUMBER with your actual WhatsApp number */}
        <button
          onClick={() => window.open('https://wa.me/91YOURNUMBER', '_blank')}
          style={{
            padding: '11px 28px',
            background: 'transparent',
            border: '1px solid #00ff88',
            borderRadius: '6px',
            color: '#00ff88',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'all 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,255,136,0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          WhatsApp Chat →
        </button>
      </div>

      {/* Stats bar */}
      <div className="hero-stats" style={{
        display: 'flex', gap: '20px',
        justifyContent: 'center', marginBottom: '60px',
        flexWrap: 'wrap'
      }}>
        {[
          { value: '150+', label: 'LEETCODE_SOLVED', accent: '#00d4ff', viz: 'bars' },
          { value: '8.5', label: 'CGPA_SCORE', accent: '#fbbf24', viz: 'ring' },
          { value: '3', label: 'SYSTEMS_DEPLOYED', accent: '#a855f7', viz: 'dots' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#0a1628',
            border: `1px solid ${stat.accent}25`,
            borderTop: `2px solid ${stat.accent}`,
            borderRadius: '8px',
            overflow: 'hidden',
            minWidth: '130px',
            transition: 'box-shadow 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 20px ${stat.accent}20`}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{
              background: '#111d2e',
              padding: '5px 10px',
              display: 'flex', gap: '4px',
              borderBottom: `1px solid ${stat.accent}15`,
            }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Space Mono', fontSize: '2rem',
                fontWeight: '700', color: '#e8eef5',
                marginBottom: '6px', lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'Space Mono', fontSize: '8px',
                color: stat.accent, letterSpacing: '0.15em',
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="hero-obs-btn"
        onClick={() => navigate('/observatory')}
        style={{
          padding: '12px 32px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '6px',
          color: '#8892a4',
          fontFamily: 'Space Mono, monospace',
          fontSize: '13px',
          cursor: 'pointer',
          letterSpacing: '0.08em',
          transition: 'all 0.25s ease',
          marginBottom: '60px',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#00d4ff';
          e.currentTarget.style.color = '#00d4ff';
          e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.color = '#8892a4';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        → Open Technical Observatory
      </button>

      {/* Featured Project Section */}
      <div className="hero-featured" style={{ maxWidth: '760px', margin: '48px auto 0', width: '100%', padding: '0 20px' }}>
        
        {/* Label */}
        <div style={{
          fontFamily: 'Space Mono', fontSize: '9px',
          color: '#4a5568', letterSpacing: '0.25em',
          textAlign: 'center', marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          FEATURED_PROJECT
        </div>

        {/* Terminal card */}
        <div
          style={{
            background: '#0a1628',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: '4px solid #a855f7',
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'box-shadow 0.25s',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(168,85,247,0.12)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          {/* macOS title bar */}
          <div style={{
            background: '#111d2e',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '7px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              fontFamily: 'Space Mono', fontSize: '10px',
              color: '#4a5568', marginLeft: '8px',
            }}>
              enterprise_website_classifier.py
            </span>
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'Space Mono', fontSize: '9px',
              color: '#a855f7',
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.3)',
              padding: '1px 8px', borderRadius: '3px',
              letterSpacing: '0.08em',
            }}>
              MACHINE LEARNING
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 24px' }}>
            <h3 style={{
              fontFamily: 'Space Mono', fontSize: '1.1rem',
              fontWeight: '700', color: '#e8eef5',
              marginBottom: '6px',
            }}>
              Enterprise Website Classifier
            </h3>
            <div style={{
              fontFamily: 'Space Mono', fontSize: '13px',
              color: '#00d4ff', fontWeight: '700',
              marginBottom: '12px',
            }}>
              → 87% Accuracy · 2s Response Time
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#8892a4', fontSize: '14px',
              lineHeight: '1.65', marginBottom: '16px',
            }}>
              Automates URL categorization pipeline to reduce manual tagging
              hours by 95% while maintaining accuracy above 85% with SLA of
              under 2 seconds per request.
            </p>
            <button
              onClick={() => navigate('/observatory/projects')}
              style={{
                padding: '8px 18px',
                background: 'transparent',
                border: '1px solid rgba(168,85,247,0.5)',
                borderRadius: '5px',
                color: '#a855f7',
                fontFamily: 'Space Mono', fontSize: '12px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              View All Projects →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
