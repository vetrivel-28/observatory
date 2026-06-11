import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p);

  let currentLink = '';

  return (
    <div className="breadcrumbs" style={{
      fontFamily: 'Space Mono', fontSize: '12px', color: '#64748b',
      marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center'
    }}>
      <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }} className="hover-lift">Home</Link>
      {paths.map((path, index) => {
        currentLink += `/${path}`;
        // Format path: convert hyphens to spaces and capitalize
        const formattedPath = path.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        const isLast = index === paths.length - 1;

        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isLast ? (
              <span style={{ color: '#00d4ff' }}>{formattedPath}</span>
            ) : (
              <Link to={currentLink} style={{ color: '#94a3b8', textDecoration: 'none' }} className="hover-lift">
                {formattedPath}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
