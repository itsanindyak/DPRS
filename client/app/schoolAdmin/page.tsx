import React from 'react';
import Header from './Header';
// import AlertBanner from './AlertBanner';
import StatsGrid from './StatsGrid';
import StudentPerformance from './StudentPerformance';
import TopPerformers from './TopPerformers';
import GameCompletion from './GameCompletion';
import KeyInsights from './KeyInsights';
import RoleGuard from '@/context/roleContext';

const AdminDashboard = () => {
  return (
    <RoleGuard allowed={["SCHOOLADMIN"]}>

    <div className="container">
      <Header />
      <div className="dashboard-content">
        {/* <AlertBanner /> */}
        <StatsGrid />
        <div className="dashboard-grid">
          <StudentPerformance />
          <TopPerformers />
          <GameCompletion />
          <KeyInsights />
        </div>
      </div>
    </div>
    </RoleGuard>
  );
};

export default AdminDashboard;