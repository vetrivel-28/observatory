import { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../App';
import { projects } from '../data/projects';
import SEO from '../components/SEO';

const SECTIONS = [
  {
    key: 'profiles',
    title: 'About',
    icon: '⟁',
    cmd: 'cat about.md',
    output: 'System Overview & Identity',
    chips: ['Identity', 'Links', 'Background'],
    footerLabel: 'View connected profiles',
    accent: '#a855f7',
    tag: '[sys]',
    filename: 'about.md',
  },
  {
    key: 'projects',
    title: 'Projects',
    icon: '⬡',
    cmd: 'ls ~/projects/',
    output: '3 production systems deployed',
    chips: ['ML Classifier', 'ETL Pipeline', 'Safety App'],
    footerLabel: '3 projects  ·  Python · SQL · React',
    accent: '#00d4ff',
    tag: '[dataset]',
    filename: 'projects.py',
  },
  {
    key: 'skills',
    title: 'Skills',
    icon: '◈',
    cmd: 'cat skills.json | grep level',
    output: 'ML (Adv)  ·  DataEng (Int)  ·  Software (App)',
    chips: ['Python', 'SQL', 'Scikit-Learn', 'TensorFlow', 'React'],
    footerLabel: '4 domains  ·  radar chart inside',
    accent: '#00d4ff',
    tag: '[model]',
    filename: 'skills.model',
  },
  {
    key: 'experience',
    title: 'Experience',
    icon: '▣',
    cmd: 'git log --oneline ~/career',
    output: 'Data Science Intern @ Tech Solutions',
    chips: ['Summer 2025', 'ETL', '82% accuracy', 'CS B.S.'],
    footerLabel: '1 internship  ·  1 degree ongoing',
    accent: '#fbbf24',
    tag: '[input]',
    filename: 'experience.db',
  },
  {
    key: 'achievements',
    title: 'Achievements',
    icon: '◆',
    cmd: 'SELECT * FROM hackathons ORDER BY year DESC',
    output: 'Excellence Award  ·  Top 5%  ·  Best UI/UX',
    chips: ['2025', '2024', '2023'],
    footerLabel: '3 awards  ·  timeline view',
    accent: '#fbbf24',
    tag: '[output]',
    filename: 'hackathons.json',
  },
  {
    key: 'contact',
    title: 'Contact',
    icon: '⌘',
    cmd: 'curl -X POST /api/contact',
    output: 'Ready to receive transmissions',
    chips: ['WhatsApp', 'LinkedIn', 'Email'],
    footerLabel: 'Open to opportunities',
    accent: '#00ff88',
    tag: '[ssh]',
    filename: 'contact.sh',
  },
];

export default function Observatory() {
  const { navigate } = useContext(NavigationContext);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [bootLines, setBootLines] = useState([]);
  const [booted, setBooted] = useState(() => !!sessionStorage.getItem('obsBooted'));

  // Boot sequence animation
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('obsBooted');
    if (hasBooted) {
      setBooted(true);
      return;
    }

    const lines = [
      '> Initializing data_observatory.exe...',
      '> Loading portfolio modules [██████████] 100%',
      '> Establishing SSH tunnels...',
      '> All systems nominal. Portfolio ready.',
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setBootLines(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBooted(true);
          sessionStorage.setItem('obsBooted', 'true');
        }, 300);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const featuredProject = projects[0];

  return (
    <>
      <SEO 
        title="Observatory Dashboard | Vetrivel A" 
        description="High-level overview of Vetrivel A's systems, metrics, and technical capabilities."
        type="website"
      />
      {/* Boot sequence OR header after boot */}
      {!booted ? (
        <div style={{
          padding: '24px',
          background: '#0a1628',
          border: '1px solid rgba(0,212,255,0.1)',
          borderRadius: '8px',
          marginBottom: '24px',
          minHeight: '120px',
        }}>
          {bootLines.map((line, i) => (
            <div key={i} style={{
              fontSize: '12px',
              color: i === bootLines.length - 1 ? '#00d4ff' : '#4a5568',
              marginBottom: '6px',
              animation: 'fadeIn 0.2s ease forwards',
            }}>
              {line}
            </div>
          ))}
          <span style={{
            display: 'inline-block', width: '8px', height: '14px',
            background: '#00d4ff',
            animation: 'blink 0.7s step-end infinite',
            verticalAlign: 'middle',
          }} />
        </div>
      ) : (
        <>
          {/* Breadcrumb Terminal Style */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            padding: '8px 0',
            marginBottom: '16px',
          }}>
            {/* Prompt symbol before breadcrumb */}
            <span style={{ color: '#a855f7' }}>~/</span>
            <span
              onClick={() => navigate('/')}
              style={{ color: '#4a5568', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
              onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
            >
              home
            </span>
            <span style={{ color: '#2d3748' }}>/</span>
            <span style={{ color: '#00d4ff' }}>observatory</span>
            <span style={{
              marginLeft: '4px',
              display: 'inline-block',
              width: '7px', height: '13px',
              background: '#00d4ff',
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </div>

          <div className="terminal-card" style={{
            background: '#0a1628',
            border: '1px solid rgba(0,212,255,0.12)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px',
            opacity: 0,
            animation: 'fadeInUp 0.6s ease forwards',
          }}>
            {/* Terminal title bar */}
            <div style={{
              background: '#111d2e',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{
                fontFamily: 'Space Mono', fontSize: '11px',
                color: '#4a5568', marginLeft: '8px', letterSpacing: '0.06em',
              }}>
                vetrivel@portfolio ~ whoami
              </span>
              <span style={{
                marginLeft: 'auto',
                display: 'inline-block', width: '8px', height: '14px',
                background: '#00d4ff',
                animation: 'blink 1s step-end infinite',
              }} />
            </div>

            <div className="obs-header obs-header-row" style={{
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#4a5568', marginBottom: '4px' }}>
                  {'> whoami'}
                </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#e8eef5' }}>
              Vetrivel A
            </div>
            <div style={{ fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', marginTop: '2px' }}>
              DATA SCIENTIST & ML ENGINEER
            </div>
          </div>
          <div className="obs-stats-row" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { val: '150+', label: 'LeetCode Solved', color: '#00d4ff', icon: '</>' },
              { val: '8.5', label: 'CGPA / 10.0', color: '#fbbf24', icon: '★' },
              { val: '3', label: 'Systems Deployed', color: '#a855f7', icon: '⬡' },
            ].map(s => (
              <div key={s.label} className="obs-stat-item" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${s.color}20`,
                padding: '6px 14px', borderRadius: '6px',
              }}>
                <span style={{ color: s.color, fontSize: '13px' }}>{s.icon}</span>
                <div>
                  <div className="obs-stat-value" style={{
                    fontFamily: 'Space Mono', fontSize: '16px',
                    fontWeight: '700', color: s.color, lineHeight: 1,
                  }}>
                    {s.val}
                  </div>
                  <div className="obs-stat-label" style={{
                    fontFamily: 'Space Mono', fontSize: '8px',
                    color: '#4a5568', letterSpacing: '0.1em',
                    marginTop: '2px',
                  }}>
                    {s.label.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Compact Resume CTA Button */}
            <button
              onClick={() => navigate('/resume')}
              className="hover-lift interactive-card"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                padding: '10px 18px', borderRadius: '6px',
                color: '#00d4ff', fontFamily: 'Space Mono, monospace',
                fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                transition: 'all 0.2s', marginLeft: 'auto'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>📄</span>
              View Resume
            </button>
            </div>
          </div>
        </div>
      </>
    )}

      {/* Promotional Cards Banner Removed */}

      {/* ── Section cards — responsive grid ── */}
      {booted && (
        <div className="obs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          {SECTIONS.map((section, index) => {
            const isHovered = hoveredKey === section.key;
            return (
              <div
                key={section.key}
                onClick={() => navigate(`/observatory/${section.key}`)}
                onMouseEnter={() => setHoveredKey(section.key)}
                onMouseLeave={() => setHoveredKey(null)}
                role="button"
                tabIndex={0}
                style={{
                  position: 'relative',
                  background: '#0a1628',
                  border: `1px solid ${isHovered ? section.accent : 'rgba(255,255,255,0.07)'}`,
                  borderTop: `3px solid ${section.accent}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 12px 40px ${section.accent}20` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '180px',
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease forwards',
                  animationDelay: `${0.25 + (index * 0.1)}s`
                }}
              >

                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    right: '18px',
                    background: '#1a2332',
                    border: `1px solid ${section.accent}40`,
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontFamily: 'Space Mono',
                    fontSize: '10px',
                    color: '#8892a4',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                    pointerEvents: 'none',
                    boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
                    animation: 'fadeIn 0.15s ease forwards',
                  }}>
                    <span style={{ color: section.accent }}>click</span>
                    {' → opens '}{section.key}
                  </div>
                )}

                <div style={{
                  background: '#111d2e',
                  borderBottom: `1px solid rgba(255,255,255,0.05)`,
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
                    </div>
                    <span style={{
                      fontFamily: 'Space Mono', fontSize: '9px',
                      color: '#4a5568', marginLeft: '4px',
                    }}>
                      {section.filename}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'Space Mono', fontSize: '9px',
                    color: section.accent,
                    background: `${section.accent}15`,
                    border: `1px solid ${section.accent}35`,
                    padding: '2px 7px', borderRadius: '3px',
                    letterSpacing: '0.08em',
                  }}>
                    {section.tag}
                  </span>
                </div>

                <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '20px', color: section.accent }}>{section.icon}</span>
                    <span style={{
                      fontFamily: 'Space Mono',
                      fontSize: '15px',
                      fontWeight: '700',
                      color: section.accent,
                      letterSpacing: '0.08em',
                    }}>
                      {section.title ? section.title.toUpperCase() : section.key.toUpperCase()}
                    </span>
                  </div>

                  <div style={{
                    fontFamily: 'Space Mono', fontSize: '10px',
                    color: '#2d3748', marginBottom: '8px',
                    whiteSpace: 'nowrap', overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    <span style={{ color: isHovered ? section.accent + '80' : '#2d3748' }}>$ </span>
                    {section.cmd}
                  </div>

                  <div style={{
                    fontFamily: 'Space Mono', fontSize: '12px',
                    fontWeight: '700',
                    color: isHovered ? '#e8eef5' : '#8892a4',
                    marginBottom: '8px',
                    lineHeight: '1.5',
                    transition: 'color 0.22s',
                    flex: 1,
                  }}>
                    {section.output}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    marginBottom: '12px',
                  }}>
                    {section.chips.map(chip => (
                      <span key={chip} style={{
                        fontFamily: 'Space Mono', fontSize: '9px',
                        color: '#4a5568',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '2px 6px', borderRadius: '3px',
                      }}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'Space Mono', fontSize: '9px',
                      color: '#4a5568', letterSpacing: '0.1em',
                    }}>
                      {section.footerLabel}
                    </span>
                    <span style={{
                      fontFamily: 'Space Mono', fontSize: '11px',
                      color: isHovered ? section.accent : '#2d3748',
                      transition: 'color 0.22s',
                      fontWeight: '700',
                    }}>
                      {isHovered ? 'OPEN →' : '→'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {booted && (
        <div style={{
          marginTop: 'auto',
          padding: '10px 20px',
          background: '#0a1628',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { dot: '#00ff88', text: 'portfolio: ONLINE' },
              { dot: '#00d4ff', text: 'models: 3 deployed' },
              { dot: '#fbbf24', text: 'uptime: 99.9%' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'Space Mono', fontSize: '10px', color: '#4a5568',
              }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: item.dot,
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                {item.text}
              </div>
            ))}
          </div>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '10px', color: '#4a5568',
          }}>
            6 modules loaded
          </div>
        </div>
      )}
    </>
  );
}
