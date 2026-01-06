
export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  sender: 'system' | 'user';
  text: string;
  timestamp: string;
}

export interface CardTag {
  label: string;
}

export interface ExperienceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: CardTag[];
  ctaText: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: 'globe' | 'shield' | 'sparkles';
}

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
