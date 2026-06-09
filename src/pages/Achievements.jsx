import { useState } from 'react';

const achievements = [
  {
    title: 'University Capstone Project Showcase',
    date: 'MAY 2025',
    badge: 'EXCELLENCE AWARD WINNER',
    badgeColor: '#a855f7', // Purple // Gold
    role: 'Lead Machine Learning Engineer',
    description: 'AI-driven accessibility tool translating sign language to audio using edge-deployed computer vision. Selected as top project out of 50+ engineering teams.',
    technologies: ['Python', 'TensorFlow Lite', 'MediaPipe', 'React Native'],
    keyLearning: 'Optimizing ML models for edge devices requires heavy quantization and pruning. Real-time inference on mobile devices is heavily bottlenecked by thermal throttling.',
    icon: '🏆',
  },
  {
    title: 'Kaggle Tabular Playground Series',
    date: 'AUG 2024',
    badge: 'TOP 5% FINISH',
    badgeColor: '#00d4ff',
    role: 'Data Analyst & Modeler',
    description: 'Analyzed complex anonymized dataset to predict multi-class probabilities. Engineered custom interaction features to boost LightGBM performance against 1,000+ competitors.',
    technologies: ['Pandas', 'Scikit-Learn', 'LightGBM', 'Optuna'],
    keyLearning: 'Feature engineering often provides more lift than complex model ensembles. Cross-validation strategies must meticulously mirror the test set distribution.',
    icon: '🥈',
  },
  {
    title: 'ACM Student Chapter Hackathon',
    date: 'MAR 2023',
    badge: 'BEST UI/UX AWARD',
    badgeColor: '#a855f7', // Purple
    role: 'Full-Stack Developer',
    description: 'Built a peer-to-peer tutoring marketplace platform focusing on zero-friction onboarding flow and algorithmic matching based on subject competency.',
    technologies: ['Next.js', 'Tailwind CSS', 'Firebase', 'TypeScript'],
    keyLearning: 'Aesthetic design directly correlates with user trust. Minimizing clicks to the core value proposition drastically improved user retention metrics.',
    icon: '⭐',
  },
];

export default function Achievements() {
  const { navigate } = useContext(NavigationContext);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="page-content" style={{
      minHeight: '100vh',
      background: '#050911',
      padding: '60px 24px 80px',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      {/* Back button - top left */}
      <button
        className="back-btn"
        onClick={() => navigate('observatory')}
        style={{
          background: 'none',
          border: 'none',
          color: '#8892a4',
          fontSize: '14px',
          cursor: 'pointer',
          fontFamily: 'Space Mono, monospace',
          marginBottom: '40px',
          display: 'block',
          padding: 0,
        }}
      >
        ← Back to Observatory
      </button>

      {/* Page title */}
      <h1 className="page-title" style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '2.5rem',
        color: '#e8eef5',
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        Hackathons & Awards
      </h1>
      <p style={{
        color: '#4a5568',
        textAlign: 'center',
        fontSize: '15px',
        marginBottom: '64px',
      }}>
        A timeline of competitive programming, hackathons, and industry challenges.
      </p>

      {/* Timeline container */}
      <div className="timeline-container" style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
      }}>

        {/* Center vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, #a855f7 0%, #00d4ff 50%, #fbbf24 100%)',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }} />

        {achievements.map((item, index) => {
          const isRight = index % 2 !== 0; // Odd entries on right, Even on left as requested // 0→right, 1→left, 2→right
          const isExpanded = expanded === index;

          return (
            <div
              className="timeline-entry"
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: isRight ? 'flex-end' : 'flex-start',
                marginBottom: '72px',
                paddingLeft: isRight ? 0 : 0,
              }}
            >
              {/* ── Timeline node (sits exactly on center line) ── */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '16px',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}>
                {/* Date ABOVE icon */}
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: item.badgeColor,
                  letterSpacing: '0.12em',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  marginBottom: '4px',
                }}>
                  {item.date}
                </div>

                {/* Icon circle */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: item.badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  boxShadow: `0 0 20px ${item.badgeColor}60, 0 0 40px ${item.badgeColor}20`,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
              </div>

              {/* ── Card ── */}
              <div
                className="achievement-card"
                style={{
                  width: 'calc(50% - 72px)',
                  background: 'rgba(15, 25, 41, 0.95)',
                  border: `1px solid ${item.badgeColor}30`,
                  borderLeft: isRight
                    ? `1px solid ${item.badgeColor}30`
                    : `4px solid ${item.badgeColor}`,
                  borderRight: isRight
                    ? `4px solid ${item.badgeColor}`
                    : `1px solid ${item.badgeColor}30`,
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  marginTop: '8px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Title */}
                <h3 style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#e8eef5',
                  marginBottom: '10px',
                  lineHeight: '1.4',
                }}>
                  {item.title}
                </h3>

                {/* Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  background: `${item.badgeColor}20`,
                  border: `1px solid ${item.badgeColor}50`,
                  borderRadius: '4px',
                  color: item.badgeColor,
                  fontSize: '10px',
                  fontFamily: 'Space Mono, monospace',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}>
                  {item.badge}
                </div>

                {/* Role */}
                <div style={{
                  color: '#8892a4',
                  fontSize: '13px',
                  fontFamily: 'Space Mono, monospace',
                  marginBottom: '12px',
                }}>
                  {item.role}
                </div>

                {/* Description — NO date here */}
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '14px',
                  lineHeight: '1.65',
                  marginBottom: '16px',
                }}>
                  {item.description}
                </p>

                {/* Tech tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '14px',
                }}>
                  {item.technologies.map(tech => (
                    <span key={tech} style={{
                      padding: '3px 8px',
                      background: `${item.badgeColor}15`,
                      border: `1px solid ${item.badgeColor}30`,
                      borderRadius: '4px',
                      color: '#e8eef5',
                      fontSize: '11px',
                      fontFamily: 'Space Mono, monospace',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Learning expandable */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: item.badgeColor,
                    fontSize: '11px',
                    fontFamily: 'Space Mono, monospace',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                    padding: 0,
                    marginBottom: isExpanded ? '10px' : 0,
                  }}
                >
                  {isExpanded ? '▼' : '▶'} KEY LEARNING
                </button>

                {isExpanded && (
                  <p style={{
                    color: '#8892a4',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    paddingLeft: '12px',
                    borderLeft: `2px solid ${item.badgeColor}50`,
                    marginTop: '6px',
                  }}>
                    {item.keyLearning}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
