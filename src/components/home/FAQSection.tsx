"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS } from '@/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-40 bg-bg border-t border-border-subtle">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <ScrollReveal>
              <SectionHeading
                title="Inquiries"
                subtitle="Details"
              />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {FAQS.map((faq, index) => (
              <ScrollReveal key={faq.id} delay={index * 50}>
                <div className={`glass rounded-xl overflow-hidden transition-all duration-500 ${openIndex === index ? 'border-champagne-400/30' : 'border-border-subtle'}`}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <span className={`font-serif text-xl transition-colors duration-300 ${openIndex === index ? 'text-champagne-400' : 'text-text-secondary group-hover:text-text-primary'}`}>
                      {faq.question}
                    </span>
                    <span className={`
                           transform transition-all duration-500 text-text-muted group-hover:text-text-primary
                           ${openIndex === index ? 'rotate-45 text-champagne-400 scale-110' : ''}
                        `}>
                      <Plus className="w-6 h-6" />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="p-8 pt-0 text-text-muted font-light leading-relaxed max-w-2xl text-sm border-l border-champagne-400/20 ml-8 mb-8 pl-6">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};