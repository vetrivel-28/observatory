import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { skills } from '../data/skills';
import { NavigationContext } from '../App';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';
import SkillDetailLayout from '../components/SkillDetailLayout';

export default function SkillDetail() {
  const { slug } = useParams();
  const { navigate } = useContext(NavigationContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    
    if (slug) {
      trackEvent(AnalyticsEvents.SKILL_VIEW, { skill_slug: slug });
    }
  }, [slug]);

  const skill = skills.find(s => s.slug === slug);

  if (!skill) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center', fontFamily: 'Space Mono' }}>
        <SEO title="Skill Not Found" />
        <h2>404 - Skill Not Found</h2>
        <button onClick={() => navigate('/observatory/skills')} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '4px', cursor: 'pointer' }}>
          Back to Skills
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease',
      padding: '0', maxWidth: '840px', margin: '0 auto', fontFamily: 'DM Sans, sans-serif'
    }}>
      <SEO 
        title={`${skill.domain} Expertise | Vetrivel A`} 
        description={`Detailed overview and learning journey of applied ${skill.domain} capabilities.`} 
        type="website"
      />

      <Breadcrumb items={[
        {label: 'Home', page: 'home'},
        {label: 'Observatory', page: 'observatory'},
        {label: 'Skills', page: 'skills'},
        {label: skill.domain, page: null}
      ]} />

      <button 
        className="clickable hover-lift"
        onClick={() => navigate('/observatory/skills')}
        style={{
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: '1rem',
          marginBottom: '20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'Space Mono'
        }}
      >
        <span>←</span> Back to Skills
      </button>

      <SkillDetailLayout skill={skill} />
    </div>
  );
}
