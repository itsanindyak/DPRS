import React from 'react';
//import AlertBanner from './components/AlertBanner';
import RegionalStats from './components/RegionalStats';
import StudentPerformance from './components/StudentPerformance';
import TopPerformers from './components/TopPerformers';
import GameCompletion from './components/GameCompletion';
import KeyInsights from './components/KeyInsights';
import TopSchools from './components/TopSchools';
import RoleGuard from "@/context/roleContext";
import AddSchoolAdmin from './components/AddSchoolAdmin';

export default function RegionalAdminPage() {
  return (
    <RoleGuard allowed={["REGIONALADMIN"]}>
      <div className="container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-content">
            <div className="logo">
              <div className="icon-bg">
                <span className="regional-nav-icon">🏫</span>
              </div>
              <h1>Regional Admin Portal</h1>
            </div>
            {/* <div className="nav-buttons">
            <button className="sign-in-button">Settings</button>
            <button className="sign-up-button">Profile</button>
            </div> */}

            <div>
              <AddSchoolAdmin/>
            </div>
          </div>
        </nav>

        {/* Main Dashboard Content */}
        <div className="regional-dashboard-container">
          {/* Alert Banner */}
          {/* <AlertBanner /> */}

          {/* Regional Stats */}
          <RegionalStats />

          {/* Dashboard Grid */}
          <div className="regional-dashboard-grid">
            {/* Student Performance */}
            <div className="regional-full-span">
              <StudentPerformance />
            </div>

            {/* Top Performers */}
            <TopPerformers />

            {/* Game Completion */}
            <GameCompletion />

            {/* Key Insights */}
            <KeyInsights />

            {/* Top Schools */}
            <TopSchools />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}