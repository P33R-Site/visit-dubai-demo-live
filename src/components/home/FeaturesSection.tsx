import React from 'react';
import { Globe, Shield, Sparkles } from 'lucide-react';
import { FEATURES } from '@/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const iconMap = {
  globe: Globe,
  shield: Shield,
  sparkles: Sparkles,
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-32 relative bg-bg">
      <div className="container mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="mb-24 border-b border-border-subtle pb-12">
            <SectionHeading
              title="The Standard"
              subtitle="Philosophy"
            />
            {/* Description aligned left, pulled up slightly to sit nicely under the heading */}
            <p className="max-w-lg text-sm text-text-muted font-light leading-relaxed -mt-6">
              Redefining the parameters of luxury through technological integration.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <ScrollReveal key={feature.id} delay={index * 150}>
                <div className="group relative p-8 rounded-2xl glass hover:bg-surface-alt transition-all duration-500 border border-border-subtle hover:border-champagne-400/20">
                  <div className="flex items-center justify-between mb-8">
                    <span className="block font-serif text-5xl text-text-muted/20 group-hover:text-champagne-400 transition-colors duration-500 italic">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="p-3 rounded-full border border-white/5 bg-white/[0.02] group-hover:border-champagne-400/30 group-hover:bg-champagne-400/10 transition-colors duration-500">
                      <Icon className="w-6 h-6 text-champagne-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-text-primary mb-4 tracking-wide group-hover:text-champagne-100 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-text-muted leading-relaxed text-sm font-light border-l border-border-subtle pl-4 group-hover:border-champagne-400/50 transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};