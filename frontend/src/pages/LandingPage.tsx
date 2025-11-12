import { useQuery } from '@tanstack/react-query';
import { Hero } from '../components/sections/Hero';
import { FeatureCard } from '../components/features/FeatureCard';
import { getFeatures } from '../services/contentService';
import { Skeleton } from '../components/ui/skeleton';

export const LandingPage = () => {
  const { data: featuresData, isLoading, error } = useQuery({
    queryKey: ['features'],
    queryFn: getFeatures
  });

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why Choose TinyPage?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built with modern technologies and best practices to deliver exceptional user experience.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-6 border rounded-lg">
                  <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Failed to load features. Please try again later.</p>
              </div>
            ) : (
              featuresData?.features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of developers who have already discovered the power of simplicity.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Start Building Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};