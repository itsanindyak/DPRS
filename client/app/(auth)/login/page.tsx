"use client";

import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/authContext';
import { login, me } from "@/lib/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAccountID, setAuthToken, setRole, role } = useUser();

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic checks
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      // 2. Call backend signup API

      const loginRes = await login({
        email: formData.email,
        password: formData.password,
      });

      // 3. Save in context
      setAccountID(loginRes.data.accountId);
      setAuthToken(loginRes.data.accessToken);
      setRole(loginRes.data.role);

      // console.log(meRes)

      toast.success(`Login successfully as ${loginRes.data.role}`);
      const currentRole = loginRes.data.role;

      if (currentRole === "SUPERADMIN") router.push("/adminDashboard");
      else if (currentRole === "REGIONALADMIN") router.push("/regionAdmin");
      else if (currentRole === "SCHOOLADMIN") router.push("/schoolAdmin");
      else if (currentRole === "STUDENT") router.push("/userdashboard");
      else router.push("/"); // fallback
    } catch (err: any) {
      const backendError = err.response?.data;

      if (
        backendError?.message === "Validation failed" &&
        Array.isArray(backendError.data)
      ) {
        backendError.data.forEach((e: any) => {
          toast.error(`${e.path}: ${e.message}`);
        });
      } else {
        toast.error(backendError?.message || "Something went wrong");
      }
    }
  };

  // ==========================================================================

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#0f0e17",
    color: "#fffffe",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#232323",
    borderRadius: "1rem",
    padding: "2.5rem",
    border: "1px solid #444",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  };

  const headerStyle = {
    textAlign: "center" as const,
    marginBottom: "2rem",
  };

  const logoContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fffffe",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    color: "#a7a9be",
    fontSize: "0.9rem",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  };

  const inputGroupStyle = {
    position: "relative" as const,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    color: "#fffffe",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    paddingLeft: "2.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #444",
    backgroundColor: "#0f0e17",
    color: "#fffffe",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
  };

  const inputFocusStyle = {
    borderColor: "#ff8906",
    boxShadow: "0 0 0 3px rgba(255, 137, 6, 0.1)",
  };

  const iconStyle = {
    position: "absolute" as const,
    left: "0.75rem",
    top: "2.75rem",
    color: "#a7a9be",
    pointerEvents: "none" as const,
  };

  const passwordToggleStyle = {
    position: "absolute" as const,
    right: "0.75rem",
    top: "2.75rem",
    color: "#a7a9be",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  const rememberForgotStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.5rem 0",
  };

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  };

  const checkboxStyle = {
    width: "1rem",
    height: "1rem",
    accentColor: "#ff8906",
  };

  const checkboxLabelStyle = {
    color: "#fffffe",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  const forgotLinkStyle = {
    color: "#ff8906",
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "color 0.2s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.875rem",
    borderRadius: "0.5rem",
    backgroundColor: "#ff8906",
    color: "#fffffe",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.1s",
    marginTop: "1rem",
  };

  const buttonHoverStyle = {
    backgroundColor: "#e57705",
    transform: "translateY(-1px)",
  };

  const termsStyle = {
    fontSize: "0.85rem",
    color: "#a7a9be",
    textAlign: "center" as const,
    lineHeight: "1.4",
    marginTop: "1rem",
  };

  const linkStyle = {
    color: "#ff8906",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    margin: "1.5rem 0",
    color: "#a7a9be",
    fontSize: "0.85rem",
  };

  const dividerLineStyle = {
    flex: 1,
    height: "1px",
    backgroundColor: "#444",
  };

  const dividerTextStyle = {
    padding: "0 1rem",
  };

  const signupLinkStyle = {
    textAlign: "center" as const,
    color: "#a7a9be",
    fontSize: "0.9rem",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoContainerStyle}>
            <Shield size={32} color="#ff8906" />
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#fffffe",
              }}
            >
              DisasterEd
            </span>
          </div>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>
            Sign in to continue your disaster preparedness journey
          </p>
        </div>

        <div style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="email">
              Email Address
            </label>
            <Mail size={18} style={iconStyle} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              style={inputStyle}
              value={formData.email}
              onChange={handleInputChange}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#444";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <Lock size={18} style={iconStyle} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              style={inputStyle}
              value={formData.password}
              onChange={handleInputChange}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#444";
                e.target.style.boxShadow = "none";
              }}
            />
            <div
              style={passwordToggleStyle}
              onClick={() => setShowPassword(!showPassword)}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fffffe")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#a7a9be")}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div style={rememberForgotStyle}>
            <label style={checkboxContainerStyle}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                style={checkboxStyle}
              />
              <span style={checkboxLabelStyle}>Remember me</span>
            </label>
            <a
              href="/forgot-password"
              style={forgotLinkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#e57705")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#ff8906")}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            style={buttonStyle}
            onClick={handleSubmit}
            onMouseOver={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#ff8906";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Sign In
          </button>
        </div>

        <div style={termsStyle}>
          By signing in, you agree to our{" "}
          <a
            href="#"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#e57705")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#ff8906")}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#e57705")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#ff8906")}
          >
            Privacy Policy
          </a>
        </div>

        <div style={dividerStyle}>
          <div style={dividerLineStyle}></div>
          <span style={dividerTextStyle}>or</span>
          <div style={dividerLineStyle}></div>
        </div>

        <div style={signupLinkStyle}>
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#e57705")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#ff8906")}
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}