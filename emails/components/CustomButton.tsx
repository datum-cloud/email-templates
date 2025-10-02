import { Button } from '@react-email/components';
import type { ReactNode } from 'react';

export type CustomButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type CustomButtonSize = 'sm' | 'md' | 'lg';

export interface CustomButtonProps {
  /**
   * The URL to navigate to when clicked
   */
  href: string;
  /**
   * The button content
   */
  children: ReactNode;
  /**
   * Button style variant
   * @default 'primary'
   */
  variant?: CustomButtonVariant;
  /**
   * Button size
   * @default 'md'
   */
  size?: CustomButtonSize;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const variantClasses: Record<CustomButtonVariant, string> = {
  primary: 'bg-brand-canyon-clay text-white border-brand-canyon-clay',
  secondary: 'bg-brand-orange text-white border-brand-orange',
  outline: 'bg-white text-brand-canyon-clay border-brand-canyon-clay',
  text: 'bg-transparent text-brand-canyon-clay border-transparent',
};

const sizeClasses: Record<CustomButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
};

/**
 * EmailButton - Styled button component for email templates
 *
 * Provides consistent button styling with multiple variants and sizes.
 * Note: Hover states are intentionally not included as they have limited
 * support in email clients and can cause rendering issues.
 *
 * @example
 * ```tsx
 * <EmailButton href="https://example.com" variant="primary" size="md">
 *   Click me
 * </EmailButton>
 * ```
 */
export const CustomButton = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: CustomButtonProps) => {
  const baseClasses =
    'rounded font-medium text-center no-underline border border-solid inline-block';
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <Button href={href} className={combinedClasses}>
      {children}
    </Button>
  );
};
