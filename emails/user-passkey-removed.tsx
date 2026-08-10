import 'web-streams-polyfill/polyfill';

import { Hr, Link, Row, Section, Text } from 'react-email';
import { MainLayout } from './layouts';

/**
 * Props for the passkey-removed notification.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain
 * strings so the backend can populate them directly.
 */
interface UserPasskeyRemovedProps {
  /** User Name */
  UserName: string;
  /**
   * Passkey-removed timestamp. The backend sends a string; this template
   * accepts either a pre-formatted display string (e.g. "Jul 31, 2026 at
   * 09:14 UTC") or a raw ISO 8601 / RFC 3339 timestamp. Raw ISO values are
   * converted to the display format; any other string is used as-is.
   */
  RemovedTime: string;
  /**
   * Display name of the removed passkey. May be UNKNOWN at send time: the
   * Zitadel removal event carries only a token ID, so the name is recovered
   * from user metadata written at enrollment, and five paths can fail that
   * lookup (client not yet initialised, RPC error, key absent for a
   * pre-existing passkey, legacy bare-ISO value, malformed JSON).
   *
   * CONTRACT — the same one passkey-added uses for Browser/Device: the
   * producer ALWAYS sends this variable, as "" when the lookup fails. The row
   * below renders unconditionally (a React conditional cannot gate the
   * shipped Go template anyway — export substitutes a truthy placeholder), so
   * a degraded send shows a blank name. An OMITTED variable would be worse:
   * Go text/template renders a missing map key as literal `<no value>`.
   */
  PasskeyName?: string;
}

/** Matches a raw ISO 8601 / RFC 3339 timestamp, e.g. "2025-12-18T16:50:22.000Z". */
const ISO_8601 =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Defensive formatting for the removal timestamp.
 *
 * If the value is a raw ISO 8601 timestamp, convert it to a human-readable
 * form in UTC; otherwise return it untouched so a pre-formatted value passes
 * through. The YAML-generation placeholder token is not ISO, so it falls
 * through unchanged, leaving `{{.RemovedTime}}` intact for the backend.
 */
const formatRemovedTime = (value: string): string => {
  const trimmed = value.trim();
  if (!ISO_8601.test(trimmed)) return value;

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date);
};

export const UserPasskeyRemoved = (props: UserPasskeyRemovedProps) => {
  const previewText = 'A passkey was removed from your Datum account';

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Text className="mt-0 text-4.5 mb-6 leading-6 font-medium">
          Hello {props.UserName},
        </Text>
        <Section className="my-6">
          {/*
            The lead is identical with and without the name: the name appears
            only as a detail row, never interpolated into a sentence. A
            sentence-level interpolation would force awkward fallback copy
            ("A passkey named  was removed"), and would make the no-name path
            look degraded rather than merely shorter.
          */}
          <Text className="mt-0 text-4.5 mb-6 leading-6 font-normal">
            A passkey was removed from your account.
          </Text>

          {/*
            Unconditional, matching user-passkey-added's rows. A React
            conditional here would be decorative: export-emails.ts substitutes
            a truthy placeholder before rendering, so the SHIPPED Go template
            always carries this row. The producer sends "" when the name is
            unknown (see the prop JSDoc), which renders a blank rather than
            Go's `<no value>` marker. Ordering matches added: name, then Time.
          */}
          <Text className="m-0 mb-0.5 text-4.5 font-normal">
            <strong>Passkey name:</strong> {props.PasskeyName}
          </Text>

          <Text className="m-0 mb-0.5 text-4.5 font-normal">
            <strong>Time:</strong> {formatRemovedTime(props.RemovedTime)}
          </Text>

          <Text className="mt-6 mb-6 text-4.5 leading-6 font-normal">
            If you removed this passkey, you don’t need to do anything.
          </Text>

          <Text className="mt-0 text-4.5 leading-6 font-normal">
            If this wasn’t you,{' '}
            <Link
              href="https://cloud.datum.net/"
              className="text-brand-canyon-clay underline"
            >
              review your account
            </Link>{' '}
            and secure it now.
          </Text>
        </Section>

        <Text className="text-[14px] leading-5 font-normal m-0">
          This alert triggers whenever a passkey is removed from your account.
        </Text>

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

UserPasskeyRemoved.PreviewProps = {
  UserName: 'John Doe',
  PasskeyName: 'MacBook Pro (Touch ID)',
  // Raw ISO (e.g. a K8s creationTimestamp) — converted by formatRemovedTime.
  RemovedTime: '2026-07-31T09:14:22.000Z',
} as UserPasskeyRemovedProps;

UserPasskeyRemoved.Subject = 'A passkey was removed from your Datum account';

// SAFETY NET, not the primary mechanism. The contract says the producer always
// sends PasskeyName (as "" when unknown), so `required: true` would normally be
// fine — but if a producer ever regresses to omitting it, `required: true`
// means milo's admission webhook rejects the Email CR and NO mail goes out.
// `required: false` degrades that failure to a cosmetic `<no value>` in the
// text body instead of a silently dropped security notification.
UserPasskeyRemoved.OptionalVariables = ['PasskeyName'];

export default UserPasskeyRemoved;
