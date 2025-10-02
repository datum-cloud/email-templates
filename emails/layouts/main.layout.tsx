import type { TailwindConfig } from '@react-email/components';
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import type { ReactNode } from 'react';
import { emailTailwindConfig } from '../config/tailwind.config';
import { Header } from './header';
import { Footer } from './footer';

export interface MainLayoutProps {
  /**
   * The content of the email
   */
  children: ReactNode;
  /**
   * Preview text shown in email client before opening
   */
  preview?: string;
  /**
   * Optional Tailwind config override
   * Defaults to emailTailwindConfig
   */
  tailwindConfig?: TailwindConfig;
  /**
   * Background color for the email body
   * @default 'bg-neutral-50'
   */
  bodyClassName?: string;
}

/**
 * EmailLayout - Base wrapper for all email templates
 *
 * This component provides:
 * - Consistent HTML structure
 * - Centralized Tailwind configuration
 * - Preview text support
 * - Configurable body styling
 *
 * @example
 * ```tsx
 * <MainLayout preview="Welcome to our platform">
 *     <Text>Email content here</Text>
 * </MainLayout>
 * ```
 */
export const MainLayout = ({
  children,
  preview,
  tailwindConfig = emailTailwindConfig,
  bodyClassName = 'mx-auto my-auto bg-white font-sans',
}: MainLayoutProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Alliance No1"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://www.datum.net/fonts/datum/allianceno1-semibold-webfont.woff2',
            format: 'woff2',
          }}
          fontWeight={600}
          fontStyle="normal"
        />

        <Font
          fontFamily="Alliance No1"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://www.datum.net/fonts/datum/allianceno1-medium-webfont.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Alliance No1"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://www.datum.net/fonts/datum/allianceno1-regular-webfont.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Tailwind config={tailwindConfig}>
        <Body className={bodyClassName}>
          <Container className="mx-auto my-20 rounded-lg border border-solid border-brand-light-gray py-9 px-10 bg-white">
            <Header />
            {children}
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
