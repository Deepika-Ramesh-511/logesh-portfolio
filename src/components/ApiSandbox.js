import React, { useState } from 'react';
import TechIcon from './TechIcon';
import { apiSandboxEndpoints } from '../data/portfolioData';

export default function ApiSandbox() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiSandboxEndpoints[0]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(apiSandboxEndpoints[0].response);
  const [responseTime, setResponseTime] = useState(18);
  const [copied, setCopied] = useState(false);

  const handleSelectEndpoint = (ep) => {
    setSelectedEndpoint(ep);
    setLoading(true);
    const simulatedLatency = Math.floor(Math.random() * 25) + 12;
    setTimeout(() => {
      setResponse(ep.response);
      setResponseTime(simulatedLatency);
      setLoading(false);
    }, 250);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-sandbox" className="section api-sandbox-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaServer" size={13} />
          <span>Live API Explorer</span>
        </span>
        <h2 className="section-title">
          RESTful API <span className="gradient-text">Interactive Sandbox</span>
        </h2>
        <p className="section-subtitle">
          Test live simulated endpoints from Logeshwaran's API architecture. Inspect JSON payloads, HTTP headers, and response times.
        </p>
      </div>

      <div className="sandbox-container">
        {/* Left Side: Endpoint Selector */}
        <div className="endpoint-selector-pane">
          <div className="selector-title">
            <TechIcon name="SiPostman" size={16} color="#FF6C37" />
            <span>Select Endpoint</span>
          </div>

          <div className="endpoint-list">
            {apiSandboxEndpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => handleSelectEndpoint(ep)}
                className={`endpoint-item-btn ${selectedEndpoint.id === ep.id ? 'active' : ''}`}
              >
                <div className="endpoint-method-row">
                  <span className={`method-badge method-${ep.method.toLowerCase()}`}>
                    {ep.method}
                  </span>
                  <span className="endpoint-path">{ep.endpoint}</span>
                </div>
                <div className="endpoint-desc-sub">{ep.desc}</div>
              </button>
            ))}
          </div>

          <div className="api-specs-info">
            <div className="spec-row">
              <span className="spec-label">Auth Protocol:</span>
              <span className="spec-val">Bearer Sanctum / JWT</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Content-Type:</span>
              <span className="spec-val">application/json</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Rate Limit:</span>
              <span className="spec-val">60 req / min</span>
            </div>
          </div>
        </div>

        {/* Right Side: Request Bar & Response Inspector */}
        <div className="api-inspector-pane">
          {/* URL Bar */}
          <div className="api-url-bar">
            <span className={`method-badge method-${selectedEndpoint.method.toLowerCase()}`}>
              {selectedEndpoint.method}
            </span>
            <span className="api-base-url">https://api.logeshwaran.dev</span>
            <span className="api-endpoint-text">{selectedEndpoint.endpoint}</span>
            <button
              onClick={() => handleSelectEndpoint(selectedEndpoint)}
              disabled={loading}
              className="api-send-btn"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <TechIcon name="FaPlay" size={12} />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>

          {/* Request Payload (if POST) */}
          {selectedEndpoint.payload && (
            <div className="api-payload-box">
              <div className="payload-label">Request Body (JSON):</div>
              <pre className="payload-code">
                {JSON.stringify(selectedEndpoint.payload, null, 2)}
              </pre>
            </div>
          )}

          {/* Response Box */}
          <div className="api-response-box">
            <div className="response-header">
              <div className="response-status-group">
                <span className="status-indicator-tag status-200">
                  <TechIcon name="FaCheckCircle" size={12} />
                  <span>{response.status || 200} OK</span>
                </span>
                <span className="latency-indicator">
                  <TechIcon name="FaBolt" size={12} color="#F59E0B" />
                  <span>{responseTime} ms</span>
                </span>
                <span className="format-indicator">JSON (UTF-8)</span>
              </div>

              <button onClick={handleCopyJson} className="copy-json-btn">
                <TechIcon name="FaCopy" size={12} />
                <span>{copied ? 'Copied JSON!' : 'Copy Response'}</span>
              </button>
            </div>

            <div className="response-body">
              <pre className="json-pre">
                <code>{JSON.stringify(response, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
