import type { TailwindConfig } from '@react-email/components';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import type { ReactNode } from 'react';
import { emailTailwindConfig } from '../config/tailwind.config';
import { Footer } from './footer';
import { Header } from './header';

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
  bodyClassName = 'mx-auto my-auto bg-white font-sans text-brand-navy',
}: MainLayoutProps) => {
  return (
    <Html>
      <Head />
      {preview && <Preview>{preview}</Preview>}
      <Tailwind config={tailwindConfig}>
        <Body className={bodyClassName}>
          <Container className="mx-auto my-20 rounded-lg border border-solid border-brand-light-gray pt-9 pb-[55px] px-[52px] bg-white">
            <Header />
            {children}
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
