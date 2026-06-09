export const projects = [
  {
    slug: 'website-classifier',
    order: 1,
    title: "Website Classifier",
    badge: "MACHINE LEARNING",
    metric: "87% Accuracy · 2s Response Time",
    desc: "Developed a multi-class website content classifier using NLP and ensemble ML methods. Processes raw HTML, extracts TF-IDF features, and classifies pages into 8 categories with sub-2-second inference time.",
    tech: ["Python", "Scikit-Learn", "NLP", "Random Forests", "TF-IDF", "BeautifulSoup"],
    achievement: "Achieved 87% classification accuracy across 8 content categories, with real-time inference under 2 seconds per URL.",
    color: "#a855f7",
    delay: "0ms",
    
    // Case Study Scoring System
    scores: {
      complexity: "High Complexity",
      impact: "High Impact",
      scope: "Full Stack ML",
      status: "Production Ready"
    },
    
    media: [
      { type: 'screenshot', src: '/assets/website-classifier.png', caption: 'Website Classifier Results Dashboard' }
    ],

    architecture: "The system is built on a microservices architecture. A Python/Flask backend receives URLs, scrapes the raw HTML using BeautifulSoup, and cleans the text. The cleaned text is transformed using a pre-trained TF-IDF vectorizer and passed to an ensemble model (Random Forest + SVM) for classification.",
    workflow: "1. User submits URL via REST API.\n2. Scraper fetches raw HTML.\n3. NLP pipeline removes tags, stop words, and tokenizes.\n4. TF-IDF vectorization.\n5. Model inference assigns confidence scores to 8 categories.\n6. JSON response returned to frontend dashboard.",
    results: "The classifier achieved an 87% F1-score on a testing set of 10,000 domains. Latency was kept under 2 seconds per request, allowing real-time processing.",
    challenges: "Handling heavily dynamic, JavaScript-rendered websites was a major challenge since BeautifulSoup only parses static HTML. We had to implement a lightweight headless browser fallback for specific domains.",
    lessonsLearned: "Learned how to balance model complexity with inference speed. A Deep Learning approach (BERT) was prototyped but deemed too slow for the 2-second SLA without GPU infrastructure.",
    futureImprovements: "Migrating the scraper to use Playwright for better JS rendering, and exploring lightweight transformers (DistilBERT) for improved contextual understanding."
  },
  {
    slug: 'product-market-analysis',
    order: 2,
    title: "Market Analysis ETL",
    badge: "DATA ENGINEERING",
    metric: "500+ products processed in <2 min",
    desc: "Built a full ETL pipeline scraping 500+ product listings across e-commerce platforms, transforming raw HTML into structured PostgreSQL tables, and surfacing pricing intelligence through automated dashboards.",
    tech: ["PostgreSQL", "SQL", "ETL Pipelines", "Selenium", "BeautifulSoup", "Pandas"],
    achievement: "Discovered 15% pricing margin opportunities through automated competitive analysis across 3 platforms.",
    color: "#00d4ff",
    delay: "150ms",
    
    scores: {
      complexity: "Medium Complexity",
      impact: "High Business Value",
      scope: "Data Pipeline",
      status: "Deployed"
    },

    media: [
      { type: 'architecture', src: '/assets/product-market-analysis.png', caption: 'Data Engineering Pipeline Architecture' }
    ],

    architecture: "A distributed scraping architecture using Selenium grid clusters to fetch pricing data concurrently. Raw data is dumped into AWS S3, processed via Pandas scripts on EC2, and loaded into an RDS PostgreSQL database.",
    workflow: "1. Cron job triggers scraping cluster.\n2. Selenium agents navigate 3 distinct e-commerce platforms.\n3. Raw HTML is parsed and semi-structured data is extracted.\n4. Pandas cleanses prices, normalizes product names, and handles missing values.\n5. Data is UPSERTed into PostgreSQL.\n6. Metabase dashboard refreshes.",
    results: "The pipeline reliably processes over 500 product listings in under 2 minutes daily, maintaining a 99% uptime and zero data corruption.",
    challenges: "E-commerce platforms frequently update their DOM structures and implement anti-bot measures. Maintaining the XPath selectors and managing IP rotation were significant hurdles.",
    lessonsLearned: "Gained deep experience in building resilient, self-healing web scrapers and implementing robust retry mechanisms in ETL pipelines.",
    futureImprovements: "Implement Airflow for better DAG scheduling and alerting, and use dbt for in-database transformations."
  },
  {
    slug: 'women-safety-sos',
    order: 3,
    title: "Women Safety SOS",
    badge: "SOFTWARE DEVELOPMENT",
    metric: "<4s Alert Delivery · Multi-channel",
    desc: "Built a real-time emergency alert system with multi-channel notification fallback (SMS, email, WhatsApp). Features sub-4-second delivery SLA with TypeScript frontend and Flask backend REST APIs.",
    tech: ["Python", "Flask", "TypeScript", "React", "REST APIs", "Twilio"],
    achievement: "Achieved sub-4-second emergency alert delivery with 99.2% delivery rate across 3 notification channels.",
    color: "#fbbf24",
    delay: "300ms",

    scores: {
      complexity: "High Complexity",
      impact: "Critical Impact",
      scope: "Full Stack",
      status: "Beta Testing"
    },

    media: [
      { type: 'screenshot', src: '/assets/women-safety-sos.png', caption: 'Emergency SOS Live Dashboard' }
    ],

    architecture: "A React/TypeScript PWA frontend captures geolocation data and triggers a REST API endpoint. The Flask backend queues the alert in Redis, and Celery workers asynchronously dispatch notifications via Twilio (SMS/WhatsApp) and SendGrid (Email).",
    workflow: "1. User triggers SOS via PWA button or hardware shortcut.\n2. Device GPS coordinates are captured.\n3. API request hits Flask backend.\n4. Backend concurrently fires Twilio SMS, WhatsApp, and Email APIs to pre-configured emergency contacts.\n5. Live tracking link is generated and shared.",
    results: "Load testing proved the system can handle 1,000 concurrent SOS triggers while maintaining a sub-4-second delivery time for the first SMS notification.",
    challenges: "Ensuring accurate GPS coordinates on low-end mobile devices and handling poor network connectivity. Implemented offline queueing using Service Workers.",
    lessonsLearned: "Learned the critical importance of asynchronous task queues (Celery/Redis) to prevent blocking the main thread during external API calls.",
    futureImprovements: "Integrate WebSocket connections for real-time location streaming instead of periodic polling."
  }
];
