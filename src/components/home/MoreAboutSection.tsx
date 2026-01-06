import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { experiences } from '@/data/experiences';
import Link from 'next/link';

const articleIds = ['perfect-weekend-guide', 'michelin-star-restaurants', 'al-fahidi-district'];
const articles = articleIds.map(id => {
    const e = experiences.find(x => x.id === id);
    if (!e) return null;
    return {
        title: e.title.split(':')[0], // Simplify title for card
        subtitle: e.subtitle,
        image: e.image,
        link: `/experience/${e.slug}`
    };
}).filter(Boolean);

export const MoreAboutSection: React.FC = () => {
    return (
        <section className="py-20 bg-bg">
            <div className="container mx-auto px-6">
                <ScrollReveal>
                    <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-12">
                        More about Dubai
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <ScrollReveal key={index} delay={index * 150}>
                            <Link href={article!.link} className="block">
                                <div className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-surface hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
                                    <div className="h-[280px] overflow-hidden relative">
                                        <img
                                            src={article!.image}
                                            alt={article!.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
                                            {article!.title}
                                        </span>
                                        <h3 className="text-xl font-medium text-text-primary mb-4 group-hover:text-primary transition-colors font-serif">
                                            {article!.subtitle}
                                        </h3>
                                        <div className="w-full h-[1px] bg-border-subtle mb-4" />
                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors flex items-center gap-2 uppercase tracking-wider text-xs">
                                            Read Article <span className="text-primary group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
