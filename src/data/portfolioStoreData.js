// Default portfolio collection based on Logeshwaran's exact schema
export const DEFAULT_PORTFOLIO_COLLECTION = {
  profile: {
    full_name: "LOGESHWARAN",
    title: "PHP Laravel Developer",
    summary: "Backend Developer with professional experience designing, building, and maintaining scalable web applications using PHP and the Laravel framework. Proven track record in engineering secure RESTful APIs, optimizing MySQL database performance, and integrating third-party systems. Adept at writing clean, maintainable code aligned with SOLID principles and handling version control workflows via Git. Blends a strong backend foundation with hands-on development in JavaScript and React.",
    email: "logeshwaran5887@gmail.com",
    phone: "+91 8072877253",
    location: "243 4th Street, Thilagarnagar, Anupparpalayam, Tirupur - 641652, Tamil Nadu, India",
    github_url: "https://github.com/logeshwaran",
    linkedin_url: "https://linkedin.com/in/logeshwaran"
  },
  experiences: [
    {
      company: "CHERAN SOFTWARES",
      role: "PHP Laravel Developer",
      location: "Tirupur, Tamil Nadu, India",
      start_date: "2024-11-01",
      end_date: "",
      is_current: 1,
      sort_order: 1,
      highlights: [
        "Architected scalable backend logic using Laravel and heavily optimized complex MySQL queries to reduce application load times by over 60%.",
        "Designed, developed, and documented clean RESTful APIs for cross-platform web and mobile consumers using Postman.",
        "Secured application endpoints by implementing robust authentication and authorization workflows via Laravel Sanctum/Passport (Bearer tokens, RBAC, Policy gates).",
        "Managed collaborative version control workflows with Git to ensure seamless code merging and conflict-free integration.",
        "Implemented automated background tasks and queue workers for asynchronous data processing and scheduled maintenance."
      ]
    },
    {
      company: "AWP GLOBAL SOLUTIONS",
      role: "Web Developer",
      location: "Tamil Nadu, India",
      start_date: "2024-02-01",
      end_date: "2024-08-31",
      is_current: 0,
      sort_order: 2,
      highlights: [
        "Developed responsive, dynamic user interface components leveraging Blade Templates, JavaScript, and Bootstrap.",
        "Contributed across the complete software development life cycle (SDLC), from initial database schema design to server deployment.",
        "Resolved critical application bugs and strengthened input security, CSRF protection, and form validation using JavaScript and PHP.",
        "Collaborated with cross-functional team members to deliver client web solutions on time."
      ]
    }
  ],
  skill_categories: [
    {
      name: "Backend",
      sort_order: 1,
      skills: [
        { name: "PHP (7.x/8.x)" },
        { name: "Laravel (10/11)" },
        { name: "RESTful APIs" },
        { name: "Sanctum" },
        { name: "Passport" }
      ]
    },
    {
      name: "Databases",
      sort_order: 2,
      skills: [
        { name: "MySQL 8.4" },
        { name: "Redis" },
        { name: "Database Schema Design" },
        { name: "Query Optimization" }
      ]
    },
    {
      name: "Frontend",
      sort_order: 3,
      skills: [
        { name: "JavaScript" },
        { name: "React 19" },
        { name: "Tailwind CSS" },
        { name: "Bootstrap" },
        { name: "Zustand" }
      ]
    },
    {
      name: "DevOps",
      sort_order: 4,
      skills: [
        { name: "Docker" },
        { name: "Docker Compose" },
        { name: "Nginx" },
        { name: "Git" },
        { name: "Postman" },
        { name: "XAMPP" }
      ]
    }
  ],
  projects: [
    {
      title: "NexERP",
      subtitle: "Multi-Branch Enterprise Resource Planning System",
      summary: "NexERP is an enterprise-grade ERP system engineered to solve complex operational challenges across multi-branch retail and warehouse organizations. Built with Laravel and modern React 19, the platform enforces strict multi-tenant database isolation, sub-second inventory lookups, automated double-entry stock reconciliation, and distributed asynchronous background processing.",
      architecture_notes: "Multi-tenant database isolation, Redis-backed queues and atomic locks, double-entry stock and accounting ledgers.",
      is_featured: 1,
      sort_order: 1,
      skills: [
        "Laravel (10/11)",
        "MySQL 8.4",
        "Redis",
        "React 19",
        "Docker"
      ]
    }
  ],
  educations: [
    {
      degree: "B.Sc. Information Technology",
      institution: "Kathir College of Arts and Science",
      location: "Coimbatore, Tamil Nadu",
      start_year: 2021,
      end_year: 2024
    }
  ],
  languages: [
    {
      name: "Tamil",
      proficiency: "Native"
    },
    {
      name: "English",
      proficiency: "Advanced"
    }
  ]
};

// Helper: Flatten nested JSON into Laravel bracket format e.g. profile[full_name]
export function buildLaravelFormData(obj, formData = new FormData(), parentKey = '') {
  if (obj === null || obj === undefined) {
    return formData;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      buildLaravelFormData(item, formData, parentKey ? `${parentKey}[${index}]` : `[${index}]`);
    });
  } else if (typeof obj === 'object' && !(obj instanceof File) && !(obj instanceof Blob)) {
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      buildLaravelFormData(val, formData, newKey);
    });
  } else {
    formData.append(parentKey, obj);
  }

  return formData;
}

// Helper: Convert flat bracket string representation for debugging/preview
export function getFlatBracketMap(obj, prefix = '', result = {}) {
  if (obj === null || obj === undefined) return result;

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      getFlatBracketMap(item, prefix ? `${prefix}[${index}]` : `[${index}]`, result);
    });
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      getFlatBracketMap(obj[key], prefix ? `${prefix}[${key}]` : key, result);
    });
  } else {
    result[prefix] = obj;
  }
  return result;
}
