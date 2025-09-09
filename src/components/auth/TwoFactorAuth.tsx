import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";

interface TwoFactorAuthProps {
  onVerify: (code: string) => void;
  onResendCode: () => void;
  loading?: boolean;
  email: string;
}

const TwoFactorAuth = ({ onVerify, onResendCode, loading, email }: TwoFactorAuthProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Start with 30 second timer for resend
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit) && index === 5) {
      onVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("").concat(Array(6 - pastedData.length).fill("")).slice(0, 6);
      setCode(newCode);
      
      // Focus the next empty field or the last field if all are filled
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      
      // Auto-submit if all fields are filled
      if (pastedData.length === 6) {
        onVerify(pastedData);
      }
    }
  };

  const handleResend = () => {
    onResendCode();
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");

  return (
    <AuthLayout 
      title="Two-Factor Authentication" 
      subtitle={`Enter the 6-digit code sent to ${maskedEmail}`}
    >
      <div className="space-y-6">
        <div className="flex gap-3 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="\d"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-xl font-bold bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              disabled={loading}
            />
          ))}
        </div>

        <Button
          onClick={() => onVerify(code.join(""))}
          disabled={loading || code.some(digit => !digit)}
          className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            Didn't receive the code?
          </p>
          <Button
            variant="ghost"
            onClick={handleResend}
            disabled={resendTimer > 0}
            className="text-primary hover:text-primary/80 font-medium"
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
          </Button>
        </div>

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Security Tip</p>
              <p className="text-sm text-muted-foreground">
                This code expires in 10 minutes. Never share it with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default TwoFactorAuth;