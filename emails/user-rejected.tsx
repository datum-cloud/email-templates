import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from 'react-email';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Your account has been rejected',
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1:
    "Thank you for your interest in Datum Cloud. Unfortunately, we're unable to approve your account at this time.",
  paragraph2:
    'If you have questions, or think this decision is in error, please respond to this email and we can investigate further.',
  signoffClosing: 'Many thanks,',
  signoffName: 'The Team at Datum',
};

interface UserRejectedProps {
  UserName: string;
}

export const UserRejected = ({ UserName }: UserRejectedProps) => {
  const previewText = copy.preview;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            {copy.greetingPrefix}
            {UserName}
            {copy.greetingSuffix}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.paragraph1}
          </Text>
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.paragraph2}
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

UserRejected.PreviewProps = {
  UserName: 'John Doe',
} as UserRejectedProps;

UserRejected.Subject =
  "We're Sorry — Your Application to Datum Was Not Approved";

export default UserRejected;
