import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: (memberDisplayName: string, organizationDisplayName: string) =>
    `${memberDisplayName} joined ${organizationDisplayName} on Datum`,
  greeting: 'Hi there,',
  introAfterMember: ' just joined the ',
  introAfterOrganization: ' organization on Datum.',
  emailLabel: 'Email:',
  paragraph2Before: "You're getting this because you're an owner of ",
  paragraph2After:
    '. You can see everyone in the organization, change their roles, or remove them on the Team page.',
  buttonLabel: 'View team',
  supportBefore:
    "If you don't recognize this person, remove them from the organization and let us know at",
  supportAfter: '.',
  signoffClosing: 'Many thanks,',
  signoffName: 'The Team at Datum',
};

/**
 * Props for the email milo sends each organization owner when someone joins
 * the organization (milo's MemberJoinedEmails feature).
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 *
 * milo also has JoinMethod, InviterDisplayName and EmailDomain for this email,
 * but sends only the variables a template declares, so they're left out until
 * the copy needs them.
 */
interface OrganizationMemberJoinedProps {
  /** The organization's resource name, used in the Team page URL, e.g. "acme-corp" */
  OrganizationName: string;
  /** The organization's display name, e.g. "Acme Corp" */
  OrganizationDisplayName: string;
  /** The new member's name. milo falls back to their email address when they have no name. */
  MemberDisplayName: string;
  /** The new member's email address */
  MemberEmail: string;
}

export const OrganizationMemberJoined = ({
  OrganizationName,
  OrganizationDisplayName,
  MemberDisplayName,
  MemberEmail,
}: OrganizationMemberJoinedProps) => {
  const previewText = copy.preview(MemberDisplayName, OrganizationDisplayName);
  const teamUrl = `https://cloud.datum.net/org/${OrganizationName}/team`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            {copy.greeting}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            <strong>{MemberDisplayName}</strong>
            {copy.introAfterMember}
            <strong>{OrganizationDisplayName}</strong>
            {copy.introAfterOrganization}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            <strong>{copy.emailLabel}</strong> {MemberEmail}
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            {copy.paragraph2Before}
            {OrganizationDisplayName}
            {copy.paragraph2After}
          </Text>
          <CustomButton
            href={teamUrl}
            className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
          >
            {copy.buttonLabel}
          </CustomButton>
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.supportBefore}{' '}
            <Link
              href={`mailto:${brandConfig.supportEmail}`}
              className="text-brand-canyon-clay underline"
            >
              {brandConfig.supportEmail}
            </Link>
            {copy.supportAfter}
          </Text>
          <Text className="text-4.5 leading-6 font-normal mt-5.5 mb-0">
            {copy.signoffClosing}
            <br />
            <br />
            {copy.signoffName}
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

OrganizationMemberJoined.PreviewProps = {
  OrganizationName: 'acme-corp',
  OrganizationDisplayName: 'Acme Corp',
  MemberDisplayName: 'Jane Doe',
  MemberEmail: 'jane@acme.example',
} as OrganizationMemberJoinedProps;

OrganizationMemberJoined.Subject = 'A new member joined your organization';

export default OrganizationMemberJoined;
