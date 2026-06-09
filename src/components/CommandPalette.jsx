import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavigationContext } from '../App';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { navigate } = useContext(NavigationContext);
  const inputRef = useRef(null);

  // Global search items
  const items = [
    { type: 'Page', title: 'Home', path: '/' },
    { type: 'Page', title: 'Observatory Hub', path: '/observatory' },
    { type: 'Page', title: 'Resume / Recruiter Summary', path: '/resume' },
    { type: 'Page', title: 'Contact', path: '/observatory/contact' },
    { type: 'Page', title: 'Experience Timeline', path: '/observatory/experience' },
    { type: 'Page', title: 'Hackathon Achievements', path: '/observatory/achievements' },
    ...projects.map(p => ({ type: 'Project', title: p.title, path: `/observatory/projects/${p.slug}`, badge: p.badge })),
    ...skills.map(s => ({ type: 'Skill', title: s.domain, path: `/observatory/skills/${s.slug}`, badge: `${s.perf}%` }))
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(open => !open);
        setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen, query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        navigate(filteredItems[selectedIndex].path);
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 9, 17, 0.8)', backdropFilter: 'blur(8px)',
      zIndex: 999999, display: 'flex', justifyContent: 'center',
      alignItems: 'flex-start', padding: '10vh 20px'
    }} onClick={() => setIsOpen(false)}>
      
      <div 
        className="glass-card"
        style={{
          width: '100%', maxWidth: '640px',
          borderRadius: '16px', overflow: 'hidden',
          animation: 'fadeInUp 0.2s ease-out forwards',
          display: 'flex', flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--accent-cyan)' }}>⌘</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, skills, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, background: 'transparent', border: 'none',
              color: 'white', fontSize: '1.2rem', fontFamily: 'Space Mono',
              outline: 'none'
            }}
          />
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px' }}>ESC</div>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '12px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No results found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={() => { navigate(item.path); setIsOpen(false); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: selectedIndex === i ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                  borderLeft: selectedIndex === i ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    fontSize: '11px', padding: '4px 8px', borderRadius: '4px',
                    background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
                    fontFamily: 'Space Mono'
                  }}>
                    {item.type}
                  </span>
                  <span style={{ color: selectedIndex === i ? 'white' : 'var(--text-primary)', fontWeight: selectedIndex === i ? 'bold' : 'normal' }}>
                    {item.title}
                  </span>
                </div>
                {item.badge && (
                  <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontFamily: 'Space Mono' }}>
                    {item.badge}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
