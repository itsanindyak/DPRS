import React from 'react';
import './regionAdminStyles.css';
interface StatCardProps {
  icon: string;
  iconBg: string;
  value: string;
  label: string;
  change: string;
}

function StatCard({ icon, iconBg, value, label, change }: StatCardProps) {
  return (
    <div className="card regional-stat-card">
      <div className={`regional-stat-icon ${iconBg === '#FF8906' ? 'bg-primary' : iconBg === '#E53170' ? 'bg-secondary' : iconBg === '#F25F4C' ? 'bg-tertiary' : 'bg-quaternary'}`}>
        {icon}
      </div>
      <div className="regional-stat-value">
        {value}
      </div>
      <div className="regional-stat-label">
        {label}
      </div>
      <div className="regional-stat-change">
        {change}
      </div>
    </div>
  );
}

export default function RegionalStats() {
  return (
    <div className="regional-stats-grid">
      <StatCard
        icon="👥"
        iconBg="#FF8906"
        value="3,247"
        label="Active Students"
        change="+12%"
      />
      <StatCard
        icon="🎯"
        iconBg="#E53170"
        value="85.2%"
        label="Completion Rate"
        change="+5%"
      />
      <StatCard
        icon="📊"
        iconBg="#F25F4C"
        value="7.8"
        label="Average Score"
        change="+0.3"
      />
      <StatCard
        icon="🏫"
        iconBg="#A7A9BE"
        value="24"
        label="Total Schools"
        change="+2"
      />
    </div>
  );
}