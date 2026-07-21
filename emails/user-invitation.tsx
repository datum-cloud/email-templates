import 'web-streams-polyfill/polyfill';

import { Hr, Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: (inviterDisplayName: string, organizationDisplayName: string) =>
    `${inviterDisplayName} invited you to join ${organizationDisplayName}`,
  heading: 'Hey there!',
  introBefore: ' has invited you to join the',
  introAfter: ' organization at Datum.',
  paragraph1Before:
    'Please click the button to set up your account and get started. If you need help, just reply to this email or visit us on',
  discordLabel: 'Discord',
  paragraph1After: '.',
  buttonLabel: 'Accept invitation',
  paragraph2Before:
    'Or you can copy and paste the following URL into your browser:',
  whyHeading: 'Why Datum?',
  whyParagraph:
    'Datum is a venture-backed startup based in New York City. Our mission is to help 1k new clouds thrive in the age of AI by unlocking internet superpowers for every builder.',
};

interface UserInvitationProps {
  InviterDisplayName: string;
  OrganizationDisplayName: string;
  UserInvitationName: string;
}

export const UserInvitation = ({
  InviterDisplayName,
  OrganizationDisplayName,
  UserInvitationName,
}: UserInvitationProps) => {
  const previewText = copy.preview(InviterDisplayName, OrganizationDisplayName);
  const invitationUrl = `https://cloud.datum.net/invitation/${UserInvitationName}/accept`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-2xl mb-5.5 leading-10 font-medium">
            {copy.heading}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {InviterDisplayName}
            {copy.introBefore} {OrganizationDisplayName}
            {copy.introAfter}
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            {copy.paragraph1Before}{' '}
            <Link
              href={brandConfig.discordUrl}
              target="_blank"
              className="text-brand-canyon-clay underline"
            >
              {copy.discordLabel}
            </Link>
            {copy.paragraph1After}
          </Text>
          {UserInvitationName && (
            <CustomButton
              href={invitationUrl}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              {copy.buttonLabel}
            </CustomButton>
          )}
          <Text className="text-sm leading-5 font-normal">
            {copy.paragraph2Before}{' '}
            <Link
              href={invitationUrl}
              className="text-brand-canyon-clay underline"
            >
              https://cloud.datum.net/invitation/{UserInvitationName}/accept
            </Link>
          </Text>
        </Row>

        <Row>
          <Hr className="mx-0 my-10.5 block border border-brand-light-gray border-solid" />
          <Text className="mt-0 text-[21px] leading-7 font-semibold mb-[11px]">
            {copy.whyHeading}
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            {copy.whyParagraph}
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

UserInvitation.PreviewProps = {
  InviterDisplayName: 'John Doe',
  OrganizationDisplayName: 'Braintree Corp',
  UserInvitationName: 'invitation-name',
} as UserInvitationProps;

UserInvitation.Subject = 'Invitation to collaborate at Datum';

export default UserInvitation;
