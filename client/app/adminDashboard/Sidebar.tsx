

'use client';

import React from 'react';
import { NavItem } from './types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems: NavItem[] = [
    { id: '1', name: 'Dashboard', href: '#', icon: '📊', active: true },
    { id: '2', name: 'Students', href: '#', icon: '👥' },
    { id: '3', name: 'Institutions', href: '#', icon: '🏫' },
    { id: '4', name: 'Games', href: '#', icon: '🎮' },
    { id: '5', name: 'Analytics', href: '#', icon: '📈' },
    { id: '6', name: 'Emergency', href: '#', icon: '🚨' },
    { id: '7', name: 'Settings', href: '#', icon: '⚙️' },
  ];

  return (
    <>
      {/* Sidebar overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <div className="logo-icon">🚨</div>
          <div className="logo-text">
            <h1>DisasterEd Pro</h1>
            <p>NDMA Admin Portal</p>
          </div>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a 
                href={item.href} 
                className={`nav-link ${item.active ? 'active' : ''}`}
                onClick={() => {
                  // Close sidebar on mobile when nav item is clicked
                  if (window.innerWidth <= 768) {
                    onClose();
                  }
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;