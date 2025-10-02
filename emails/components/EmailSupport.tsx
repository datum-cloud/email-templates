import { Heading, Hr, Link, Row, Section, Text } from '@react-email/components';
import { brandConfig } from '../config/brand.config';

export interface EmailSupportProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
}

/**
 * EmailHeader - Standard header component with logo
 *
 * Provides a consistent header layout for all email templates
 *
 * @example
 * ```tsx
 * <EmailHeader />
 * ```
 */
export const EmailSupport = ({ className = '' }: EmailSupportProps) => {
  return (
    <Section className={`${className}`}>
      <Hr className="mx-0 mb-8 mt-0 block border border-brand-light-gray border-solid" />
      <Row>
        <Heading as="h3" className="text-xl mt-0 mb-4 font-medium">
          We&apos;re here to help
        </Heading>
        <Text className="text-sm mb-2 mt-0 font-light ">
          If you have any questions reach out and we&apos;ll do our best to help
        </Text>
        <Link
          href={`mailto:${brandConfig.supportEmail}`}
          className="text-sm font-light underline text-brand-canyon-clay"
        >
          {brandConfig.supportEmail}
        </Link>
      </Row>
    </Section>
  );
};
