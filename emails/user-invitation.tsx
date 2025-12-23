import 'web-streams-polyfill/polyfill';

import { Hr, Link, Row, Section, Text } from '@react-email/components';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

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
  const previewText = `${InviterDisplayName} invited you to join ${OrganizationDisplayName}`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-2xl mb-5.5 leading-10 font-medium">
            Hey there!
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-4.5 font-normal">
            {InviterDisplayName} has invited you to join the{' '}
            {OrganizationDisplayName} organization at Datum.
          </Text>
          <Text className="m-0 text-4.5 leading-4.5 font-normal">
            Please click the button to set up your account and get started. If
            you need help, just reply to this email or visit us on{' '}
            <Link
              href={brandConfig.discordUrl}
              target="_blank"
              className="text-brand-canyon-clay underline"
            >
              Discord
            </Link>
            .
          </Text>
          {UserInvitationName && (
            <CustomButton
              href={`https://cloud.datum.net/invitation/${UserInvitationName}/accept`}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              Accept invitation
            </CustomButton>
          )}
          <Text className="text-sm leading-5 font-normal">
            Or you can copy and paste the following URL into your browser:{' '}
            <Link
              href={`https://cloud.datum.net/invitation/${UserInvitationName}/accept`}
              className="text-brand-canyon-clay underline"
            >
              https://cloud.datum.net/invitation/{UserInvitationName}/accept
            </Link>
          </Text>
        </Row>

        <Row>
          <Hr className="mx-0 my-10.5 block border border-brand-light-gray border-solid" />
          <Text className="mt-0 text-[21px] leading-7 font-semibold mb-[11px]">
            Why Datum?
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            Datum is a venture-backed startup based in New York City. Our
            mission is to help 1k new clouds thrive in the age of AI by
            unlocking internet superpowers for every builder.
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
