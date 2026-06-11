import React from 'react';

export default function BottomNav({ currentPage, navigateTo }) {
  const items = [
    { page: 'home', icon: '⌂', label: 'Home' },
    { page: 'observatory', icon: '◉', label: 'Hub' },
    { page: 'projects', icon: '⬡', label: 'Projects' },
    { page: 'skills', icon: '◈', label: 'Skills' },
    { page: 'contact', icon: '⌘', label: 'Contact' },
  ];

  return (
    <>
      {/* Spacer so content isn't hidden behind nav */}
      <div style={{ height: '64px', display: 'none' }} className="mobile-spacer" />
      
      <nav style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: 'rgba(10,22,40,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,212,255,0.12)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
        zIndex: 1000,
        display: 'none',  // hidden on desktop
      }} className="mobile-bottom-nav">
        {items.map(item => {
          const isActive = currentPage === item.page || 
            (item.page === 'observatory' && ['skills','projects','achievements','experience','profiles'].includes(currentPage));
          return (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page === 'home' ? '/' : `/observatory/${item.page === 'observatory' ? '' : item.page}`)}
              style={{
                background: 'none', border: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '3px',
                padding: '4px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flex: 1,
              }}
            >
              <span style={{
                fontSize: '18px',
                color: isActive ? '#00d4ff' : '#4a5568',
                transition: 'color 0.2s',
                lineHeight: 1,
              }}>
                {item.icon}
              </span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '8px',
                color: isActive ? '#00d4ff' : '#4a5568',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
