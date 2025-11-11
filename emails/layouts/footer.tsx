import {
  Column,
  Heading,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { brandConfig } from "../config/brand.config";

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
export const Footer = ({ className = "" }: FooterProps) => {
  return (
    <Section className={className}>
      <Hr className="mx-0 mb-8 mt-0 block border border-brand-light-gray border-solid" />
      <Row className="my-6 table-cell h-[44px] w-[56px]">
        <Column className="pr-2">
          <Link href={brandConfig.url} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-dt.png"
              height="18"
              width="18"
              alt="Datum"
            />
          </Link>
        </Column>
        <Column className="pr-2">
          <Link href={brandConfig.discordUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-dc.png"
              height="18"
              width="18"
              alt="Discord"
            />
          </Link>
        </Column>
        <Column className="pr-2">
          <Link href={brandConfig.githubUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-gh.png"
              height="18"
              width="18"
              alt="GitHub"
            />
          </Link>
        </Column>
        <Column className="pr-2">
          <Link href={brandConfig.youtubeUrl} target="_blank">
            <Img
              src="https://www.datum.net/download/eng/social-yt.png"
              height="18"
              width="18"
              alt="YouTube"
            />
          </Link>
        </Column>
        <Column>
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
        120 Broadway, 26th Floor <br />
        New York, NY 10271
      </Text>
    </Section>
  );
};
