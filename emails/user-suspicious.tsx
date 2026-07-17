import "web-streams-polyfill/polyfill";

import { Column, Hr, Link, Row, Section, Text } from "react-email";
import { CustomButton, EmailSignoff, EmailSupport } from "./components";
import { brandConfig } from "./config/brand.config";
import { MainLayout } from "./layouts";

/**
 * Props for the suspicious sign-in notification.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 */
interface UserSuspiciousProps {
  /** User Name */
  UserName: string;
  /** User Email */
  Email: string;
  /** Resolved geo-location of the sign-in, e.g. "Jacksonville, Vermont, United States" */
  Location: string;
  /**
   * Sign-in timestamp. The backend sends a string; this template accepts
   * either a pre-formatted display string (e.g. "Friday, May 22, 2026 at
   * 4:56 PM UTC") or a raw ISO 8601 / RFC 3339 timestamp (e.g. a K8s
   * `creationTimestamp` like "2025-12-18T16:50:22.000Z"). Raw ISO values are
   * converted to the display format; any other string is used as-is.
   */
  SignInTime: string;
  /** Browser and operating system, e.g. "Chrome 147.0.0.0 on macOS 10.15.7" */
  Browser: string;
  /** Device description, e.g. "Apple Mac" */
  Device: string;
  /** Source IP address of the sign-in, e.g. "23.138.82.66" */
  IpAddress: string;
}

/** Matches a raw ISO 8601 / RFC 3339 timestamp, e.g. "2025-12-18T16:50:22.000Z". */
const ISO_8601 =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Defensive formatting for the sign-in timestamp.
 *
 * If the value is a raw ISO 8601 timestamp, convert it to a human-readable
 * form in UTC; otherwise return it untouched so a pre-formatted value passes
 * through. The YAML-generation placeholder token is not ISO, so it falls
 * through unchanged, leaving `{{.SignInTime}}` intact for the backend.
 */
const formatSignInTime = (value: string): string => {
  const trimmed = value.trim();
  if (!ISO_8601.test(trimmed)) return value;

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
};

const detailRows = (
  props: UserSuspiciousProps,
): ReadonlyArray<{ label: string; value: string }> => [
  { label: "Location", value: props.Location },
  { label: "Time", value: formatSignInTime(props.SignInTime) },
  { label: "Browser", value: props.Browser },
  { label: "Device", value: props.Device },
  { label: "IP address", value: props.IpAddress },
];

export const UserSuspicious = (props: UserSuspiciousProps) => {
  const previewText = "New sign-in detected on your Datum account";
  const detailRowsData = detailRows(props);

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Text className="mt-0 text-4.5 mb-6 leading-6 font-medium">
          Hello {props.UserName},
        </Text>
        <Section className="my-6">
          <Text className="mt-0 text-4.5 mb-6 leading-6 font-normal">
            Your Datum account{" "}
            <Link
              href={`mailto:${props.Email}`}
              className="font-semibold text-brand-navy"
            >
              {props.Email}
            </Link>{" "}
            was recently signed-in from a new location, device or browser:
          </Text>

          {detailRowsData.map((row) => (
            <Text key={row.label} className="m-0 mb-0.5 text-4.5 font-normal">
              <strong>{row.label}:</strong> {row.value}
            </Text>
          ))}

          <Text className="mt-6 mb-6 text-4.5 leading-6 font-normal">
            If you recognize this activity, you don't need to do anything.
          </Text>

          <Text className="mt-0 text-4.5 leading-6 font-normal">
            If this wasn't you,{" "}
            <Link
              href="https://cloud.datum.net/"
              className="text-brand-canyon-clay underline"
            >
              review your account
            </Link>{" "}
            and change your authentication methods now.
          </Text>
        </Section>

        <Text className="text-[14px] leading-5 font-normal m-0">
          This alert triggers when we detect a sign-in from an unrecognized
          location, device, or browser. Common causes: traveling, VPN or Private
          Relay, or a new browser.
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

UserSuspicious.PreviewProps = {
  UserName: "John Doe",
  Email: "john.doe@datum.net",
  Location: "Jacksonville, Vermont, United States",
  // Raw ISO (e.g. a K8s creationTimestamp) — converted by formatSignInTime.
  SignInTime: "2026-05-22T16:56:00.000Z",
  Browser: "Chrome 147.0.0.0 on macOS 10.15.7",
  Device: "Apple Mac",
  IpAddress: "23.138.82.66",
} as UserSuspiciousProps;

UserSuspicious.Subject = "New sign-in detected on your Datum account";

export default UserSuspicious;
