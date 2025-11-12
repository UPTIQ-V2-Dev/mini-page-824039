import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/useTheme';
import { useState } from 'react';
import { isAuthenticated, getStoredUser, clearAuthData } from '../../lib/api';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = isAuthenticated();
  const user = getStoredUser();

  const handleLogout = () => {
    clearAuthData();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
          <span className="text-xl font-bold">TinyPage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Authentication Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name || user?.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            {/* Authentication Buttons - Mobile */}
            <div className="mt-4 pt-4 border-t">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Welcome, {user?.name || user?.email}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="mt-2 w-full justify-start"
            >
              {isDark ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Mode
                </>
              )}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};