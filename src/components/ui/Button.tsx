import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  withIcon?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  withIcon = false,
  className = '',
  href,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-surface hover:bg-primary-soft hover:text-white shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]",
    outline: "border border-white/20 text-white hover:border-white hover:bg-white/5",
    ghost: "text-white/60 hover:text-white relative after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props as any}>
        {children}
        {withIcon && <ArrowRight className="ml-3 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
      {withIcon && <ArrowRight className="ml-3 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
};