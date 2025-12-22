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
      <Hr className="mx-0 mb-[37px] mt-0 block border border-brand-light-gray border-solid" />
      <Row className="table-cell h-[22px] w-[56px]">
        <Column className="pr-[15px]">
          <Link href={brandConfig.url} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-dt.png"
              height="22"
              width="22"
              alt="Datum"
            />
          </Link>
        </Column>
        <Column className="pr-[15px]">
          <Link href={brandConfig.discordUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-dc.png"
              height="22"
              width="22"
              alt="Discord"
            />
          </Link>
        </Column>
        <Column className="pr-[15px]">
          <Link href={brandConfig.githubUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-gh.png"
              height="22"
              width="22"
              alt="GitHub"
            />
          </Link>
        </Column>
        <Column className="pr-[15px]">
          <Link href={brandConfig.youtubeUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-yt.png"
              height="22"
              width="22"
              alt="YouTube"
            />
          </Link>
        </Column>
        <Column>
          <Link href={brandConfig.linkedinUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-li.png"
              height="22"
              width="22"
              alt="LinkedIn"
            />
          </Link>
        </Column>
      </Row>
      <Text className="text-sm m-0 leading-5 font-normal mt-[29px]">
        Datum Technology Inc. <br />
        120 Broadway, 26th Floor <br />
        New York, NY 10271
      </Text>
    </Section>
  );
};
