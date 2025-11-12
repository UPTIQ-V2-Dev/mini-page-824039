import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="container relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Welcome to TinyPage
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent animate-fade-in-up">
            Simple. Beautiful.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful.
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-up animation-delay-100">
            Experience the perfect blend of simplicity and functionality. 
            Built with modern technologies for developers who care about quality.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up animation-delay-200">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
    </section>
  );
};