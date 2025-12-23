import { Hr, Img, Section } from '@react-email/components';
import { brandConfig } from '../config/brand.config';

export interface HeaderProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
}

/**
 * Header - Standard header component with logo
 *
 * Provides a consistent header layout for all email templates
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <Section className={`${className}`}>
      <Img
        src={brandConfig.logoUrl}
        height="70"
        alt={brandConfig.name}
        className="mx-auto my-0"
      />
      <Hr className="mx-0 mt-[38px] mb-0 block border border-brand-light-gray border-solid" />
    </Section>
  );
};
