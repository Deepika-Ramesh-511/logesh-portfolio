import React from 'react';
import TechIcon from './TechIcon';
import { keyMetrics } from '../data/portfolioData';

export default function StatsBar() {
  const iconList = ['FaBolt', 'FaNetworkWired', 'FaShieldAlt', 'SiReact'];

  return (
    <section className="stats-strip-section">
      <div className="stats-strip-container">
        {keyMetrics.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon-wrap">
              <TechIcon name={iconList[i % iconList.length]} size={22} className="stat-glow-icon" />
            </div>
            <div className="stat-info">
              <div className="stat-value-row">
                <span className="stat-big-value">{stat.value}</span>
              </div>
              <div className="stat-main-label">{stat.label}</div>
              <div className="stat-sub-label">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
