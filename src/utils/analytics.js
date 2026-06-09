export const trackEvent = (eventName, eventData = {}) => {
  // In a real application, this would send data to Google Analytics or Plausible
  // Example: window.plausible(eventName, { props: eventData });
  // Example: window.gtag('event', eventName, eventData);
  
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData
  };
  
  // Log to console for development verification
  console.log(`[Analytics Tracked] ${eventName}`, payload);
};

export const AnalyticsEvents = {
  RESUME_DOWNLOAD: 'resume_download',
  PROJECT_VIEW: 'project_view',
  SKILL_VIEW: 'skill_view',
  CONTACT_CLICK: 'contact_click',
  LINKEDIN_CLICK: 'linkedin_click',
  GITHUB_CLICK: 'github_click',
  LEETCODE_CLICK: 'leetcode_click'
};
