import 'web-streams-polyfill/polyfill';

import { Hr, Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

/**
 * Props for the email-verification message.
 *
 * Each PascalCase key maps 1:1 to a Go template variable (`{{.PropName}}`) and
 * is emitted into the EmailTemplate `variables:` block by
 * `scripts/generate-yaml.js`. All four are required and all four are referenced
 * in both the HTML and text bodies, which is what makes them `required: true`
 * under the generator's inference rule.
 *
 * Rendered from Zitadel's STRUCTURED args, not from its pre-rendered body:
 * Wave 0's probe confirmed the HTTP email provider sends both, so the wording
 * below is ours. See plans/…-wave0-findings.md §W0-1 Q2.
 */
interface UserEmailVerificationProps {
  /** Display name, or the login name when no display name is set. */
  UserName: string;
  /** The bare verification code, e.g. "WL7S2F". Shown as a fallback for clients that mangle links. */
  Code: string;
  /**
   * Verification link on auth-ui. Built by zitadel-provider from its own
   * config — deliberately NOT Zitadel's templateData.url, which targets
   * Zitadel's built-in login UI (/ui/login/mail/verification) that auth-ui
   * replaces.
   */
  ActionUrl: string;
  /**
   * Code lifetime in minutes. Sourced from zitadel-provider config, NOT from
   * the payload — Zitadel transmits no expiry. It mirrors Zitadel's configured
   * lifetime and will drift silently if that setting changes.
   */
  ExpiryMinutes: string;
}

export const UserEmailVerification = (props: UserEmailVerificationProps) => {
  const previewText = 'Verify your email address to get started with Datum';

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Text className="mt-0 text-4.5 mb-6 leading-6 font-medium">
          Welcome to Datum, {props.UserName},
        </Text>
        <Section className="my-6">
          <Text className="mt-0 text-4.5 mb-6 leading-6 font-normal">
            To finish setting up your Datum account, click the button below to verify this email address.
          </Text>

          <CustomButton
            href={props.ActionUrl}
            className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
          >
            Verify email
          </CustomButton>

          {/*
            The raw URL must appear as VISIBLE text, not only inside href:
            the text body is derived from the HTML body, and a variable that
            only reaches the HTML via an attribute never lands in the text
            body — the generator would then infer `required: false` for it.
            A visible fallback link is standard transactional-mail practice
            anyway, for clients that strip or mangle buttons.
          */}
          <Text className="mt-0 mb-6 text-4.5 leading-6 font-normal">
            Or, copy and paste this link into your browser:{' '}
            <Link
              href={props.ActionUrl}
              className="text-brand-canyon-clay underline break-all"
            >
              {props.ActionUrl}
            </Link>
          </Text>

          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            If you'd rather use a code, just enter:
          </Text>
          <Text className="m-0 mb-6 text-[24px] leading-8 font-semibold tracking-[6px]">
            {props.Code}
          </Text>

          <Text className="mt-0 mb-6 text-4.5 leading-6 font-normal">
            The link and code will expire in {props.ExpiryMinutes} minutes.
          </Text>

          <Text className="mt-0 text-4.5 leading-6 font-normal">
            If you didn’t create a Datum account, you can safely ignore this
            email — the account can’t be used until this address is verified.
          </Text>
        </Section>

        <Row>
          <Hr className="mx-0 my-10.5 block border border-brand-light-gray border-solid" />
          <Text className="m-0 text-[21px] leading-7 font-semibold">
            We’re here to help
          </Text>
          <Text className="m-0 my-[12px] text-4.5 leading-6 font-normal">
            Please do not reply to this message. If you need help, send us a
            note at
          </Text>

          <Link
            href="mailto:support@datum.net"
            className="text-brand-canyon-clay underline m-0 text-4.5 font-semibold"
          >
            support@datum.net
          </Link>
        </Row>
      </Section>
    </MainLayout>
  );
};

UserEmailVerification.PreviewProps = {
  UserName: 'Wave Two',
  Code: 'WL7S2F',
  ActionUrl:
    'https://auth.datum.net/verify-email?code=WL7S2F&userID=349828036672626689',
  ExpiryMinutes: '15',
} as UserEmailVerificationProps;

UserEmailVerification.Subject = 'Verify your email address for Datum';

export default UserEmailVerification;
