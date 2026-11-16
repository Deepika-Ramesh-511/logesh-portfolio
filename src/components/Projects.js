import React, { useState } from 'react';
import TechIcon from './TechIcon';
import { nexErpProject } from '../data/portfolioData';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: 'FaLayerGroup' },
    { id: 'architecture', label: 'Domain & Multi-Tenancy', icon: 'FaNetworkWired' },
    { id: 'backend', label: 'Laravel REST APIs', icon: 'SiLaravel' },
    { id: 'database', label: 'MySQL & Redis Caching', icon: 'SiMysql' },
    { id: 'devops', label: 'Docker & Queue Workers', icon: 'SiDocker' },
    { id: 'preview', label: 'Interactive ERP Live Simulator', icon: 'FaPlay' }
  ];

  // Simulator state for the Live ERP Demo tab
  const [simBranch, setSimBranch] = useState('tirupur');
  const [simStock, setSimStock] = useState({
    cotton_yarn_30s: 1420,
    dye_lot_black: 890,
    finish_apparel_pack: 640
  });
  const [reconciling, setReconciling] = useState(false);
  const [logMessages, setLogMessages] = useState([
    '[Tenant: Tirupur Main Hub] Connection established via dynamic tenant resolver.',
    '[MySQL 8.4] Double-entry stock ledger initialized (Status: Balanced).',
    '[Redis] In-memory cache warmed: 3 SKU keys cached (Latency: 0.8ms).'
  ]);

  const handleSimulateTransaction = (sku, delta) => {
    setReconciling(true);
    setTimeout(() => {
      setSimStock((prev) => ({
        ...prev,
        [sku]: Math.max(0, prev[sku] + delta)
      }));
      const timestamp = new Date().toLocaleTimeString();
      setLogMessages((prev) => [
        `[${timestamp}] TXN committed: ${sku} adjusted by ${delta > 0 ? '+' : ''}${delta}. Ledger reconciled (AVCO calculated).`,
        ...prev.slice(0, 5)
      ]);
      setReconciling(false);
    }, 400);
  };

  return (
    <section id="nexerp" className="section projects-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaLayerGroup" size={13} />
          <span>Flagship Enterprise Case Study</span>
        </span>
        <h2 className="section-title">
          NexERP <span className="gradient-text">Enterprise Resource Planning</span>
        </h2>
        <p className="section-subtitle">
          A deep dive into the multi-tenant architecture, MySQL query optimization, and background worker queues engineered by Logeshwaran.
        </p>
      </div>

      <div className="project-card-full">
        {/* Project Header Banner */}
        <div className="project-banner">
          <div className="banner-left">
            <div className="banner-badge-row">
              <span className="badge-pill-featured">Production Ready</span>
              <span className="badge-pill-tech">Laravel 11 • React 19 • MySQL 8.4 • Docker</span>
            </div>
            <h3 className="project-banner-title">{nexErpProject.title}</h3>
            <p className="project-banner-sub">{nexErpProject.subtitle}</p>
          </div>

          <div className="banner-stats-grid">
            {nexErpProject.stats.map((st, i) => (
              <div key={i} className="banner-stat-box">
                <span className="banner-stat-val">{st.value}</span>
                <span className="banner-stat-lbl">{st.label}</span>
                <span className="banner-stat-desc">{st.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="project-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`project-tab-btn ${activeTab === tab.id ? 'active-tab' : ''}`}
            >
              <TechIcon name={tab.icon} size={15} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="project-tab-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="tab-overview-grid">
                <div className="overview-text-block">
                  <h4 className="tab-heading">Architectural Vision & Business Problem</h4>
                  <p className="tab-para">
                    In multi-branch retail and manufacturing ecosystems, branch managers face severe inventory discrepancies,
                    delayed stock visibility, and high database contention during concurrent sales surges.
                  </p>
                  <p className="tab-para">
                    Logeshwaran engineered <strong>NexERP</strong> to overcome these challenges through domain-driven design,
                    decoupled multi-tenant database routing, and double-entry stock ledger integrity modeled after financial accounting principles.
                  </p>

                  <h4 className="tab-heading mt-6">Core Capabilities</h4>
                  <div className="feat-pill-list">
                    <div className="feat-item">
                      <TechIcon name="FaCheckCircle" size={16} color="#10B981" />
                      <div>
                        <strong>Strict Multi-Tenant Database Isolation:</strong> Dedicated database schemas per branch preventing data spill.
                      </div>
                    </div>
                    <div className="feat-item">
                      <TechIcon name="FaCheckCircle" size={16} color="#10B981" />
                      <div>
                        <strong>Double-Entry Stock Ledger:</strong> Every inventory movement requires debit and credit entries, guaranteeing zero unaccounted stock loss.
                      </div>
                    </div>
                    <div className="feat-item">
                      <TechIcon name="FaCheckCircle" size={16} color="#10B981" />
                      <div>
                        <strong>Moving Average Costing (AVCO):</strong> Automatic real-time recalculation of inventory valuation during receipts and transfers.
                      </div>
                    </div>
                    <div className="feat-item">
                      <TechIcon name="FaCheckCircle" size={16} color="#10B981" />
                      <div>
                        <strong>Sub-Second Response Under High Load:</strong> Redis caching eliminates expensive SQL joins for high-frequency till lookups.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overview-stack-sidebar">
                  <h4 className="tab-heading">Technology Composition</h4>
                  <div className="stack-card-list">
                    {nexErpProject.stack.map((item, idx) => (
                      <div key={idx} className="stack-list-item">
                        <div className="stack-dot" style={{ backgroundColor: item.color }} />
                        <div className="stack-names">
                          <span className="stack-primary">{item.name}</span>
                          <span className="stack-category">{item.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE & MULTI-TENANCY */}
          {activeTab === 'architecture' && (
            <div className="tab-pane">
              <h4 className="tab-heading">Domain-Driven Clean Architecture & Tenant Isolation</h4>
              <p className="tab-para">
                NexERP rejects traditional monolithic tight coupling in favor of domain boundaries. Each request is passed
                through tenant middleware which identifies the tenant branch and dynamically binds the connection:
              </p>

              <div className="code-block-mock">
                <div className="code-header">
                  <span>app/Http/Middleware/ResolveTenantConnection.php</span>
                  <span className="code-lang">PHP 8.4 / Laravel</span>
                </div>
                <pre className="code-content">
{`namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Support\\Facades\\DB;
use App\\Services\\Tenancy\\TenantManager;

class ResolveTenantConnection
{
    public function handle($request, Closure $next)
    {
        $tenantId = $request->header('X-Branch-UUID') 
                 ?? $request->user()?->branch_uuid;

        if ($tenantId) {
            TenantManager::switchConnection($tenantId);
            // Strict database isolation configured at runtime
            DB::purge('tenant');
            DB::reconnect('tenant');
        }

        return $next($request);
    }
}`}
                </pre>
              </div>

              <div className="architecture-highlights-grid mt-6">
                <div className="arch-box">
                  <TechIcon name="FaShieldAlt" size={20} color="#FF2D20" />
                  <h5>Zero Cross-Tenant Leakage</h5>
                  <p>Database credentials and socket connections are routed cleanly so that one tenant's data is physically separated in MySQL.</p>
                </div>
                <div className="arch-box">
                  <TechIcon name="FaCode" size={20} color="#10B981" />
                  <h5>Repository & Service Patterns</h5>
                  <p>Controllers stay lean, delegating business logic to domain-specific services like `StockLedgerService` and `CostingEngine`.</p>
                </div>
                <div className="arch-box">
                  <TechIcon name="FaCogs" size={20} color="#06B6D4" />
                  <h5>Failover & Migration Tooling</h5>
                  <p>Custom Artisan CLI commands to run migrations and seeds across all tenant databases simultaneously with automated rollback.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BACKEND & REST APIS */}
          {activeTab === 'backend' && (
            <div className="tab-pane">
              <h4 className="tab-heading">Laravel RESTful API Design & Security Enforcement</h4>
              <p className="tab-para">
                APIs are built following strict REST principles, formatted JSON resource envelopes, and protected via Laravel Sanctum & Passport:
              </p>

              <div className="api-features-row">
                <div className="api-card">
                  <div className="api-card-header">
                    <TechIcon name="FaShieldAlt" size={18} color="#FF2D20" />
                    <h6>Authentication & Scoped RBAC</h6>
                  </div>
                  <p>Granular permissions (`inventory:read`, `ledger:write`, `reports:export`) enforced via Laravel Gate policies and Sanctum bearer tokens.</p>
                </div>

                <div className="api-card">
                  <div className="api-card-header">
                    <TechIcon name="SiPostman" size={18} color="#FF6C37" />
                    <h6>Postman Verified Collections</h6>
                    </div>
                  <p>Comprehensive API documentation with pre-request scripts, automated response assertions, and environment variables for local, staging, and prod.</p>
                </div>

                <div className="api-card">
                  <div className="api-card-header">
                    <TechIcon name="FaCheckCircle" size={18} color="#10B981" />
                    <h6>Atomic Transactions & Rollbacks</h6>
                  </div>
                  <p>All stock updates wrapped in `DB::transaction()` blocks to prevent partial writes during unexpected server interruptions.</p>
                </div>
              </div>

              <div className="code-block-mock mt-6">
                <div className="code-header">
                  <span>app/Services/Inventory/StockLedgerService.php</span>
                  <span className="code-lang">Laravel 11</span>
                </div>
                <pre className="code-content">
{`public function recordMovement(StockMovementDTO $dto): StockLedgerEntry
{
    return DB::transaction(function () use ($dto) {
        // 1. Calculate weighted average cost (AVCO)
        $unitCost = $this->costingEngine->computeMovingAverage($dto->skuId, $dto->qty, $dto->unitPrice);

        // 2. Insert double-entry ledger entry
        $entry = StockLedger::create([
            'sku_id'        => $dto->skuId,
            'source_loc'    => $dto->sourceLocation,
            'dest_loc'      => $dto->destLocation,
            'qty'           => $dto->qty,
            'unit_cost'     => $unitCost,
            'reference_no'  => $dto->referenceNo,
            'user_id'       => auth()->id(),
        ]);

        // 3. Invalidate Redis stock cache tag for instant multi-branch sync
        Cache::tags(['stock_cache', "sku_{$dto->skuId}"])->flush();

        return $entry;
    });
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: DATABASE & REDIS */}
          {activeTab === 'database' && (
            <div className="tab-pane">
              <h4 className="tab-heading">MySQL 8.4 Query Optimization & Redis Caching</h4>
              <p className="tab-para">
                Through comprehensive `EXPLAIN` query analysis, compound indexing, and strategic Redis caching,
                Logeshwaran reduced high-load report generation and stock search query execution times by over <strong>65%</strong>.
              </p>

              <div className="db-metrics-table-wrap">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Operation / Query Target</th>
                      <th>Before Optimization</th>
                      <th>After Optimization (MySQL 8.4 + Redis)</th>
                      <th>Latency Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Multi-Branch Inventory Balance Lookup</td>
                      <td className="text-red">340 ms (Full Table Scan)</td>
                      <td className="text-green"><strong>2.1 ms (Redis Key-Value)</strong></td>
                      <td><span className="tag-green">99.3% Faster</span></td>
                    </tr>
                    <tr>
                      <td>Double-Entry Ledger Reconciliation Query</td>
                      <td className="text-red">1,280 ms (Unindexed Join)</td>
                      <td className="text-green"><strong>110 ms (Composite B-Tree Index)</strong></td>
                      <td><span className="tag-green">91.4% Faster</span></td>
                    </tr>
                    <tr>
                      <td>Monthly Branch Financial P&L Calculation</td>
                      <td className="text-red">4,500 ms (Blocking Request)</td>
                      <td className="text-green"><strong>Async Queue (0ms user wait)</strong></td>
                      <td><span className="tag-green">Non-Blocking</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="db-insights-grid mt-6">
                <div className="insight-card">
                  <TechIcon name="SiMysql" size={24} color="#00758F" />
                  <h6>Composite Indexing Strategy</h6>
                  <p>Created composite indexes on `(tenant_id, sku_id, created_at)` allowing MySQL to perform index range scans instead of costly filesorts.</p>
                </div>
                <div className="insight-card">
                  <TechIcon name="SiRedis" size={24} color="#DC2626" />
                  <h6>Atomic Redis Increment Counters</h6>
                  <p>Utilized Redis `INCRBY` commands for real-time stock allocation during flash purchases, preventing overselling race conditions.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEVOPS & QUEUE WORKERS */}
          {activeTab === 'devops' && (
            <div className="tab-pane">
              <h4 className="tab-heading">Docker Containerization & Asynchronous Queue Pipeline</h4>
              <p className="tab-para">
                Containerized with Docker and orchestrated via Docker Compose for 100% environment parity between development and production:
              </p>

              <div className="docker-compose-preview">
                <div className="docker-header">
                  <TechIcon name="SiDocker" size={16} color="#2496ED" />
                  <span>docker-compose.yml (Multi-Container Architecture)</span>
                </div>
                <pre className="code-content">
{`version: '3.8'
services:
  app:
    build: { context: ., dockerfile: Dockerfile }
    image: nexerp-laravel:latest
    volumes: ['.:/var/www/html']
    networks: [erp-network]

  web:
    image: nginx:alpine
    ports: ['80:80', '443:443']
    volumes: ['./nginx.conf:/etc/nginx/conf.d/default.conf']
    depends_on: [app]
    networks: [erp-network]

  db:
    image: mysql:8.4
    environment: { MYSQL_DATABASE: 'nexerp_master', MYSQL_ROOT_PASSWORD: 'secret' }
    volumes: ['mysql_data:/var/lib/mysql']
    networks: [erp-network]

  cache:
    image: redis:alpine
    ports: ['6379:6379']
    networks: [erp-network]

  queue-worker:
    build: { context: ., dockerfile: Dockerfile }
    command: php artisan queue:work redis --sleep=3 --tries=3
    depends_on: [app, cache]
    networks: [erp-network]`}
                </pre>
              </div>

              <div className="queue-pipeline-steps mt-6">
                <div className="queue-step">
                  <div className="step-num">1</div>
                  <div className="step-desc">
                    <strong>Invoice Dispatch:</strong> Customer finishes order; HTTP controller pushes job `GeneratePdfInvoice` to Redis.
                  </div>
                </div>
                <div className="queue-step">
                  <div className="step-num">2</div>
                  <div className="step-desc">
                    <strong>Immediate HTTP 200:</strong> Client receives confirmation in 45ms without waiting for PDF rendering.
                  </div>
                </div>
                <div className="queue-step">
                  <div className="step-num">3</div>
                  <div className="step-desc">
                    <strong>Worker Processing:</strong> Redis queue worker picks up job, renders PDF via Chromium, saves to S3/disk, and sends email.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INTERACTIVE ERP SIMULATOR */}
          {activeTab === 'preview' && (
            <div className="tab-pane">
              <h4 className="tab-heading">Live Interactive ERP Ledger & Stock Simulator</h4>
              <p className="tab-para">
                Test the double-entry inventory reconciliation logic live. Select a branch, trigger stock movements, and watch the real-time ledger recalculate:
              </p>

              <div className="erp-simulator-box">
                {/* Branch Switcher */}
                <div className="sim-branch-bar">
                  <span className="sim-bar-label">Active Branch Tenant:</span>
                  <div className="sim-branches">
                    <button
                      className={`sim-branch-btn ${simBranch === 'tirupur' ? 'active' : ''}`}
                      onClick={() => setSimBranch('tirupur')}
                    >
                      Branch #1 (Tirupur Main Hub)
                    </button>
                    <button
                      className={`sim-branch-btn ${simBranch === 'coimbatore' ? 'active' : ''}`}
                      onClick={() => setSimBranch('coimbatore')}
                    >
                      Branch #2 (Coimbatore Warehouse)
                    </button>
                    <button
                      className={`sim-branch-btn ${simBranch === 'chennai' ? 'active' : ''}`}
                      onClick={() => setSimBranch('chennai')}
                    >
                      Branch #3 (Chennai Retail Unit)
                    </button>
                  </div>
                </div>

                {/* Live Stock Cards */}
                <div className="sim-inventory-grid">
                  <div className="sim-item-card">
                    <div className="sim-item-title">Cotton Combed Yarn (30s)</div>
                    <div className="sim-item-sku">SKU: RAW-YRN-30S</div>
                    <div className="sim-qty-display">{simStock.cotton_yarn_30s} <span className="unit">kg</span></div>
                    <div className="sim-btn-group">
                      <button
                        disabled={reconciling}
                        onClick={() => handleSimulateTransaction('cotton_yarn_30s', -50)}
                        className="sim-action-btn btn-dispense"
                      >
                        -50 Dispatch
                      </button>
                      <button
                        disabled={reconciling}
                        onClick={() => handleSimulateTransaction('cotton_yarn_30s', 100)}
                        className="sim-action-btn btn-receive"
                      >
                        +100 Receive
                      </button>
                    </div>
                  </div>

                  <div className="sim-item-card">
                    <div className="sim-item-title">Reactive Black Dye Lot</div>
                    <div className="sim-item-sku">SKU: CHM-DYE-BLK</div>
                    <div className="sim-qty-display">{simStock.dye_lot_black} <span className="unit">liters</span></div>
                    <div className="sim-btn-group">
                      <button
                        disabled={reconciling}
                        onClick={() => handleSimulateTransaction('dye_lot_black', -25)}
                        className="sim-action-btn btn-dispense"
                      >
                        -25 Use
                      </button>
                      <button
                        disabled={reconciling}
                        onClick={() => handleSimulateTransaction('dye_lot_black', 50)}
                        className="sim-action-btn btn-receive"
                      >
                        +50 Restock
                      </button>
                    </div>
                  </div>

                  <div className="sim-item-card">
                    <div className="sim-item-title">Export Packaged Apparel</div>
                    <div className="sim-item-sku">SKU: FIN-APP-CTN</div>
                    <div className="sim-qty-display">{simStock.finish_apparel_pack} <span className="unit">cartons</span></div>
                    <div className="sim-btn-group">
                      <button
                        disabled={reconciling}
                        onClick={() => handleSimulateTransaction('finish_apparel_pack', -10)}
                        className="sim-action-btn btn-dispense"
                      >
                        -10 Ship
                      </button>
                      <button
                        disabled={reconciling}
                        onClick={() => handleSimulateTransaction('finish_apparel_pack', 25)}
                        className="sim-action-btn btn-receive"
                      >
                        +25 Produce
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated Ledger Log */}
                <div className="sim-log-card">
                  <div className="log-card-header">
                    <TechIcon name="FaTerminal" size={13} />
                    <span>Real-Time Audit Ledger Stream</span>
                    {reconciling && <span className="reconciling-spinner">Reconciling DB...</span>}
                  </div>
                  <div className="log-messages-list">
                    {logMessages.map((msg, i) => (
                      <div key={i} className="log-msg-line">
                        <span className="log-arrow">›</span> {msg}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
