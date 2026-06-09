export const projects = [
  {
    slug: 'website-classifier',
    title: "Website Classifier",
    badge: "MACHINE LEARNING",
    metric: "87% Accuracy · 2s Response Time",
    desc: "Developed a multi-class website content classifier using NLP and ensemble ML methods. Processes raw HTML, extracts TF-IDF features, and classifies pages into 8 categories with sub-2-second inference time.",
    tech: ["Python", "Scikit-Learn", "NLP", "Random Forests", "TF-IDF", "BeautifulSoup"],
    achievement: "Achieved 87% classification accuracy across 8 content categories, with real-time inference under 2 seconds per URL.",
    color: "#a855f7",
    delay: "0ms"
  },
  {
    slug: 'product-market-analysis',
    title: "Market Analysis ETL",
    badge: "DATA ENGINEERING",
    metric: "500+ products processed in <2 min",
    desc: "Built a full ETL pipeline scraping 500+ product listings across e-commerce platforms, transforming raw HTML into structured PostgreSQL tables, and surfacing pricing intelligence through automated dashboards.",
    tech: ["PostgreSQL", "SQL", "ETL Pipelines", "Selenium", "BeautifulSoup", "Pandas"],
    achievement: "Discovered 15% pricing margin opportunities through automated competitive analysis across 3 platforms.",
    color: "#00d4ff",
    delay: "150ms"
  },
  {
    slug: 'women-safety-sos',
    title: "Women Safety SOS",
    badge: "SOFTWARE DEVELOPMENT",
    metric: "<4s Alert Delivery · Multi-channel",
    desc: "Built a real-time emergency alert system with multi-channel notification fallback (SMS, email, WhatsApp). Features sub-4-second delivery SLA with TypeScript frontend and Flask backend REST APIs.",
    tech: ["Python", "Flask", "TypeScript", "React", "REST APIs", "Twilio"],
    achievement: "Achieved sub-4-second emergency alert delivery with 99.2% delivery rate across 3 notification channels.",
    color: "#fbbf24",
    delay: "300ms"
  }
];
