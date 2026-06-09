import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { NavigationContext } from '../App';

export default function ObservatoryLayout() {
  const { navigate } = useContext(NavigationContext);

  return (
    <div className="page-content" style={{
      width: '100%',
      minHeight: '100vh',
      background: '#050911',
      fontFamily: 'Space Mono, monospace',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Top bar — like an OS menubar ── */}
      <div className="obs-top-bar" style={{
        background: '#0a1628',
        borderBottom: '1px solid rgba(0,212,255,0.12)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.08em' }}>
            vetrivel@portfolio:~/observatory$
          </span>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none',
            color: '#4a5568', fontFamily: 'Space Mono',
            fontSize: '12px', cursor: 'pointer',
            transition: 'color 0.2s', letterSpacing: '0.05em',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
          onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
        >
          ← home
        </button>
      </div>

      <div style={{
        flex: 1,
        maxWidth: '960px',
        width: '100%',
        margin: '0 auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '24px',
      }}>
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
}
