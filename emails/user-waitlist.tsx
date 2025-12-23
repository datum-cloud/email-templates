import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from '@react-email/components';
import { MainLayout } from './layouts';

interface UserWaitlistProps {
  UserName: string;
}

export const UserWaitlist = ({ UserName }: UserWaitlistProps) => {
  const previewText = `You're on the waitlist`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-4.5 font-medium">
            Hi {UserName},
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-4.5 font-normal">
            Thanks for joining the waitlist for Datum Cloud. We&apos;re
            currently in a private beta, but we're onboarding people in batches
            every week.
          </Text>
          <Text className="text-4.5 leading-4.5 m-0 font-normal">
            I&apos;d love to hear about your use case, or what you feel is
            missing in your toolkit. Just reply to this email with any thoughts.
          </Text>

          <Text className="text-4.5 leading-4.5 font-normal mt-5.5 mb-0">
            Cheers,
            <br />
            <br />
            Zac Smith
            <br />
            Co-founder & CEO at Datum
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

UserWaitlist.PreviewProps = {
  UserName: 'John Doe',
} as UserWaitlistProps;

UserWaitlist.Subject =
  "⏳ You're on the waitlist — Your access to Datum is coming soon!";

export default UserWaitlist;
