"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "http://localhost:4000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true to check token on mount
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile using token
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token is invalid or expired
        localStorage.removeItem("authToken");
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      console.error("Error fetching user profile:", err);
      localStorage.removeItem("authToken");
      return null;
    }
  };

  // Check for existing token and fetch user on component mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken");
      
      if (token) {
        const userData = await fetchUserProfile(token);
        if (userData) {
          setUser(userData);
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const clearError = () => {
    setError(null);
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      // Store only the token
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // Set user from response
      if (data.user) {
        setUser({
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      // Set user from sign up response (if provided) or from form data
      const userData: User = {
        id: data.user?.id || 0,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      setUser(userData);
      
      // Note: The signup endpoint doesn't return a token, so user needs to sign in after
      // If your backend changes to return a token on signup, add:
      // if (data.token) {
      //   localStorage.setItem("authToken", data.token);
      // }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("authToken");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
