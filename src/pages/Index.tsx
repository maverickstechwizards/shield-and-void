import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import TwoFactorAuth from "@/components/auth/TwoFactorAuth";
import Dashboard from "./Dashboard";

type AuthStep = "signin" | "signup" | "2fa" | "dashboard";

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [authStep, setAuthStep] = useState<AuthStep>("signin");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tempEmail, setTempEmail] = useState("");
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setTempEmail(email);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Authentication code sent",
        description: `A verification code has been sent to ${email}`,
      });
      setAuthStep("2fa");
    }, 1500);
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setTempEmail(email);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setUser({ name, email });
      toast({
        title: "Account created successfully",
        description: `Welcome ${name}! Please verify your account with 2FA.`,
      });
      setAuthStep("2fa");
    }, 2000);
  };

  const handleTwoFactorVerify = async (code: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes, accept any 6-digit code
      if (code.length === 6) {
        if (!user) {
          // If coming from sign in, create a demo user
          setUser({ name: "Demo User", email: tempEmail });
        }
        toast({
          title: "Verification successful",
          description: "Welcome! You're now signed in securely.",
        });
        setAuthStep("dashboard");
      } else {
        toast({
          title: "Invalid code",
          description: "Please enter a valid 6-digit code.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleResendCode = () => {
    toast({
      title: "Code resent",
      description: `A new verification code has been sent to ${tempEmail}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setTempEmail("");
    setAuthStep("signin");
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  switch (authStep) {
    case "signin":
      return (
        <SignIn
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setAuthStep("signup")}
          loading={loading}
        />
      );

    case "signup":
      return (
        <SignUp
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setAuthStep("signin")}
          loading={loading}
        />
      );

    case "2fa":
      return (
        <TwoFactorAuth
          onVerify={handleTwoFactorVerify}
          onResendCode={handleResendCode}
          loading={loading}
          email={tempEmail}
        />
      );

    case "dashboard":
      return user ? (
        <Dashboard
          user={user}
          onLogout={handleLogout}
        />
      ) : null;

    default:
      return null;
  }
};

export default Index;
