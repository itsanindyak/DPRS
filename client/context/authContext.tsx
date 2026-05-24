"use client";
import { logoutAPI } from "@/lib/api";
import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  accountID: string | null;
  authToken: string | null;
  role: string | null;
  setAccountID: (id: string | null) => void;
  setAuthToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [accountID, setAccountID] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // load from localStorage on first render
  useEffect(() => {
    const storedID = localStorage.getItem("accountID");
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("role");

    if (storedID) setAccountID(storedID);
    if (storedToken) setAuthToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  // save to localStorage whenever values change
  useEffect(() => {
    if (accountID) localStorage.setItem("accountID", accountID);
    else localStorage.removeItem("accountID");

    if (authToken) localStorage.setItem("authToken", authToken);
    else localStorage.removeItem("authToken");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [accountID, authToken, role]);

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setAccountID(null);
      setRole(null);
    }
  };

  return (
    <UserContext.Provider
      value={{ accountID, authToken, role, setAccountID, setAuthToken, setRole, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
