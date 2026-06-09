import React, { useState, useEffect } from 'react';

const PAGE_TRANSITIONS = {
  projects: {
    query: "SELECT name, stack, accuracy FROM projects WHERE deployed = true ORDER BY impact DESC;",
    table1: { name: 'projects', columns: ['id INT PK', 'name VARCHAR', 'accuracy FLOAT', 'deployed BOOL'] },
    table2: { name: 'tech_stack', columns: ['project_id FK', 'language VARCHAR', 'version TEXT'] },
    accent: '#00d4ff',
    icon: '⬡',
  },
  skills: {
    query: "SELECT skill, proficiency, projects_used FROM skills WHERE domain = 'data_science' ORDER BY proficiency DESC;",
    table1: { name: 'skills', columns: ['id INT PK', 'domain VARCHAR', 'proficiency INT'] },
    table2: { name: 'skill_projects', columns: ['skill_id FK', 'project VARCHAR', 'outcome TEXT'] },
    accent: '#00d4ff',
    icon: '◈',
  },
  profiles: {
    query: "SELECT platform, url, status FROM profiles WHERE connected = true AND verified = true;",
    table1: { name: 'profiles', columns: ['id INT PK', 'platform VARCHAR', 'url TEXT'] },
    table2: { name: 'connections', columns: ['profile_id FK', 'status ENUM', 'verified BOOL'] },
    accent: '#a855f7',
    icon: '⟁',
  },
  achievements: {
    query: "SELECT title, award, year FROM hackathons WHERE rank <= 5 ORDER BY year DESC;",
    table1: { name: 'hackathons', columns: ['id INT PK', 'title VARCHAR', 'year INT'] },
    table2: { name: 'awards', columns: ['hack_id FK', 'award VARCHAR', 'rank INT'] },
    accent: '#fbbf24',
    icon: '◆',
  },
  experience: {
    query: "SELECT role, company, impact FROM experience WHERE type = 'internship' AND year >= 2024;",
    table1: { name: 'experience', columns: ['id INT PK', 'role VARCHAR', 'company TEXT'] },
    table2: { name: 'impact', columns: ['exp_id FK', 'metric VARCHAR', 'value TEXT'] },
    accent: '#fbbf24',
    icon: '▣',
  },
  contact: {
    query: "INSERT INTO messages (sender, subject, body) VALUES (?, ?, ?) RETURNING id, timestamp;",
    table1: { name: 'messages', columns: ['id INT PK', 'sender VARCHAR', 'timestamp TS'] },
    table2: { name: 'contacts', columns: ['msg_id FK', 'channel ENUM', 'status TEXT'] },
    accent: '#00ff88',
    icon: '⌘',
  },
  observatory: {
    query: "SELECT * FROM data_observatory WHERE user = 'vetrivel_a' AND active = true;",
    table1: { name: 'observatory', columns: ['id INT PK', 'section VARCHAR', 'status BOOL'] },
    table2: { name: 'metadata', columns: ['obs_id FK', 'key VARCHAR', 'value TEXT'] },
    accent: '#00d4ff',
    icon: '◉',
  },
};

export default function TransitionOverlay({ isVisible, targetPage }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStep(0);
      return;
    }
    
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setStep(i), i * 200));
    }
    return () => timers.forEach(clearTimeout);
  }, [isVisible, targetPage]);

  if (!isVisible) return null;

  const pageKey = (targetPage || 'observatory').toLowerCase();
  const transData = PAGE_TRANSITIONS[pageKey] || PAGE_TRANSITIONS['observatory'];

  const renderColumn = (col) => {
    if (col.includes('PK')) return <span style={{ color: '#fbbf24' }}>{col}</span>;
    if (col.includes('FK')) return <span style={{ color: '#a855f7' }}>{col}</span>;
    return <span style={{ color: '#8892a4' }}>{col}</span>;
  };

  const renderTable = (tableData) => (
    <div style={{
      border: `1px solid ${transData.accent}30`,
      borderRadius: '4px', overflow: 'hidden', flex: 1,
      background: '#0a1628'
    }}>
      <div style={{
        background: '#1a2332', padding: '6px 10px',
        fontFamily: 'Space Mono', fontSize: '10px', color: transData.accent,
        borderBottom: `1px solid ${transData.accent}30`
      }}>
        {tableData.name}
      </div>
      <div style={{ padding: '8px 10px' }}>
        {tableData.columns.map((col, idx) => (
          <div key={idx} style={{
            fontFamily: 'Space Mono', fontSize: '9px',
            marginBottom: '4px'
          }}>
            {renderColumn(col)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div 
        className={step > 0 ? (step >= 5 ? 'transition-overlay transition-exit' : 'transition-overlay transition-enter') : 'transition-overlay'} 
        style={{ opacity: 0, background: '#050911', fontFamily: 'Space Mono, monospace' }}
      >
        <div style={{ maxWidth: '640px', width: '100%', padding: '24px' }}>
          
          <div style={{ color: '#4a5568', fontSize: '11px', marginBottom: '8px' }}>
            &gt; QUERY_EXECUTION_PLAN
          </div>
          <div style={{ color: transData.accent, fontSize: '13px', marginBottom: '24px' }}>
            {transData.query}
          </div>

          {step >= 2 && (
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              {renderTable(transData.table1)}
              {step >= 3 && renderTable(transData.table2)}
            </div>
          )}

          {step >= 4 && (
            <div style={{
              width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)',
              borderRadius: '1px', overflow: 'hidden', marginBottom: '12px'
            }}>
              <div style={{
                height: '100%',
                background: `linear-gradient(90deg, ${transData.accent}, #00ff88)`,
                width: `${(step / 5) * 100}%`,
                transition: 'width 0.2s ease'
              }} />
            </div>
          )}

          {step >= 1 && (
            <div style={{ color: transData.accent, fontSize: '11px', textAlign: 'center' }}>
              {step >= 5 
                ? `LOADED ${transData.icon} ${(targetPage || 'observatory').toUpperCase()} ✓` 
                : `LOADING ${transData.icon} ${(targetPage || 'observatory').toUpperCase()}...`}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
