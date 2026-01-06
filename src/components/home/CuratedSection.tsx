import React from 'react';
import { ExperienceCard } from './ExperienceCard';
import { EXPERIENCE_CARDS } from '@/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const CuratedSection: React.FC = () => {
  return (
    <section id="experiences" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <SectionHeading
              title="Curated This Month"
              subtitle="The Collection"
              className="mb-0"
            />
            <Button variant="outline" className="hidden md:flex rounded-full px-8 border-border-subtle hover:border-text-primary">
              View Archive
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[500px]">
          {EXPERIENCE_CARDS.map((card, index) => (
            <div
              key={card.id}
              className={`${index === 0 || index === 3 ? 'lg:col-span-2' : ''}`}
            >
              <ScrollReveal delay={index * 100} className="h-full">
                <ExperienceCard data={card} index={index} />
              </ScrollReveal>
            </div>
          ))}
        </div>

        <div className="mt-16 md:hidden flex justify-center">
          <Button variant="outline" className="w-full">View Archive</Button>
        </div>
      </div>
    </section>
  );
};