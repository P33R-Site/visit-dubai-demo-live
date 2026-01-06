import React from 'react';
import { Check } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '@/constants';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const MembershipSection: React.FC = () => {
  return (
    <section id="membership" className="py-40 relative bg-bg overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="mb-20 text-left md:text-center">
            <SectionHeading
              title="Membership"
              subtitle="Access Levels"
              alignment="center"
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MEMBERSHIP_TIERS.map((tier, index) => (
            <ScrollReveal key={tier.id} delay={index * 200}>
              <div className="relative group perspective-1000 h-full">
                <div
                  className={`
                    relative h-full p-10 lg:p-14 rounded-xl overflow-hidden transition-all duration-700 hover:-translate-y-2 glass-card
                    ${tier.highlight
                      ? 'border-primary/40 shadow-[0_0_50px_-20px_rgba(255,255,255,0.1)]'
                      : 'border-border-subtle'}
                  `}
                >
                  {/* Metallic Sheen */}
                  <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                  {tier.highlight && <div className="absolute inset-0 bg-metal-sheen opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />}

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <h3 className={`font-serif text-3xl italic ${tier.highlight ? 'text-primary' : 'text-text-primary'}`}>{tier.name}</h3>
                        {tier.highlight && <span className="text-[10px] px-2 py-1 border border-primary text-primary uppercase tracking-widest rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]">Limited</span>}
                      </div>

                      <div className="mb-10">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-light tracking-tight text-text-primary">{tier.price}</span>
                          <span className="text-xs text-text-muted uppercase tracking-widest">{tier.period}</span>
                        </div>
                        <p className="mt-4 text-sm text-text-secondary font-light leading-relaxed">
                          {tier.description}
                        </p>
                      </div>

                      <ul className="space-y-4 mb-12">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 group/item">
                            <Check className={`w-4 h-4 mt-0.5 ${tier.highlight ? 'text-primary' : 'text-text-muted group-hover/item:text-text-primary transition-colors'}`} />
                            <span className="text-sm text-text-secondary font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant={tier.highlight ? 'primary' : 'outline'}
                      className={`w-full ${tier.highlight ? 'bg-primary text-surface hover:bg-primary-soft' : ''}`}
                    >
                      {tier.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};