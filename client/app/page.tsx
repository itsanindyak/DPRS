"use client";
import React from "react";
import {
  Shield,
  Users,
  BookOpen,
  AlertTriangle,
  MapPin,
  Trophy,
  Eye,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/authContext";
import toast from "react-hot-toast";

export default function LandingPage() {
  const { accountID, logout } = useUser();
  const router = useRouter();

  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Interactive Learning Modules",
      description:
        "Region-specific disaster education with engaging digital content tailored to local risks and hazards.",
    },
    {
      icon: <Trophy size={24} />,
      title: "Gamified Experience",
      description:
        "Video games and reward systems that make disaster preparedness training engaging and memorable.",
    },
    {
      icon: <Eye size={24} />,
      title: "Virtual Drills",
      description:
        "Safe, game-like simulations of earthquakes, floods, and fires that build confidence without real-world risks.",
    },
    {
      icon: <Users size={24} />,
      title: "Admin Dashboard",
      description:
        "Comprehensive monitoring of preparedness scores, drill participation, and institutional readiness metrics.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Emergency Communication",
      description:
        "Quick access to emergency contacts and real-time alert systems for coordinated responses.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Localized Awareness",
      description:
        "Curriculum-integrated guidelines specific to regional disaster patterns and local emergency protocols.",
    },
  ];

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  const handleUserDashboard = () => {
    router.push("/userdashboard");
  };

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="logo">
            <Shield size={32} color="#ff8906" />
            <h1>DisasterEd</h1>
          </div>
          <div className="nav-buttons">
            {!accountID ? (
              <>
                <button className="sign-in-button" onClick={handleLogin}>
                  Login
                </button>
                <button className="sign-up-button" onClick={handleSignUp}>
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="sign-in-button"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="icon-container">
            <div className="icon-bg">
              <AlertTriangle size={64} color="#ff8906" />
            </div>
          </div>

          <h1 className="hero-title">
            Transform Disaster
            <br />
            <span style={{ color: "#ff8906" }}>Preparedness Education</span>
          </h1>

          <p className="hero-subtitle">
            Interactive modules and gamified learning that build confidence and
            ensure faster, coordinated emergency responses tailored to local
            risks.
          </p>

          <div className="button-group justify-center">
            <button className="primary-button" onClick={handleUserDashboard}>
              Start Learning Today
            </button>
            <button className="secondary-button">View Demo</button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-section">
        <div className="problem-container">
          <h2 className="section-title">The Challenge We&apos;re Solving</h2>
          <p className="section-text">
            Traditional disaster preparedness training relies on infrequent
            manual drills and generic guidelines. When real emergencies strike,
            panic takes over, responses are uncoordinated, and precious time is
            lost. Educational institutions need a modern, engaging approach that
            builds genuine preparedness through continuous learning and
            practice.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="section-title">Our Solution</h2>
            <p className="features-header-text">
              A comprehensive digital platform that makes disaster preparedness
              engaging, measurable, and effective through innovative technology.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="innovation-section">
        <div className="innovation-container">
          <div>
            <h2 className="section-title">
              Innovation That Makes a Difference
            </h2>
            <p className="innovation-text">
              Unlike traditional manual drills, our platform integrates
              gamification, localized awareness, and data-driven dashboards into
              a unified system. We make disaster training engaging, scalable,
              and measurable—building safer, more resilient educational
              institutions.
            </p>
            <ul className="benefits-list">
              <li className="benefit-item">
                <div className="bullet"></div>
                <span>Continuous, practical learning process</span>
              </li>
              <li className="benefit-item">
                <div className="bullet"></div>
                <span>Reduces panic and builds confidence</span>
              </li>
              <li className="benefit-item">
                <div className="bullet"></div>
                <span>Faster, coordinated responses</span>
              </li>
              <li className="benefit-item">
                <div className="bullet"></div>
                <span>Tailored to local risks and hazards</span>
              </li>
            </ul>
          </div>
          <div className="innovation-visual flex justify-center items-center">
            <div className="visual-grid">
              <div className="visual-item visual-item-1">
                <BookOpen size={32} color="#fffffe" />
              </div>
              <div className="visual-item visual-item-2">
                <Trophy size={32} color="#fffffe" />
              </div>
              <div className="visual-item visual-item-3">
                <Eye size={32} color="#fffffe" />
              </div>
              <div className="visual-item visual-item-4">
                <Users size={32} color="#fffffe" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Build Safer Institutions?</h2>
          <p className="cta-text">
            Join educational institutions worldwide in transforming disaster
            preparedness through innovative, engaging digital learning
            experiences.
          </p>
          <div className="button-group justify-center">
            <button className="primary-button">
              <Link href="/userdashboard">Get Started</Link>
            </button>
            <button className="secondary-button">Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Shield size={24} color="#ff8906" />
            <span style={{ fontWeight: "600", color: "#fffffe" }}>
              DisasterEd
            </span>
          </div>
          <p className="footer-text">
            © 2025 DisasterEd. Building resilient communities through education.
          </p>
        </div>
      </footer>
    </div>
  );
}
