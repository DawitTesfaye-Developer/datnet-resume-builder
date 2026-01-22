import { FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">ResumeForge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/builder" 
              className={`text-sm font-medium transition-colors ${isActive('/builder') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Builder
            </Link>
            <Link 
              to="/templates" 
              className={`text-sm font-medium transition-colors ${isActive('/templates') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Templates
            </Link>
            {user && (
              <Link
                to="/my-resumes"
                className={`text-sm font-medium transition-colors ${isActive('/my-resumes') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                My Resumes
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
            )}
            <Link to="/builder">
              <Button variant="gradient" size="sm">Create Resume</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/builder" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Builder
              </Link>
              <Link 
                to="/templates" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </Link>
              {user && (
                <Link
                  to="/my-resumes"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Resumes
                </Link>
              )}
              <div className="flex gap-3 pt-4">
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                  </Link>
                )}
                <Link to="/builder" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gradient" size="sm" className="w-full">Create Resume</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
