'use client';

import React from 'react';
import AddRegionalAdmin from "./AddRegionalAdmin";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            Disaster Preparedness and Response Education System
          </h1>
          <p className="header-subtitle">
            National Disaster Management Authority - Education Division
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex items-center w-full md:w-1/2 bg-orange-50 border border-orange-300 rounded-lg px-4 py-2 transition-all duration-200">
            <span className="mr-2 text-lg">🔍</span>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
              placeholder="Search students, institutions, or regions..."
              onChange={handleSearchChange}
              aria-label="Search students, institutions, or regions"
            />
          </div>

          {/* Add Admin Button */}
          <div>
            <AddRegionalAdmin />
          </div>
        </div>
      </header>

      <style jsx>{`
        .header {
          background: #0f0e17;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 32px;
          border: 1px solid #ff8906;
          box-shadow: 0 4px 12px rgba(255, 137, 6, 0.1);
        }

        .header-content {
          margin-bottom: 24px;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          color: #fffffe;
          margin-bottom: 8px;
          line-height: 1.2;
          margin: 0 0 8px 0;
        }

        .header-subtitle {
          color: #a7a9be;
          font-size: 16px;
          margin: 0 0 24px 0;
          line-height: 1.3;
        }

        .search-section {
          // max-width: 500px;
          width: full;
        }

        .search-bar {
          display: flex;
          width: 1/2;
          align-items: center;
          background: rgba(255, 137, 6, 0.1);
          border: 1px solid rgba(255, 137, 6, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          transition: all 0.2s ease;
        }

        .search-bar:focus-within {
          border-color: #ff8906;
          background: rgba(255, 137, 6, 0.15);
          box-shadow: 0 0 0 3px rgba(255, 137, 6, 0.2);
          transform: translateY(-1px);
        }

        .search-icon {
          color: #a7a9be;
          font-size: 16px;
          margin-right: 12px;
          flex-shrink: 0;
          transition: color 0.2s ease;
        }

        .search-bar:focus-within .search-icon {
          color: #ff8906;
        }

        .search-input {
          background: none;
          border: none;
          outline: none;
          color: #fffffe;
          font-size: 14px;
          width: 100%;
          font-family: inherit;
        }

        .search-input::placeholder {
          color: #a7a9be;
          opacity: 0.8;
        }

        @media (max-width: 1024px) {
          .header-title {
            font-size: 24px;
          }

          .header-subtitle {
            font-size: 15px;
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 24px 20px;
            margin-bottom: 24px;
          }

          .header-title {
            font-size: 20px;
            line-height: 1.3;
          }

          .header-subtitle {
            font-size: 14px;
            margin-bottom: 20px;
          }

          .search-section {
            max-width: none;
          }

          .search-bar {
            padding: 10px 14px;
          }

          .search-input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        @media (max-width: 480px) {
          .header-title {
            font-size: 18px;
          }

          .search-input::placeholder {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;