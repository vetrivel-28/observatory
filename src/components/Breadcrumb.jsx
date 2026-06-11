import React, { useContext } from 'react';
import { NavigationContext } from '../App';

export default function Breadcrumb({ items }) {
  const { navigate } = useContext(NavigationContext);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'Space Mono, monospace',
      fontSize: '12px',
      marginBottom: '24px',
      padding: '0',
    }}>
      {items.map((item, index) => (
        <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {index > 0 && (
            <span style={{ color: '#2d3748' }}>/</span>
          )}
          {item.page ? (
            <span
              onClick={() => navigate(`/${item.page === 'home' ? '' : item.page === 'observatory' ? 'observatory' : 'observatory/' + item.page}`.replace('//', '/'))}
              style={{
                color: '#4a5568',
                cursor: 'pointer',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
              onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
            >
              {item.label}
            </span>
          ) : (
            <span style={{ color: '#00d4ff' }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
