import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { brandConfig } from '../config/brand.config';

export interface FooterProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Footer - Standard footer component
 *
 * Provides a consistent footer layout with links and company info
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export const Footer = ({ className = '' }: FooterProps) => {
  return (
    <Section className={className}>
      <Hr className="mx-0 mb-8 mt-0 block border border-brand-light-gray border-solid" />

      <Text className="text-sm m-0 font-light mb-6">
        Datum unlocks cloud superpowers, without getting in the way. Find out
        more about Datum at{' '}
        <Link
          href={brandConfig.url}
          className="text-sm font-light underline text-brand-canyon-clay"
        >
          datum.net
        </Link>
      </Text>
      <Row className="my-6">
        <Column className="flex items-center gap-2">
          <Link href={brandConfig.githubUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-gh.png"
              height="18"
              width="18"
              alt="GitHub"
            />
          </Link>
          <Link href={brandConfig.linkedinUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-li.png"
              height="18"
              width="18"
              alt="LinkedIn"
            />
          </Link>
        </Column>
      </Row>
      <Text className="text-sm m-0 font-light">
        Datum Technology Inc. <br />
        29 Broadway <br />
        New York City <br />
        NY, 10006
      </Text>
    </Section>
  );
};
