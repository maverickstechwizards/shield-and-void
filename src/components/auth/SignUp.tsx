import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, X } from "lucide-react";
import AuthLayout from "./AuthLayout";

interface SignUpProps {
  onSignUp: (email: string, password: string, name: string) => void;
  onSwitchToSignIn: () => void;
  loading?: boolean;
}

const SignUp = ({ onSignUp, onSwitchToSignIn, loading }: SignUpProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    { text: "At least 8 characters", valid: password.length >= 8 },
    { text: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", valid: /[a-z]/.test(password) },
    { text: "Contains number", valid: /\d/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every(req => req.valid);
  const doPasswordsMatch = password === confirmPassword;
  const isFormValid = name && email && isPasswordValid && doPasswordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSignUp(email, password, name);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join us and get started today"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-border focus:border-primary focus:ring-primary"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background border-border focus:border-primary focus:ring-primary"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary pr-10"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {password && (
            <div className="mt-3 space-y-2">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {req.valid ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <X size={16} className="text-destructive" />
                  )}
                  <span className={req.valid ? "text-success" : "text-muted-foreground"}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary pr-10"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {confirmPassword && (
            <div className="flex items-center gap-2 text-sm mt-2">
              {doPasswordsMatch ? (
                <Check size={16} className="text-success" />
              ) : (
                <X size={16} className="text-destructive" />
              )}
              <span className={doPasswordsMatch ? "text-success" : "text-destructive"}>
                {doPasswordsMatch ? "Passwords match" : "Passwords don't match"}
              </span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;