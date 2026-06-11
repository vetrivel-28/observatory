export const projects = [
  {
    slug: 'website-classifier',
    order: 1,
    title: "Enterprise Website Classifier",
    badge: "MACHINE LEARNING",
    metric: "87% Accuracy · 2s Response Time",
    desc: "A high-performance multi-class website content classifier using NLP and ensemble ML methods. Designed to categorize unseen URLs into predefined taxonomy in real-time.",
    tech: ["Python", "Scikit-Learn", "FastAPI", "Random Forests", "TF-IDF", "BeautifulSoup"],
    achievement: "Processed 10,000+ domains with 87% accuracy and sub-2-second latency.",
    color: "#a855f7",
    delay: "0ms",
    mediumUrl: "https://medium.com/@vetrivel-a/enterprise-website-classifier",
    
    scores: {
      complexity: "High Complexity",
      impact: "High Impact",
      scope: "Full Stack ML",
      status: "Production Ready"
    },
    
    media: [
      { type: 'screenshot', src: '/assets/website-classifier.png', caption: 'Classification Inference Dashboard' }
    ],

    // 13-Point Framework
    problemStatement: "Content aggregation platforms struggle to accurately categorize thousands of new URLs submitted daily. Manual categorization is unscalable, and generic APIs lack the domain-specific taxonomy required by the business.",
    businessObjective: "Automate the URL categorization pipeline to reduce manual tagging hours by 95% while maintaining an accuracy threshold above 85% with an SLA of <2 seconds per request.",
    dataset: "Custom dataset compiled by scraping 25,000 domains across 8 target categories (e.g., E-commerce, Blog, Corporate). Data underwent rigorous cleaning to remove boilerplate HTML, tracking scripts, and navigation links.",
    architecture: "A microservices architecture built on FastAPI. A scraping worker fetches HTML using BeautifulSoup/Playwright. A preprocessing pipeline applies text normalization, tokenization, and TF-IDF vectorization. Inference is handled by an optimized Random Forest + SVM ensemble model.",
    techSelection: "Python & Scikit-Learn were chosen for their robust NLP ecosystem. FastAPI was selected over Flask for its asynchronous capabilities, crucial for handling concurrent I/O bound scraping requests. Random Forest was chosen over Deep Learning (e.g., BERT) to strictly meet the <2s latency SLA without requiring expensive GPU compute.",
    workflow: "1. Client submits URL via REST endpoint.\n2. Async scraper fetches raw DOM.\n3. Content extractor strips boilerplate and returns core text.\n4. Text is transformed via pre-trained TF-IDF vectorizer.\n5. Ensemble model generates probability distribution across 8 classes.\n6. Top prediction and confidence score returned as JSON.",
    challenges: "Handling modern SPA (Single Page Applications) that rely heavily on JavaScript rendering. BeautifulSoup alone returned empty payloads for React/Vue sites.",
    lessonsLearned: "Implementing a dual-scraping strategy (static HTTP requests first, falling back to headless Playwright on failure) provided the best balance between latency and content extraction success rates.",
    results: "Achieved an 87% macro F1-score on a hold-out test set of 5,000 domains.",
    measurableImpact: "Reduced manual URL categorization time from an average of 45 seconds per URL to 1.8 seconds. Estimated operational savings of 200+ hours per month.",
    
    links: {
      repository: "https://github.com/vetrivel-28",
      article: "https://medium.com/@vetrivel-a",
      demo: "#"
    }
  },
  {
    slug: 'product-market-analysis',
    order: 2,
    title: "Market Intelligence ETL",
    badge: "DATA ENGINEERING",
    metric: "500+ products/day · Zero Data Loss",
    desc: "A robust distributed ETL pipeline that scrapes, normalizes, and loads pricing intelligence from major e-commerce platforms into a central data warehouse.",
    tech: ["PostgreSQL", "SQL", "Selenium", "Pandas", "AWS S3", "Docker"],
    achievement: "Discovered 15% pricing margin opportunities through automated competitive analysis.",
    color: "#00d4ff",
    delay: "150ms",
    mediumUrl: "https://medium.com/@vetrivel-a/market-intelligence-etl",
    
    scores: {
      complexity: "Medium Complexity",
      impact: "High Business Value",
      scope: "Data Pipeline",
      status: "Deployed"
    },

    media: [
      { type: 'architecture', src: '/assets/product-market-analysis.png', caption: 'Data Engineering Pipeline Architecture' }
    ],

    // 13-Point Framework
    problemStatement: "Retail teams were spending hours manually checking competitor websites to adjust pricing strategies, leading to delayed reactions to market changes and lost revenue.",
    businessObjective: "Build an automated daily data pipeline to extract competitor pricing, normalize the data schema, and power a real-time BI dashboard for the pricing strategy team.",
    dataset: "Daily extraction of 500+ product listings across 3 major competitor platforms. Data includes price, stock status, ratings, and promotional tags.",
    architecture: "Distributed Selenium grid deployed via Docker. Raw HTML/JSON dumps are stored in AWS S3 (Data Lake). Pandas scripts on EC2 extract and normalize the data, loading it into an Amazon RDS PostgreSQL instance (Data Warehouse).",
    techSelection: "Selenium was required due to strict anti-bot mechanisms and dynamic content loading on target sites. PostgreSQL was chosen for its strong support for JSONB, allowing flexible storage of unpredictable product metadata.",
    workflow: "1. Cron scheduler triggers scraping orchestrator at 02:00 AM.\n2. Selenium agents navigate platforms using rotating proxies.\n3. Raw dumps pushed to S3.\n4. Transformation layer cleanses currency symbols, handles nulls, and standardizes SKUs.\n5. PostgreSQL UPSERT handles new/existing records.\n6. Connected BI tool refreshes views.",
    challenges: "Frequent DOM structure changes by competitors broke extraction logic. Aggressive IP blocking caused scraper timeouts.",
    lessonsLearned: "Abstracting the extraction logic from the scraping logic. By saving raw HTML to S3 first, we could re-run broken extraction scripts on historical data without needing to re-scrape the target site.",
    results: "Pipeline maintains 99% uptime, successfully processing over 15,000 records monthly with zero data corruption.",
    measurableImpact: "Enabled the business to identify a 15% pricing gap on key SKUs, leading to a dynamic pricing strategy that increased conversion rates by 8% in the first quarter.",
    
    links: {
      repository: "https://github.com/vetrivel-28",
      article: "https://medium.com/@vetrivel-a",
      demo: null
    }
  },
  {
    slug: 'women-safety-sos',
    order: 3,
    title: "Emergency SOS Distributed System",
    badge: "SOFTWARE ENGINEERING",
    metric: "<4s Alert Delivery · Multi-channel",
    desc: "A mission-critical emergency alert system with multi-channel notification fallback (SMS, email, WhatsApp) designed for high availability and low latency.",
    tech: ["Python", "Flask", "TypeScript", "React", "Redis", "Celery", "Twilio"],
    achievement: "Achieved sub-4-second emergency alert delivery with 99.2% delivery rate.",
    color: "#fbbf24",
    delay: "300ms",
    mediumUrl: "https://medium.com/@vetrivel-a/women-safety-sos",

    scores: {
      complexity: "High Complexity",
      impact: "Critical Impact",
      scope: "Full Stack Distributed",
      status: "Beta Testing"
    },

    media: [
      { type: 'screenshot', src: '/assets/women-safety-sos.png', caption: 'Emergency SOS Live Tracking Dashboard' }
    ],

    // 13-Point Framework
    problemStatement: "During emergencies, users cannot rely on a single communication channel (e.g., SMS) due to potential network congestion or gateway failures. Existing apps lacked resilient, multi-channel fallback mechanisms.",
    businessObjective: "Engineer a high-availability SOS system capable of broadcasting geolocation data across 3 distinct channels simultaneously, with a hard SLA of <4 seconds delivery.",
    dataset: "Simulated load testing dataset of 10,000 concurrent SOS triggers. Live geolocation data points streaming at 1Hz during active alerts.",
    architecture: "React/TypeScript PWA frontend capturing device GPS. Flask backend acts as the API gateway. Heavy API calls to Twilio (SMS/WhatsApp) and SendGrid (Email) are offloaded to Redis/Celery asynchronous worker queues.",
    techSelection: "Redis and Celery were strictly necessary to decouple the HTTP request/response cycle from the slow, synchronous third-party API calls, preventing gateway timeouts during high load.",
    workflow: "1. User triggers SOS via PWA.\n2. Device GPS coordinates are captured and sent to Flask API.\n3. API immediately returns 202 Accepted to user.\n4. Backend pushes notification jobs to Redis queue.\n5. Celery workers concurrently dispatch SMS, WhatsApp, and Email via external APIs.\n6. Live tracking link is generated and shared.",
    challenges: "Handling the 'thundering herd' problem during simulated mass-emergencies where thousands of requests hit the server simultaneously, causing database connection pool exhaustion.",
    lessonsLearned: "Implementing connection pooling (PgBouncer) and rate-limiting at the Nginx layer was crucial for system stability under extreme load.",
    results: "System successfully handled 1,000 concurrent SOS triggers during load testing. First notification delivery averaged 3.2 seconds.",
    measurableImpact: "Proved out a resilient architecture capable of 99.2% message delivery success rate, establishing a reliable technical foundation for production deployment.",
    
    links: {
      repository: "https://github.com/vetrivel-28",
      article: null,
      demo: "https://github.com/vetrivel-28"
    }
  }
];
