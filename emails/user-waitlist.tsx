import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from 'react-email';
import { MainLayout } from './layouts';

const copy = {
  preview: "You're on the waitlist",
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1:
    "Thanks for joining the waitlist for Datum Cloud. We're currently in a private beta, but we're onboarding people in batches every week.",
  paragraph2:
    "I'd love to hear about your use case, or what you feel is missing in your toolkit. Just reply to this email with any thoughts.",
  signoffClosing: 'Cheers,',
  signoffName: 'Zac Smith',
  signoffTitle: 'Co-founder & CEO at Datum',
};

interface UserWaitlistProps {
  UserName: string;
}

export const UserWaitlist = ({ UserName }: UserWaitlistProps) => {
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
            <br />
            {copy.signoffTitle}
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
