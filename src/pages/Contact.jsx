import React, { useState, useContext } from 'react';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function Contact() {
  const { navigate } = useContext(NavigationContext);
  const [form, setForm] = useState({ email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.location.href = `mailto:vetrivel@email.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;
    }, 1500);
  };

  return (
    <div className="page-content fade-in" style={{
      minHeight: '100vh',
      background: '#050911',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      fontFamily: 'Space Mono, monospace',
    }}>
      <SEO 
        title="Contact | Vetrivel A" 
        description="Initiate a secure transmission to my inbox."
        type="website"
      />

      <div style={{ width: '100%', maxWidth: '640px', marginBottom: '24px' }}>
        <Breadcrumb items={[
          {label: 'Home', page: 'home'},
          {label: 'Observatory', page: 'observatory'},
          {label: 'Contact', page: null}
        ]} />
        <button 
          className="clickable back-btn hover-lift"
          onClick={() => navigate('/observatory')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1rem',
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

      <div style={{
        fontFamily: 'Space Mono', fontSize: '10px',
        color: '#00d4ff', letterSpacing: '0.35em', marginBottom: '16px',
      }}>
        INITIATE TRANSMISSION
      </div>

      <h1 className="page-title" style={{
        fontFamily: 'Space Mono', fontSize: '2.4rem',
        fontWeight: '700', color: '#e8eef5',
        marginBottom: '8px', textAlign: 'center',
      }}>
        Contact
      </h1>

      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        color: '#4a5568', fontSize: '15px',
        marginBottom: '40px', textAlign: 'center',
      }}>
        Initiate a secure transmission to my inbox.
      </p>

      {/* Terminal form window */}
      <div className="contact-form" style={{
        width: '100%', maxWidth: '640px',
        background: '#0a1628',
        border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(0,212,255,0.08)',
        marginBottom: '24px',
      }}>
        {/* Title bar */}
        <div style={{
          background: '#1a2332',
          borderBottom: '1px solid rgba(0,212,255,0.1)',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{
            fontFamily: 'Space Mono', fontSize: '11px',
            color: '#4a5568', marginLeft: '10px', letterSpacing: '0.08em',
          }}>
            vetrivel@portfolio:~/contact$
          </span>
        </div>

        {/* Form body */}
        <div style={{ padding: '24px 28px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
              <div style={{ color: '#00ff88', fontFamily: 'Space Mono', fontSize: '14px', marginBottom: '6px' }}>
                MESSAGE TRANSMITTED
              </div>
              <div style={{ color: '#4a5568', fontSize: '12px' }}>
                Opening your email client...
              </div>
            </div>
          ) : (
            <>
              {[
                { key: 'email', label: 'user@email.com:', placeholder: 'your@email.com', type: 'email' },
                { key: 'subject', label: 'subject:', placeholder: 'RE: Opportunity / Collaboration', type: 'text' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#00d4ff', fontSize: '13px', minWidth: '140px' }}>
                    {'> '}{field.label}
                  </span>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(0,212,255,0.2)',
                      color: '#e8eef5',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '13px',
                      padding: '4px 0',
                      outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderBottomColor = '#00d4ff'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(0,212,255,0.2)'}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#00d4ff', fontSize: '13px', marginBottom: '8px' }}>
                  {'> message:'}
                </div>
                <textarea
                  placeholder="Your message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    borderRadius: '6px',
                    color: '#e8eef5',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px',
                    padding: '12px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#00d4ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.15)'}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={sending}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: sending ? 'rgba(0,212,255,0.05)' : 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.4)',
                  borderRadius: '6px',
                  color: '#00d4ff',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '13px',
                  cursor: sending ? 'wait' : 'pointer',
                  letterSpacing: '0.1em',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => !sending && (e.currentTarget.style.background = 'rgba(0,212,255,0.18)')}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,212,255,0.1)'}
              >
                {sending ? '> TRANSMITTING...' : '> [SEND MESSAGE ↵]'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* SSH quick-links panel */}
      <div className="contact-form" style={{
        width: '100%', maxWidth: '640px',
        background: '#0a1628',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          background: '#1a2332',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '8px 16px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#4a5568', marginLeft: '8px' }}>
            vetrivel@portfolio:~/socials$
          </span>
        </div>
        <div style={{ padding: '16px 20px' }}>
          {[
            { cmd: 'ssh github.com/vetrivel-28', url: 'https://github.com/vetrivel-28', color: '#e8eef5' },
            { cmd: 'ssh linkedin.com/in/vetrivel-a', url: 'https://linkedin.com/in/vetrivel-a', color: '#00d4ff' },
            { cmd: 'curl leetcode.com/vetrivel-a', url: 'https://leetcode.com/vetrivel-a', color: '#fbbf24' },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => window.open(item.url, '_blank')}
              style={{
                fontFamily: 'Space Mono', fontSize: '12px',
                color: '#4a5568', cursor: 'pointer',
                padding: '6px 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'color 0.2s',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = item.color}
              onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
            >
              <span style={{ color: '#a855f7' }}>$</span>
              <span>{item.cmd}</span>
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#00ff88' }}>↗</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
