import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p);

  return (
    <div className="breadcrumbs" style={{
      fontFamily: 'Space Mono', fontSize: '12px', color: '#64748b',
      marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center'
    }}>
      <span style={{ color: '#94a3b8' }}>Home</span>
      {paths.map((path, index) => {
        // Format path: convert hyphens to spaces and capitalize
        const formattedPath = path.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        const isLast = index === paths.length - 1;

        return (
          <React.Fragment key={path}>
            <span>/</span>
            <span style={{ color: isLast ? '#00d4ff' : '#94a3b8' }}>
              {formattedPath}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
