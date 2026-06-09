import React, { useState, useEffect } from 'react';

export default function Observatory({ navigate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nodes = [
    { 
      page: 'Projects', title: 'PROJECTS', icon: '⬡', 
      accent: '#00d4ff', filename: 'projects.py',
      tag: '[dataset]',
      position: { left: '50%', top: '8%', transform: 'translateX(-50%)' }
    },
    { 
      page: 'Profiles', title: 'PROFILES', icon: '⟁', 
      accent: '#a855f7', filename: 'profiles.api',
      tag: '[api]',
      position: { left: '6%', top: '50%', transform: 'translateY(-50%)' }
    },
    { 
      page: 'Skills', title: 'SKILLS', icon: '◈', 
      accent: '#00d4ff', filename: 'skills.model',
      tag: '[model]',
      position: { right: '6%', top: '50%', transform: 'translateY(-50%)' }
    },
    { 
      page: 'Achievements', title: 'ACHIEVEMENTS', icon: '◆', 
      accent: '#fbbf24', filename: 'hackathons.json',
      tag: '[output]',
      position: { left: '18%', bottom: '8%' }
    },
    { 
      page: 'Experience', title: 'EXPERIENCE', icon: '▣', 
      accent: '#fbbf24', filename: 'experience.db',
      tag: '[input]',
      position: { right: '18%', bottom: '8%' }
    },
    { 
      page: 'Contact', title: 'CONTACT', icon: '⌘', 
      accent: '#00ff88', filename: 'contact.sh',
      tag: '[ssh]',
      position: { left: '50%', bottom: '8%', transform: 'translateX(-50%)' }
    },
  ];

  return (
    <div className="fade-in" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#050911', fontFamily: 'Space Mono, monospace' }}>
      
      {/* SVG Lines - Absolutely behind nodes */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        {nodes.map((node, i) => {
          let x2 = '50%';
          let y2 = '50%';
          if (node.position.left && node.position.top) {
            x2 = node.position.left; y2 = node.position.top;
          } else if (node.position.right && node.position.top) {
            x2 = `calc(100% - ${node.position.right})`; y2 = node.position.top;
          } else if (node.position.left && node.position.bottom) {
            x2 = node.position.left; y2 = `calc(100% - ${node.position.bottom})`;
          } else if (node.position.right && node.position.bottom) {
            x2 = `calc(100% - ${node.position.right})`; y2 = `calc(100% - ${node.position.bottom})`;
          }
          
          return (
            <line
              key={i}
              x1="50%" y1="50%"
              x2={x2} y2={y2}
              stroke="rgba(0,212,255,0.25)"
              strokeWidth="1"
              strokeDasharray="5 4"
              style={{ animation: 'dashFlow 3s linear infinite' }}
            />
          );
        })}
      </svg>

      {/* Center Node */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        textAlign: 'center',
      }}>
        {/* Outer glow ring — NOT rotating */}
        <div style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          border: '1px solid rgba(0,212,255,0.2)',
          pointerEvents: 'none',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.3)',
          pointerEvents: 'none',
        }} />
        {/* Content pill */}
        <div style={{
          background: '#0a1628',
          border: '1px solid rgba(0,212,255,0.4)',
          borderRadius: '12px',
          padding: '16px 32px',
          boxShadow: '0 0 40px rgba(0,212,255,0.15), 0 0 80px rgba(168,85,247,0.1)',
        }}>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#e8eef5',
            letterSpacing: '0.05em',
            marginBottom: '4px',
          }}>
            Vetrivel A
          </div>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#00d4ff',
            letterSpacing: '0.2em',
          }}>
            DATA SCIENCE
          </div>
        </div>
      </div>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          onClick={() => navigate(node.page)}
          style={{
            position: 'absolute',
            ...node.position,
            width: '140px',
            background: '#0a1628',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            zIndex: 10,
            opacity: mounted ? 1 : 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = node.accent;
            e.currentTarget.style.boxShadow = `0 0 24px ${node.accent}40`;
            const currTransform = node.position.transform || '';
            e.currentTarget.style.transform = `${currTransform} scale(1.05)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = node.position.transform || 'none';
          }}
        >
          {/* Terminal title bar */}
          <div style={{
            background: '#1a2332',
            borderBottom: `1px solid ${node.accent}30`,
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '8px',
              color: '#4a5568',
              marginLeft: '4px',
              letterSpacing: '0.05em',
            }}>
              {node.filename}
            </span>
          </div>
          {/* Node content */}
          <div style={{ padding: '10px 12px' }}>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{node.icon}</div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              fontWeight: '700',
              color: node.accent,
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}>
              {node.title}
            </div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              color: '#4a5568',
              letterSpacing: '0.05em',
            }}>
              {node.tag}
            </div>
          </div>
        </div>
      ))}

      {/* Left Panel — Pipeline Status */}
      <div style={{
        position: 'absolute',
        left: '16px', top: '50%',
        transform: 'translateY(-50%)',
        width: '185px',
        background: '#0a1628',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
        zIndex: 5,
      }}>
        <div style={{
          background: '#1a2332',
          borderBottom: '1px solid rgba(0,212,255,0.1)',
          padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568', marginLeft: '6px' }}>
            pipeline.log
          </span>
        </div>
        <div style={{ padding: '12px' }}>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '9px',
            color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '10px',
          }}>
            ● PIPELINE STATUS
          </div>
          {[
            { label: 'Data Ingestion', status: 'RUNNING', color: '#00ff88' },
            { label: 'Model Training', status: 'COMPLETE', color: '#00d4ff' },
            { label: 'ETL Pipeline', status: 'ACTIVE', color: '#00ff88' },
            { label: 'API Endpoints', status: 'ONLINE', color: '#00ff88' },
            { label: 'Dashboard', status: 'LIVE', color: '#fbbf24' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '8px',
            }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568' }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: 'Space Mono', fontSize: '8px',
                color: item.color, letterSpacing: '0.08em',
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: item.color,
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                {item.status}
              </span>
            </div>
          ))}
          <div style={{
            marginTop: '10px', paddingTop: '10px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568',
          }}>
            <div style={{ color: '#00d4ff', marginBottom: '6px', letterSpacing: '0.1em' }}>
              LIVE_OUTPUT
            </div>
            <div style={{ overflow: 'hidden', height: '70px',
              maskImage: 'linear-gradient(transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(transparent, black 20%, black 80%, transparent)',
            }}>
              <div style={{ animation: 'scrollUp 8s linear infinite' }}>
                {[
                  '> model.fit() ✓',
                  '> accuracy: 87.3%',
                  '> ETL: 500 rows',
                  '> query: 0.3s',
                  '> git push ✓',
                  '> df.dropna() ✓',
                  '> model.fit() ✓',
                  '> accuracy: 87.3%',
                ].map((line, i) => (
                  <div key={i} style={{
                    fontFamily: 'Space Mono', fontSize: '9px',
                    color: i % 2 === 0 ? '#00ff88' : '#4a5568',
                    marginBottom: '5px', whiteSpace: 'nowrap',
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Model Registry */}
      <div style={{
        position: 'absolute',
        right: '16px', top: '50%',
        transform: 'translateY(-50%)',
        width: '185px',
        background: '#0a1628',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
        zIndex: 5,
      }}>
        <div style={{
          background: '#1a2332',
          borderBottom: '1px solid rgba(0,212,255,0.1)',
          padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568', marginLeft: '6px' }}>
            model_registry.json
          </span>
        </div>
        <div style={{ padding: '12px' }}>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '9px',
            color: '#fbbf24', letterSpacing: '0.15em', marginBottom: '10px',
          }}>
            ◈ MODEL REGISTRY
          </div>
          <div style={{
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: '4px', overflow: 'hidden', marginBottom: '10px',
          }}>
            <div style={{
              background: '#1a2332', padding: '4px 8px',
              fontFamily: 'Space Mono', fontSize: '8px', color: '#00d4ff',
              letterSpacing: '0.1em',
            }}>
              models_deployed
            </div>
            {[
              { name: 'classifier_v2', acc: '87%' },
              { name: 'churn_rf_v1', acc: '82%' },
              { name: 'etl_pipeline', acc: '99%' },
            ].map((m, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '4px 8px',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                fontFamily: 'Space Mono', fontSize: '8px',
              }}>
                <span style={{ color: '#8892a4' }}>{m.name}</span>
                <span style={{ color: '#00ff88' }}>{m.acc}</span>
              </div>
            ))}
          </div>
          {[
            { label: 'ACCURACY', value: '87.3%', trend: '↑' },
            { label: 'PRECISION', value: '84.1%', trend: '↑' },
            { label: 'RECALL', value: '89.2%', trend: '→' },
            { label: 'F1', value: '86.6%', trend: '↑' },
          ].map((m, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '7px',
            }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: '9px', color: '#4a5568' }}>
                {m.label}
              </span>
              <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#e8eef5', fontWeight: '700' }}>
                {m.value}
                <span style={{ color: m.trend === '↑' ? '#00ff88' : '#00d4ff', marginLeft: '3px' }}>
                  {m.trend}
                </span>
              </span>
            </div>
          ))}
          <svg width="100%" height="28" style={{ marginTop: '8px' }}>
            <polyline
              points="0,22 20,18 40,19 60,12 80,14 110,7 140,9 161,4"
              fill="none" stroke="#fbbf24" strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <polyline
              points="0,22 20,18 40,19 60,12 80,14 110,7 140,9 161,4"
              fill="url(#sparkGrad)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '8px',
            color: '#4a5568', textAlign: 'center', marginTop: '2px',
          }}>
            training_loss.epoch[]
          </div>
        </div>
      </div>
    </div>
  );
}
