import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import type { Feature } from '../../types/content';

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.Star;

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-background to-muted mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`h-6 w-6 ${feature.color}`} />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
};