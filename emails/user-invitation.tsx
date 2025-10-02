import 'web-streams-polyfill/polyfill';

import { Heading, Link, Row, Section, Text } from '@react-email/components';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

import { EmailSupport } from './components/EmailSupport';

interface UserInvitationProps {
  inviter: string;
  organizationName: string;
  role: string;
  actionUrl: string;
}

export const UserInvitation = ({
  inviter,
  organizationName,
  actionUrl,
}: UserInvitationProps) => {
  const previewText = `${inviter} invited you to join ${organizationName}`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-8">
        <Row className="mb-8">
          <Heading as="h2" className="text-2xl mt-0 font-medium mb-4">
            Join your friends on Datum
          </Heading>
          <Text className="text-sm m-0 font-light">
          {inviter} has invited you to join "{organizationName}" organization to collaborate with them. Use the button below to set up your account and get started:
          </Text>
          {actionUrl && (
            <CustomButton
              href={actionUrl || ''}
              className="my-6 block font-semibold"
            >
              Accept invitation
            </CustomButton>
          )}
          <Text className="text-sm m-0 font-light">
            Or you can copy and paste the following URL into your browser:{' '}
            <Link href={actionUrl} className="text-brand-canyon-clay">
              {actionUrl}
            </Link>
          </Text>
        </Row>

        <EmailSupport />
      </Section>
    </MainLayout>
  );
};

UserInvitation.PreviewProps = {
  inviter: 'John Doe',
  organizationName: 'Braintree Corp',
  actionUrl: 'https://cloud.datum.net',
} as UserInvitationProps;

export default UserInvitation;
