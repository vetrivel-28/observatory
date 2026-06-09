import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)',
          color: 'white', fontFamily: 'Space Mono', padding: '20px', textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '3rem', color: '#ff5f57', margin: '0 0 16px 0' }}>System Fault</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>A critical error occurred while rendering this interface.</p>
          <pre style={{ background: 'rgba(255,0,0,0.1)', padding: '16px', borderRadius: '8px', color: '#ff5f57', fontSize: '12px', maxWidth: '600px', overflowX: 'auto', marginBottom: '32px' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            className="hover-lift"
            onClick={() => window.location.href = '/'}
            style={{
              padding: '12px 24px', background: 'transparent',
              color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)',
              borderRadius: '6px', cursor: 'pointer', fontFamily: 'Space Mono'
            }}
          >
            Reboot System (Return to Home)
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}
