import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from '@react-email/components';
import { MainLayout } from './layouts';

interface UserRejectedProps {
  UserName: string;
}

export const UserRejected = ({ UserName }: UserRejectedProps) => {
  const previewText = `Your account has been rejected`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            Hi {UserName},
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            Thank you for your interest in Datum Cloud. Unfortunately,
            we&apos;re unable to approve your account at this time.
          </Text>
          <Text className="text-4.5 leading-6 m-0 font-normal">
            If you have questions, or think this decision is in error, please
            respond to this email and we can investigate further.
          </Text>
          <Text className="text-4.5 leading-6 font-normal mt-5.5 mb-0">
            Many thanks,
            <br />
            <br />
            The Team at Datum
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

UserRejected.PreviewProps = {
  UserName: 'John Doe',
} as UserRejectedProps;

UserRejected.Subject =
  "We're Sorry — Your Application to Datum Was Not Approved";

export default UserRejected;
