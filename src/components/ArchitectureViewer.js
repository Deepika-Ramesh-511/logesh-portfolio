import React, { useState } from 'react';
import TechIcon from './TechIcon';

export default function ArchitectureViewer() {
  const [activeNode, setActiveNode] = useState('laravel');

  const nodes = [
    {
      id: 'react',
      title: 'Frontend Client',
      sub: 'React 19 & Tailwind',
      icon: 'SiReact',
      color: '#61DAFB',
      tag: 'Presentation Layer',
      details: {
        heading: 'React 19 Single Page Dashboard',
        summary: 'High-performance administrative dashboard with modular UI components, instant feedback, and sub-1.2s page paint.',
        keyPoints: [
          'State managed with Zustand for minimal re-renders and clean separation of UI state.',
          'TanStack React Query handles server-state caching, background data re-fetching, and optimistic mutations.',
          'Fully responsive design crafted with Tailwind CSS for mobile warehouse barcode scanners and desktop managers.'
        ],
        tech: ['React 19', 'Zustand', 'TanStack Query', 'Tailwind CSS', 'Axios']
      }
    },
    {
      id: 'nginx',
      title: 'Nginx Reverse Proxy',
      sub: 'Load Balancer & SSL',
      icon: 'SiNginx',
      color: '#009639',
      tag: 'Gateway Layer',
      details: {
        heading: 'Nginx Reverse Proxy & Security Gateway',
        summary: 'Directs incoming client traffic, terminates SSL/TLS, buffers slow clients, and handles static asset caching.',
        keyPoints: [
          'Reverse proxy configuration routing HTTP/HTTPS requests cleanly to PHP-FPM socket.',
          'Gzip & Brotli compression for static bundles reducing network transfer by >70%.',
          'Rate limiting and DDoS mitigation headers protecting sensitive authentication endpoints.'
        ],
        tech: ['Nginx', 'SSL/TLS', 'HTTP/2', 'Reverse Proxy', 'Rate Limiting']
      }
    },
    {
      id: 'laravel',
      title: 'Laravel REST API',
      sub: 'PHP 8.4 Clean Architecture',
      icon: 'SiLaravel',
      color: '#FF2D20',
      tag: 'Business Logic Core',
      details: {
        heading: 'Laravel Enterprise REST API Engine',
        summary: 'The central business engine enforcing clean architecture, domain-driven design, and multi-tenant database routing.',
        keyPoints: [
          'Tenant isolation resolver dynamically binds database connections per branch ID upon request validation.',
          'Authentication via Laravel Sanctum & Passport with Role-Based Access Control (RBAC) and policy gates.',
          'Strict Form Request validation, custom resource transformers, and SOLID service classes.',
          'Automatic stock ledger double-entry transactions preventing inventory discrepancies.'
        ],
        tech: ['Laravel 11', 'PHP 8.x', 'Sanctum', 'Passport', 'SOLID', 'DDD']
      }
    },
    {
      id: 'mysql',
      title: 'MySQL 8.4 Engine',
      sub: 'Multi-Tenant Schema',
      icon: 'SiMysql',
      color: '#00758F',
      tag: 'Persistent Data Layer',
      details: {
        heading: 'MySQL 8.4 Database Cluster',
        summary: 'High-reliability relational database storing isolated company ledgers, catalog hierarchies, and transaction logs.',
        keyPoints: [
          'Strict database isolation preventing cross-branch data leaks in multi-tenant environments.',
          'Composite indexing and query restructuring reducing query execution time by >65%.',
          'Automated Average Costing Engine (AVCO) calculating moving stock valuation in real-time.',
          'ACID transaction guarantees for financial invoices and stock balance updates.'
        ],
        tech: ['MySQL 8.4', 'InnoDB', 'Composite Indexes', 'AVCO Costing', 'ACID']
      }
    },
    {
      id: 'redis',
      title: 'Redis In-Memory Cache',
      sub: 'High Concurrency Layer',
      icon: 'SiRedis',
      color: '#DC2626',
      tag: 'Caching & Session',
      details: {
        heading: 'Redis Fast In-Memory Cache',
        summary: 'Buffers frequent inventory lookups, product catalog queries, and user session authentication tokens.',
        keyPoints: [
          'Sub-millisecond read times for live product stock checks across hundreds of concurrent branch tills.',
          'Distributed cache invalidation tags ensuring stock updates propagate across all branches instantly.',
          'Session state and rate limit counters stored in RAM.'
        ],
        tech: ['Redis 7.x', 'Key-Value Cache', 'Pub/Sub', 'Cache Invalidation']
      }
    },
    {
      id: 'workers',
      title: 'Async Queue Workers',
      sub: 'Redis Background Pipeline',
      icon: 'FaBolt',
      color: '#F59E0B',
      tag: 'Background Processing',
      details: {
        heading: 'Asynchronous Redis Queue Workers',
        summary: 'Offloads computationally heavy workloads from HTTP request cycles to dedicated background worker daemons.',
        keyPoints: [
          'Asynchronous PDF invoice generation ensuring zero checkout delay for physical retail counters.',
          'Bulk nightly reconciliation reports dispatched to branch managers without blocking web traffic.',
          'Automatic retry backoff logic with dead-letter queue (failed jobs table) for auditability.'
        ],
        tech: ['Redis Queue', 'Laravel Horizon', 'Async Workers', 'PDF Engine']
      }
    }
  ];

  const current = nodes.find((n) => n.id === activeNode) || nodes[2];

  return (
    <section id="architecture" className="section architecture-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaNetworkWired" size={13} />
          <span>Interactive System Architecture</span>
        </span>
        <h2 className="section-title">
          NexERP <span className="gradient-text">Enterprise Tier Architecture</span>
        </h2>
        <p className="section-subtitle">
          Click any component node below to inspect Logeshwaran's multi-tenant isolation, caching, and background pipeline.
        </p>
      </div>

      <div className="architecture-grid">
        {/* Left: Interactive Diagram Canvas */}
        <div className="architecture-canvas-card">
          <div className="diagram-header">
            <span className="flow-title">Multi-Branch Data & Request Flow</span>
            <span className="live-pulse-badge">
              <span className="pulse-dot" /> Live Interactive Topology
            </span>
          </div>

          <div className="diagram-flow-container">
            {/* Tier 1: Client */}
            <div className="flow-tier">
              <div className="tier-label">Client Tier</div>
              <div
                className={`diagram-node ${activeNode === 'react' ? 'active-node' : ''}`}
                onClick={() => setActiveNode('react')}
                style={{ '--node-accent': '#61DAFB' }}
              >
                <div className="node-icon-box">
                  <TechIcon name="SiReact" size={24} color="#61DAFB" />
                </div>
                <div className="node-text">
                  <span className="node-title">React 19 SPA</span>
                  <span className="node-sub">Tailwind • Zustand</span>
                </div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flow-arrow-down">
              <span className="arrow-pulse" />
              <span className="arrow-label">HTTPS / REST API</span>
            </div>

            {/* Tier 2: Gateway */}
            <div className="flow-tier">
              <div className="tier-label">Gateway & Reverse Proxy</div>
              <div
                className={`diagram-node ${activeNode === 'nginx' ? 'active-node' : ''}`}
                onClick={() => setActiveNode('nginx')}
                style={{ '--node-accent': '#009639' }}
              >
                <div className="node-icon-box">
                  <TechIcon name="SiNginx" size={24} color="#009639" />
                </div>
                <div className="node-text">
                  <span className="node-title">Nginx Proxy</span>
                  <span className="node-sub">SSL • Rate Limit • Gzip</span>
                </div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flow-arrow-down">
              <span className="arrow-pulse" />
              <span className="arrow-label">FastCGI Socket</span>
            </div>

            {/* Tier 3: Core API */}
            <div className="flow-tier">
              <div className="tier-label">Application Core</div>
              <div
                className={`diagram-node highlight-core ${activeNode === 'laravel' ? 'active-node' : ''}`}
                onClick={() => setActiveNode('laravel')}
                style={{ '--node-accent': '#FF2D20' }}
              >
                <div className="node-icon-box">
                  <TechIcon name="SiLaravel" size={26} color="#FF2D20" />
                </div>
                <div className="node-text">
                  <span className="node-title">Laravel Backend Core</span>
                  <span className="node-sub">Sanctum RBAC • DDD • Tenant Isolation</span>
                </div>
                <span className="core-badge">Heart</span>
              </div>
            </div>

            {/* Branching Arrows to Storage & Queues */}
            <div className="flow-split-row">
              {/* Branch Left: Persistent DB */}
              <div className="split-branch">
                <div className="flow-arrow-down">
                  <span className="arrow-pulse" />
                  <span className="arrow-label">SQL Queries</span>
                </div>
                <div
                  className={`diagram-node ${activeNode === 'mysql' ? 'active-node' : ''}`}
                  onClick={() => setActiveNode('mysql')}
                  style={{ '--node-accent': '#00758F' }}
                >
                  <div className="node-icon-box">
                    <TechIcon name="SiMysql" size={24} color="#00758F" />
                  </div>
                  <div className="node-text">
                    <span className="node-title">MySQL 8.4</span>
                    <span className="node-sub">Multi-Tenant Isolated DB</span>
                  </div>
                </div>
              </div>

              {/* Branch Center: Redis Cache */}
              <div className="split-branch">
                <div className="flow-arrow-down">
                  <span className="arrow-pulse" />
                  <span className="arrow-label">Cache / Stock</span>
                </div>
                <div
                  className={`diagram-node ${activeNode === 'redis' ? 'active-node' : ''}`}
                  onClick={() => setActiveNode('redis')}
                  style={{ '--node-accent': '#DC2626' }}
                >
                  <div className="node-icon-box">
                    <TechIcon name="SiRedis" size={24} color="#DC2626" />
                  </div>
                  <div className="node-text">
                    <span className="node-title">Redis Cache</span>
                    <span className="node-sub">Sub-ms Stock Lookups</span>
                  </div>
                </div>
              </div>

              {/* Branch Right: Queue Workers */}
              <div className="split-branch">
                <div className="flow-arrow-down">
                  <span className="arrow-pulse" />
                  <span className="arrow-label">Async Jobs</span>
                </div>
                <div
                  className={`diagram-node ${activeNode === 'workers' ? 'active-node' : ''}`}
                  onClick={() => setActiveNode('workers')}
                  style={{ '--node-accent': '#F59E0B' }}
                >
                  <div className="node-icon-box">
                    <TechIcon name="FaBolt" size={24} color="#F59E0B" />
                  </div>
                  <div className="node-text">
                    <span className="node-title">Redis Queue</span>
                    <span className="node-sub">PDF Invoices & Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Node Deep-Dive Panel */}
        <div className="architecture-detail-card">
          <div className="detail-header">
            <div className="detail-icon-wrap" style={{ backgroundColor: `${current.color}15`, borderColor: current.color }}>
              <TechIcon name={current.icon} size={28} color={current.color} />
            </div>
            <div>
              <span className="detail-tag">{current.tag}</span>
              <h3 className="detail-title">{current.details.heading}</h3>
            </div>
          </div>

          <p className="detail-summary">{current.details.summary}</p>

          <div className="detail-section">
            <h4 className="detail-section-title">Architectural Highlights:</h4>
            <ul className="detail-points-list">
              {current.details.keyPoints.map((pt, i) => (
                <li key={i} className="detail-point">
                  <TechIcon name="FaCheckCircle" size={14} color="#10B981" className="point-icon" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4 className="detail-section-title">Technologies Leveraged:</h4>
            <div className="detail-tech-chips">
              {current.details.tech.map((t, i) => (
                <span key={i} className="detail-tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="node-nav-hint">
            <TechIcon name="FaSlidersH" size={12} className="mr-2" />
            <span>Click any other component on the diagram to see its architecture.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
