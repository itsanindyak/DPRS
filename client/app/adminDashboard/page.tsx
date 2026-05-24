

'use client';

import { useState, useEffect } from 'react';
import { FilterRegion } from './types';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsGrid from './StatsGrid';
import DashboardGrid from './DashboardGrid';
import AnalyticsGrid from './AnalyticsGrid';
//import AlertBanner from './AlertBanner';

import RoleGuard from "@/context/roleContext";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterRegion>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close sidebar on desktop
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter as FilterRegion);
    console.log("Filtering by region:", filter);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <RoleGuard allowed={["SUPERADMIN"]}>
      <div className="min-h-screen bg-[#0F0E17] text-white">
        {/* Hamburger Menu Button - Only visible on mobile */}
        {isMobile && (
          <button
            className={`hamburger-menu ${sidebarOpen ? "active" : ""}`}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <div className="hamburger-icon">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        )}

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="main-content">
        <Header onSearch={handleSearch} />
        {/* <AlertBanner /> */}
        <StatsGrid />
        <DashboardGrid
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <AnalyticsGrid />
      </div>

    </div>
    </RoleGuard>
  );
};


export default AdminDashboard;



