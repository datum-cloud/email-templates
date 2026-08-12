import 'web-streams-polyfill/polyfill';

import { Hr, Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

/**
 * Props for the password-reset message.
 *
 * Each PascalCase key maps 1:1 to a Go template variable (`{{.PropName}}`) and
 * is emitted into the EmailTemplate `variables:` block by
 * `scripts/generate-yaml.js`. All four are required and all four are referenced
 * in both the HTML and text bodies.
 *
 * This template exists because Zitadel email providers are mutually
 * exclusive: activating the HTTP provider (Phase B's delivery channel) stops
 * ALL SMTP mail, including password reset. Without this template, activation
 * would break password reset platform-wide — auth-ui exposes /login/password,
 * /signup/password and /password/reset, so the flow is real.
 */
interface UserPasswordResetProps {
  /** Display name, or the login name when no display name is set. */
  UserName: string;
  /** The bare reset code. Shown as a fallback for clients that mangle links. */
  Code: string;
  /**
   * Reset link on auth-ui (/password/new with code and userId params). Built
   * by zitadel-provider from its own config — deliberately NOT Zitadel's
   * templateData.url, which targets Zitadel's built-in login UI
   * (/ui/login/password/init) that auth-ui replaces.
   */
  ActionUrl: string;
  /**
   * Code lifetime in minutes. Sourced from zitadel-provider config, NOT from
   * the payload — Zitadel transmits no expiry. It mirrors Zitadel's configured
   * lifetime and will drift silently if that setting changes.
   */
  ExpiryMinutes: string;
}

export const UserPasswordReset = (props: UserPasswordResetProps) => {
  const previewText = 'Reset the password for your Datum account';

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Text className="mt-0 text-4.5 mb-6 leading-6 font-medium">
          Hi {props.UserName},
        </Text>
        <Section className="my-6">
          <Text className="mt-0 text-4.5 mb-6 leading-6 font-normal">
            We just received a request to reset the password for your Datum Account.
          </Text>

          <CustomButton
            href={props.ActionUrl}
            className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
          >
            Reset password
          </CustomButton>

          {/*
            The raw URL must appear as VISIBLE text, not only inside href:
            the text body is derived from the HTML body, and a variable that
            only reaches the HTML via an attribute never lands in the text
            body — the generator would then infer `required: false` for it.
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

          {/*
            Escalation register, not the benign "you can ignore this": an
            unrequested password-reset email means someone else entered this
            address into the reset form — a security signal the recipient
            should act on, matching user-suspicious.tsx rather than
            user-email-verification.tsx.
          */}
          <Text className="mt-0 text-4.5 leading-6 font-normal">
            If you didn't request this reset, please {' '}<Link
              href="https://cloud.datum.net/"
              className="text-brand-canyon-clay underline"
            >
              log into your account
            </Link>{' '}and secure it now.
          </Text>
        </Section>
      </Section>
    </MainLayout>
  );
};

UserPasswordReset.PreviewProps = {
  UserName: 'Wave Two',
  Code: 'XR4T9K',
  ActionUrl:
    'https://auth.datum.net/password/new?code=XR4T9K&userId=349828036672626689',
  // NOT '60': generate-yaml.js find-replaces the literal PreviewProps value
  // anywhere in the rendered HTML, and '60' matches the '600' inside
  // font-weight:600, corrupting styles into {{.ExpiryMinutes}}0. '15' is
  // verified collision-free against this layout (user-email-verification uses
  // it too). The real lifetime comes from zitadel-provider config regardless.
  ExpiryMinutes: '15',
} as UserPasswordResetProps;

UserPasswordReset.Subject = 'Reset the password for your Datum account';

export default UserPasswordReset;
