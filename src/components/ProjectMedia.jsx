import React, { useState } from 'react';

export default function ProjectMedia({ src, alt, caption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div 
        className="card"
        style={{
          width: '100%',
          margin: '24px 0',
          cursor: 'zoom-in',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          position: 'relative'
        }}
        onClick={() => setIsOpen(true)}
      >
        {!isLoaded && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', fontFamily: 'Space Mono', fontSize: '12px'
          }}>
            Loading media...
          </div>
        )}
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {caption && (
          <div style={{
            padding: '12px',
            background: 'rgba(11, 16, 32, 0.9)',
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            fontFamily: 'Space Mono',
            fontSize: '11px',
            textAlign: 'center'
          }}>
            {caption}
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(5, 9, 17, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', cursor: 'zoom-out'
          }}
          onClick={() => setIsOpen(false)}
        >
          <img 
            src={src} 
            alt={alt} 
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              boxShadow: '0 0 50px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              animation: 'scaleDownFadeOut 0.3s reverse forwards' // uses App.css animation
            }} 
          />
        </div>
      )}
    </>
  );
}
