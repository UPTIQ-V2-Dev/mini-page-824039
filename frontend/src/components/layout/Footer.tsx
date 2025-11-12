import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <span className="text-xl font-bold">TinyPage</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A simple, beautiful page built with modern web technologies.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-2">
              <a 
                href="mailto:hello@tinypage.dev" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@tinypage.dev
              </a>
              <p className="text-sm text-muted-foreground">
                Built with React & TypeScript
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TinyPage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};