import React from 'react';
import { NavigationContext } from '../App';
import SEO from './SEO';

export default function NotFound() {
  const { navigate } = React.useContext(NavigationContext) || { navigate: () => window.location.href = '/' };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)',
      color: 'white', fontFamily: 'Space Mono'
    }}>
      <SEO title="404 Not Found" />
      <h1 style={{ fontSize: '5rem', color: 'var(--accent-cyan)', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '32px' }}>Page not found in the observatory.</p>
      <button 
        className="hover-lift"
        onClick={() => navigate('/')}
        style={{
          padding: '12px 24px', background: 'transparent',
          color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)',
          borderRadius: '6px', cursor: 'pointer', fontFamily: 'Space Mono'
        }}
      >
        Return to Base
      </button>
    </div>
  );
}
