"use client";

import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Mail, Lock, User, School } from 'lucide-react';
import { login, signup } from '@/lib/api';
import { useUser } from '@/context/authContext';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setAccountID, setAuthToken, setRole ,role} = useUser();

  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName :"",
    email: '',
    schoolName: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic checks
    if (!formData.fullName||  !formData.email || !formData.schoolName || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // 2. Call backend signup API
      const res = await signup({
        email: formData.email,
        schoolName: formData.schoolName,
        password: formData.password,
      });

      // const loginRes = await login({
      //   email: formData.email,
      //   password: formData.password
      // })
   

      // 3. Save in context
      setAccountID(res.accountId);
      setAuthToken(res.accessToken);
      setRole(res.role); 

      console.log("Current Role ",role)

      console.log("Signup success:", res.data.role);
      alert("Signup successful!");

      router.push("/login")
    } catch (err: any) {
        const backendError = err.response?.data;

        if (backendError?.message === "Validation failed" && Array.isArray(backendError.data)) {
          backendError.data.forEach((e: any) => {
            toast.error(`${e.path}: ${e.message}`);
          });
        } else {
          toast.error(backendError?.message || "Something went wrong");
        }
    }
  };


  //=================================

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f0e17',
    color: '#fffffe',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  const cardStyle = {
    backgroundColor: '#232323',
    borderRadius: '1rem',
    padding: '2.5rem',
    border: '1px solid #444',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '2rem'
  };

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fffffe',
    marginBottom: '0.5rem'
  };
  const subTitleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fffffe',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    color: '#a7a9be',
    fontSize: '0.9rem'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  };

  const inputGroupStyle = {
    position: 'relative' as const
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#fffffe',
    fontSize: '0.9rem',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    paddingLeft: '2.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #444',
    backgroundColor: '#0f0e17',
    color: '#fffffe',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box' as const
  };

  const inputFocusStyle = {
    borderColor: '#ff8906',
    boxShadow: '0 0 0 3px rgba(255, 137, 6, 0.1)'
  };

  const iconStyle = {
    position: 'absolute' as const,
    left: '0.75rem',
    top: '2.75rem',
    color: '#a7a9be',
    pointerEvents: 'none' as const
  };

  const passwordToggleStyle = {
    position: 'absolute' as const,
    right: '0.75rem',
    top: '2.75rem',
    color: '#a7a9be',
    cursor: 'pointer',
    transition: 'color 0.2s'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.875rem',
    borderRadius: '0.5rem',
    backgroundColor: '#ff8906',
    color: '#fffffe',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    marginTop: '1rem'
  };

  const buttonHoverStyle = {
    backgroundColor: '#e57705',
    transform: 'translateY(-1px)'
  };

  const termsStyle = {
    fontSize: '0.85rem',
    color: '#a7a9be',
    textAlign: 'center' as const,
    lineHeight: '1.4',
    marginTop: '1rem'
  };

  const linkStyle = {
    color: '#ff8906',
    textDecoration: 'none',
    transition: 'color 0.2s'
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: '#a7a9be',
    fontSize: '0.85rem'
  };

  const dividerLineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: '#444'
  };

  const dividerTextStyle = {
    padding: '0 1rem'
  };

  const loginLinkStyle = {
    textAlign: 'center' as const,
    color: '#a7a9be',
    fontSize: '0.9rem'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoContainerStyle}>
            <Shield size={32} color="#ff8906" />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fffffe' }}>
              DisasterEd
            </span>
          </div>
          <h1 style={titleStyle}>Create Account</h1>
          <h2 style={subTitleStyle}>Student Registration Only</h2>
          <p style={subtitleStyle}>Join us to start your disaster preparedness journey</p>
        </div>

        <div style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="fullName">Full Name</label>
            <User size={18} style={iconStyle} />
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              style={inputStyle}
              value={formData.fullName}
              onChange={handleInputChange}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="email">Email Address</label>
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
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="schoolName">Institution</label>
            <School size={18} style={iconStyle} />
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              placeholder="Enter your school/institution"
              style={inputStyle}
              value={formData.schoolName}
              onChange={handleInputChange}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="password">Password</label>
            <Lock size={18} style={iconStyle} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Create a password"
              style={inputStyle}
              value={formData.password}
              onChange={handleInputChange}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div
              style={passwordToggleStyle}
              onClick={() => setShowPassword(!showPassword)}
              onMouseOver={(e) => e.currentTarget.style.color = '#fffffe'}
              onMouseOut={(e) => e.currentTarget.style.color = '#a7a9be'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
            <Lock size={18} style={iconStyle} />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              style={inputStyle}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div
              style={passwordToggleStyle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onMouseOver={(e) => e.currentTarget.style.color = '#fffffe'}
              onMouseOut={(e) => e.currentTarget.style.color = '#a7a9be'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button
            type="button"
            style={buttonStyle}
            onClick={handleSubmit}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ff8906';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Create Account
          </button>
        </div>

        <div style={termsStyle}>
          By creating an account, you agree to our{' '}
          <a 
            href="#" 
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = '#e57705'}
            onMouseOut={(e) => e.currentTarget.style.color = '#ff8906'}
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a 
            href="#" 
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = '#e57705'}
            onMouseOut={(e) => e.currentTarget.style.color = '#ff8906'}
          >
            Privacy Policy
          </a>
        </div>

        <div style={dividerStyle}>
          <div style={dividerLineStyle}></div>
          <span style={dividerTextStyle}>or</span>
          <div style={dividerLineStyle}></div>
        </div>

        <div style={loginLinkStyle}>
          Already have an account?{' '}
          <a 
            href="/login" 
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = '#e57705'}
            onMouseOut={(e) => e.currentTarget.style.color = '#ff8906'}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}