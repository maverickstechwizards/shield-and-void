import { Button } from "@/components/ui/button";
import { LogOut, Shield, User } from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">SecureApp</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{user.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-success rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-glow">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Welcome, {user.name}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You've successfully signed in with two-factor authentication. Your account is now secure and ready to use.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">2FA Enabled</h3>
              <p className="text-sm text-muted-foreground">Your account is protected with two-factor authentication</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Profile Active</h3>
              <p className="text-sm text-muted-foreground">Your user profile is set up and verified</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ready to Go</h3>
              <p className="text-sm text-muted-foreground">Start exploring your secure dashboard</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Full Name</span>
                <span className="text-foreground font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Email Address</span>
                <span className="text-foreground font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Security Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-success font-medium">Secure (2FA Active)</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Last Login</span>
                <span className="text-foreground font-medium">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;