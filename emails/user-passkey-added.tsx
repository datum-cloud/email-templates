import 'web-streams-polyfill/polyfill';

import { Hr, Link, Row, Section, Text } from 'react-email';
import { MainLayout } from './layouts';

/**
 * Props for the passkey-added notification.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain
 * strings so the backend can populate them directly.
 */
interface UserPasskeyAddedProps {
  /** User Name */
  UserName: string;
  /** Passkey display name, set during enrollment (Phase A spec §3.3) */
  PasskeyName: string;
  /**
   * Passkey-added timestamp. The backend sends a string; this template
   * accepts either a pre-formatted display string (e.g. "Friday, May 22,
   * 2026 at 4:56 PM UTC") or a raw ISO 8601 / RFC 3339 timestamp (e.g. a K8s
   * `creationTimestamp` like "2025-12-18T16:50:22.000Z"). Raw ISO values are
   * converted to the display format; any other string is used as-is.
   */
  AddedTime: string;
  /** Browser and operating system, e.g. "Chrome 147.0.0.0 on macOS 10.15.7" */
  Browser: string;
  /** Device description, e.g. "Apple Mac" */
  Device: string;
}

/** Matches a raw ISO 8601 / RFC 3339 timestamp, e.g. "2025-12-18T16:50:22.000Z". */
const ISO_8601 =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Defensive formatting for the added-passkey timestamp.
 *
 * If the value is a raw ISO 8601 timestamp, convert it to a human-readable
 * form in UTC; otherwise return it untouched so a pre-formatted value passes
 * through. The YAML-generation placeholder token is not ISO, so it falls
 * through unchanged, leaving `{{.AddedTime}}` intact for the backend.
 */
const formatAddedTime = (value: string): string => {
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

const detailRows = (
  props: UserPasskeyAddedProps,
): ReadonlyArray<{ label: string; value: string }> => [
  { label: 'Passkey name', value: props.PasskeyName },
  { label: 'Time', value: formatAddedTime(props.AddedTime) },
  { label: 'Browser', value: props.Browser },
  { label: 'Device', value: props.Device },
];

export const UserPasskeyAdded = (props: UserPasskeyAddedProps) => {
  const previewText = 'A new passkey was added to your Datum account';
  const detailRowsData = detailRows(props);

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Text className="mt-0 text-4.5 mb-6 leading-6 font-medium">
          Hello {props.UserName},
        </Text>
        <Section className="my-6">
          <Text className="mt-0 text-4.5 mb-6 leading-6 font-normal">
            A new passkey was added to your Datum account:
          </Text>

          {detailRowsData.map((row) => (
            <Text key={row.label} className="m-0 mb-0.5 text-4.5 font-normal">
              <strong>{row.label}:</strong> {row.value}
            </Text>
          ))}

          <Text className="mt-6 mb-6 text-4.5 leading-6 font-normal">
            If you added this passkey, you don’t need to do anything.
          </Text>

          <Text className="mt-0 text-4.5 leading-6 font-normal">
            If you didn’t add this passkey,{' '}
            <Link
              href="https://cloud.datum.net/"
              className="text-brand-canyon-clay underline"
            >
              review your account
            </Link>{' '}
            and remove it now.
          </Text>
        </Section>

        <Text className="text-[14px] leading-5 font-normal m-0">
          This alert triggers whenever a passkey is registered for sign-in on
          your account.
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

UserPasskeyAdded.PreviewProps = {
  UserName: 'John Doe',
  PasskeyName: 'MacBook Pro (Touch ID)',
  // Raw ISO (e.g. a K8s creationTimestamp) — converted by formatAddedTime.
  AddedTime: '2026-05-22T16:56:00.000Z',
  Browser: 'Chrome 147.0.0.0 on macOS 10.15.7',
  Device: 'Apple Mac',
} as UserPasskeyAddedProps;

UserPasskeyAdded.Subject = 'New passkey added to your Datum account';

export default UserPasskeyAdded;
