import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ReadingProgressBar from '../components/ReadingProgressBar';
import ProjectMedia from '../components/ProjectMedia';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';

function AccordionSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return (
      <section>
        <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'Space Mono', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>{title}</h2>
        {children}
      </section>
    );
  }

  return (
    <section className="mobile-accordion-section" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <button
        className="touch-target"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', padding: '16px', background: 'transparent', border: 'none',
          color: 'white', fontSize: '1.1rem', fontFamily: 'Space Mono', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          margin: 0
        }}
      >
        <span>{title}</span>
        <span style={{ color: 'var(--accent-cyan)' }}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 16px 16px' }}>
          {children}
        </div>
      )}
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    
    if (slug) {
      trackEvent(AnalyticsEvents.PROJECT_VIEW, { project_slug: slug });
    }
  }, [slug]);

  const project = projects.find(p => p.slug === slug);
  
  // Previous/Next Logic
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center', fontFamily: 'Space Mono' }}>
        <SEO title="Project Not Found" />
        <h2>404 - Project Not Found</h2>
        <button onClick={() => navigate('/observatory/projects')} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '4px', cursor: 'pointer' }}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in page-container" style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease',
      padding: '0', maxWidth: '900px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif'
    }}>
      <SEO 
        title={project.title} 
        description={project.desc} 
        image={project.media?.[0]?.src}
        type="project"
        schemaData={project}
      />
      <ReadingProgressBar />
      <Breadcrumb items={[
        {label: 'Home', page: 'home'},
        {label: 'Observatory', page: 'observatory'},
        {label: 'Projects', page: 'projects'},
        {label: project.title, page: null}
      ]} />

      <button 
        className="clickable hover-lift"
        onClick={() => navigate('/observatory/projects')}
        style={{
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: '1rem',
          marginBottom: '20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'Space Mono'
        }}
      >
        <span>←</span> Back to Projects
      </button>

      <div className="glass-panel terminal-card" style={{
        borderTop: `5px solid ${project.color}`,
        borderRadius: '12px', padding: '40px',
        marginBottom: '40px'
      }}>
        {/* Header Section */}
        <div className="section-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div>
            <h1 className="page-title" style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold', fontFamily: 'Space Mono, monospace', margin: '0 0 12px 0', lineHeight: 1.2 }}>
              {project.title}
            </h1>
            <div className="metric-text" style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {project.metric}
            </div>
          </div>
          <div style={{
            padding: '6px 12px', background: `${project.color}20`,
            color: project.color, border: `1px solid ${project.color}40`,
            borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
            letterSpacing: '0.05em', textTransform: 'uppercase'
          }}>
            {project.badge}
          </div>
        </div>

        {/* Case Study Scoring Badges */}
        {project.scores && (
          <div className="section-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {Object.entries(project.scores).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'Space Mono' }}>{key}</span>
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Hero Media */}
        {project.media && project.media[0] && (
          <ProjectMedia src={project.media[0].src} caption={project.media[0].caption} alt={project.title} />
        )}

        {/* 13-Point Professional Engineering Case Study Framework */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '40px' }}>
          
          <AccordionSection title="1. Problem Statement">
            <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{project.problemStatement || project.desc}</p>
          </AccordionSection>

          <AccordionSection title="2. Business Objective">
            <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{project.businessObjective}</p>
          </AccordionSection>

          <AccordionSection title="3. Dataset / Input Sources">
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>{project.dataset}</p>
            </div>
          </AccordionSection>

          <AccordionSection title="4. Solution Architecture">
            <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{project.architecture}</p>
          </AccordionSection>

          <AccordionSection title="5. Technology Selection Rationale">
            <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{project.techSelection}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
              {project.tech.map(t => (
                <span key={t} className="hover-lift" style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: 'white', fontSize: '14px',
                  borderRadius: '6px', padding: '6px 16px',
                  cursor: 'default'
                }}>
                  {t}
                </span>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="6. Workflow Diagram">
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              {project.workflow.split('\n').map((step, i) => (
                <div key={i} style={{ color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'Space Mono', fontSize: '0.95rem' }}>
                  {step}
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="7 & 8. Challenges Faced & Lessons Learned">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.05)', borderLeft: '3px solid var(--accent-amber)', padding: '20px', borderRadius: '0 8px 8px 0' }}>
                <h3 className="card-heading" style={{ color: 'var(--accent-amber)', fontSize: '1rem', marginBottom: '8px', fontFamily: 'Space Mono' }}>Challenges</h3>
                <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{project.challenges}</p>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderLeft: '3px solid var(--accent-green)', padding: '20px', borderRadius: '0 8px 8px 0' }}>
                <h3 className="card-heading" style={{ color: 'var(--accent-green)', fontSize: '1rem', marginBottom: '8px', fontFamily: 'Space Mono' }}>Lessons Learned</h3>
                <p className="body-text" style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{project.lessonsLearned}</p>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="9 & 10. Results & Measurable Impact">
            <div style={{ borderLeft: `3px solid var(--accent-cyan)`, background: 'rgba(0,212,255,0.05)', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <p className="body-text" style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '16px' }}>
                {project.results}
              </p>
              <div style={{ fontStyle: 'italic', color: 'var(--accent-cyan)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                " {project.measurableImpact || project.achievement} "
              </div>
            </div>
          </AccordionSection>

        </div>

        {/* 11, 12, 13. Project Links */}
        <div style={{ marginTop: '50px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {project.links?.repository && (
            <button 
              className="clickable hover-glow-purple"
              onClick={() => {
                trackEvent(AnalyticsEvents.GITHUB_CLICK, { project: project.slug });
                window.open(project.links.repository, "_blank");
              }}
              style={{
                padding: '12px 24px', border: `1px solid ${project.color}`,
                borderRadius: '6px', background: 'transparent',
                color: project.color, fontSize: '14px',
                fontFamily: 'Space Mono, monospace', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              &lt;&gt; View Code Repository
            </button>
          )}
          
          {project.links?.article && (
            <button 
              className="clickable hover-lift"
              onClick={() => window.open(project.links.article, "_blank")}
              style={{
                padding: '12px 24px', border: `1px solid rgba(255,255,255,0.2)`,
                borderRadius: '6px', background: 'rgba(255,255,255,0.05)',
                color: '#e8eef5', fontSize: '14px',
                fontFamily: 'Space Mono, monospace', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              📝 View Article
            </button>
          )}

          {project.links?.demo && (
            <button 
              className="clickable hover-lift"
              onClick={() => window.open(project.links.demo, "_blank")}
              style={{
                padding: '12px 24px', border: `1px solid rgba(255,255,255,0.2)`,
                borderRadius: '6px', background: 'transparent',
                color: '#8892a4', fontSize: '14px',
                fontFamily: 'Space Mono, monospace', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              ↗ Live Demo
            </button>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', marginTop: '60px', paddingBottom: '40px' }}>
        <h3 style={{ color: 'white', fontFamily: 'Space Mono', marginBottom: '24px', textAlign: 'center' }}>Continue Exploring</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {prevProject && (
            <div 
              className="glass-card terminal-card hover-lift clickable"
              onClick={() => navigate(`/observatory/projects/${prevProject.slug}`)}
              role="button"
              tabIndex={0}
              style={{ padding: '24px', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'Space Mono', marginBottom: '8px' }}>← Previous Project</div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>{prevProject.title}</div>
            </div>
          )}
          {nextProject && (
            <div 
              className="glass-card terminal-card hover-lift clickable"
              onClick={() => navigate(`/observatory/projects/${nextProject.slug}`)}
              style={{ padding: '24px', cursor: 'pointer', textAlign: 'right' }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'Space Mono', marginBottom: '8px' }}>Next Project →</div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>{nextProject.title}</div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
