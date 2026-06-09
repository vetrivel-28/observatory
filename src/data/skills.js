export const skills = [
  {
    slug: 'machine-learning',
    id: 'ML',
    domain: "Machine Learning",
    project: "Website Classifier",
    outcome: "87% Accuracy",
    tags: ["Python", "Scikit-Learn", "NLP", "Random Forests", "Pandas", "NumPy"],
    iconName: "brain",
    color: "#a855f7",
    filename: "ml_skills.py",
    perf: 87,
    evidence: "Built and deployed a multi-class NLP text classification model that categorizes raw HTML content into 8 distinct industry categories.",
    learningJourney: "Started with basic linear regressions in scikit-learn. Progressed to understanding TF-IDF vectorization for text data. Explored ensemble methods (Random Forests) to improve variance. Currently exploring PyTorch for deep learning architectures.",
    projectsUsing: [
      { name: "Website Classifier", slug: "website-classifier" },
      { name: "Predictive Maintenance Simulator", slug: "predictive-maintenance" }
    ]
  },
  {
    slug: 'data-engineering',
    id: 'Data Eng',
    domain: "Data Engineering",
    project: "Market Analysis ETL",
    outcome: "500+ products <2 min",
    tags: ["PostgreSQL", "SQL", "Selenium", "BeautifulSoup", "Airflow", "AWS S3"],
    iconName: "database",
    color: "#00d4ff",
    filename: "data_eng.sql",
    perf: 92,
    evidence: "Designed an automated ETL pipeline that scrapes distributed e-commerce platforms, sanitizes the data using Pandas, and loads it into a PostgreSQL relational database.",
    learningJourney: "Initially struggled with messy, unstructured web data. Learned to write robust XPath selectors and handle dynamic JS via Selenium. Mastered SQL for complex aggregations and joins to derive business value from the raw data.",
    projectsUsing: [
      { name: "Market Analysis ETL", slug: "product-market-analysis" }
    ]
  },
  {
    slug: 'software-dev',
    id: 'Software',
    domain: "Software Dev",
    project: "Women Safety SOS",
    outcome: "<4s Alert Delivery",
    tags: ["Python", "Flask", "TypeScript", "React", "Node.js", "Docker"],
    iconName: "code",
    color: "#a855f7",
    filename: "software_dev.ts",
    perf: 76,
    evidence: "Developed a full-stack PWA with a React/TypeScript frontend and a Python/Flask REST API backend. Implemented asynchronous task queues using Celery.",
    learningJourney: "Transitioned from writing isolated scripts to building structured API architectures. Learned React to build interactive client-side interfaces. Gained experience in state management, component lifecycles, and responsive design.",
    projectsUsing: [
      { name: "Women Safety SOS", slug: "women-safety-sos" },
      { name: "Portfolio App", slug: "portfolio" }
    ]
  },
  {
    slug: 'analytics',
    id: 'Analytics',
    domain: "Analytics",
    project: "Intelligence Dashboards",
    outcome: "Discovered 15% margins",
    tags: ["Pandas", "Matplotlib", "Plotly", "Streamlit", "Tableau"],
    iconName: "chart",
    color: "#fbbf24",
    filename: "analytics.ipynb",
    perf: 80,
    evidence: "Analyzed millions of rows of pricing data to discover a 15% pricing arbitrage opportunity across competitors. Built interactive Streamlit dashboards for stakeholders.",
    learningJourney: "Started with basic Excel pivot tables. Quickly moved to Pandas for programmatic data manipulation. Learned the principles of data visualization using Matplotlib and Plotly to effectively communicate complex statistical insights.",
    projectsUsing: [
      { name: "Market Analysis ETL", slug: "product-market-analysis" }
    ]
  }
];
