import { Hr, Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './CustomButton';

/**
 * Body of the account-recovery mail, shared by the self-serve and the
 * support-initiated templates.
 *
 * `variant` is a COMPILE-TIME choice made by the template file that renders
 * this component. It is not a template variable: export-emails.ts renders each
 * template once with placeholder props, so the shipped Go template cannot
 * branch on a runtime value (see user-passkey-removed.tsx). Two template
 * files, one body, is how the copy differs without a Go conditional.
 *
 * The variants share every line except the typed-code paragraph and the
 * closing "didn't request this" line. Only the self-serve mail offers a code
 * to type: that path reads userId/codeId from the sealed ticket POST /recover
 * sets on the requesting device, and a support-created link never sets one, so
 * a code in the support mail would work through the link and nowhere else.
 *
 * The PascalCase props map 1:1 to Go template variables (`{{.Prop}}`).
 * UserName, ActionUrl and ExpiryMinutes are rendered as VISIBLE text by both
 * variants, so generate-yaml.js infers `required: true` for all three in both
 * CRs. `Code` is rendered by the self-serve variant only, and that asymmetry
 * is the point: the support template keeps Code in its PreviewProps so the CR
 * still DECLARES it — with `required: false`, since neither of its bodies
 * references it — which is what lets milo's Email admission webhook accept the
 * Code that zitadel-provider always sends, without the support body having to
 * print it.
 */
export interface AccountRecoveryBodyProps {
  variant: 'self' | 'support';
  /** Display name, or the login name when no display name is set. */
  UserName: string;
  /** The registration code, e.g. "K7QM2XD4" — typeable on the device that asked. */
  Code: string;
  /** Link to auth-ui's /recover/complete, built by zitadel-provider from its own config. */
  ActionUrl: string;
  /** Code lifetime in minutes, from zitadel-provider config; mirrors Zitadel's setting. */
  ExpiryMinutes: string;
}

export const AccountRecoveryBody = (props: AccountRecoveryBodyProps) => {
  const support = props.variant === 'support';

  return (
    <Section className="my-10.5">
      <Text className="mt-0 text-4.5 mb-6 leading-6 font-medium">
        Hi {props.UserName},
      </Text>
      <Section className="my-6">
        <Text className="mt-0 text-4.5 mb-6 leading-6 font-normal">
          As requested, here's your link to set up a new passkey for your Datum
          account. Just open the link below on the device you'd like to sign in
          with, then follow the prompts to create it.
        </Text>

        <CustomButton
          href={props.ActionUrl}
          className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
        >
          Set up a new passkey
        </CustomButton>

        {/*
          The raw URL must be VISIBLE text, not only an href: the text body is
          derived from the HTML body, and a variable that only reaches the HTML
          via an attribute never lands in the text body — the generator would
          then infer `required: false` for it.
        */}
        <Text className="mt-0 mb-6 text-4.5 leading-6 font-normal">
          Or copy and paste this link into your browser:{' '}
          <Link
            href={props.ActionUrl}
            className="text-brand-canyon-clay underline break-all"
          >
            {props.ActionUrl}
          </Link>
        </Text>

        {/*
          Self-serve only — see the note on AccountRecoveryBodyProps. Dropping
          these two lines is what leaves `Code` unreferenced in the support
          bodies, and so declared `required: false` in that CR.
        */}
        {!support && (
          <>
            <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
              Started this on another device? Enter this code there instead:
            </Text>
            <Text className="m-0 mb-6 text-[24px] leading-8 font-semibold tracking-[6px]">
              {props.Code}
            </Text>
          </>
        )}

        <Text className="mt-0 mb-6 text-4.5 leading-6 font-normal">
          {support ? 'The link expires' : 'The link and code expire'} in{' '}
          {props.ExpiryMinutes} minutes and can only be used once.
        </Text>

        <Text className="mt-0 mb-6 text-4.5 leading-6 font-normal">
          Good news — your existing passkeys keep working, this just adds a new
          one.
        </Text>

        <Text className="mt-0 text-4.5 leading-6 font-normal">
          {support
            ? "Didn't contact Datum Support? You can safely ignore this email — nothing about your account will change — but please let us know at support@datum.net."
            : "Didn't request this? No worries, you can safely ignore this email. Nothing about your account will change."}
        </Text>
      </Section>

      <Row>
        <Hr className="mx-0 my-10.5 block border border-brand-light-gray border-solid" />
        <Text className="m-0 text-[21px] leading-7 font-semibold">
          We’re here to help
        </Text>
        <Text className="m-0 my-[12px] text-4.5 leading-6 font-normal">
          Please do not reply to this message. If you need help, send us a note
          at
        </Text>

        <Link
          href="mailto:support@datum.net"
          className="text-brand-canyon-clay underline m-0 text-4.5 font-semibold"
        >
          support@datum.net
        </Link>
      </Row>
    </Section>
  );
};
