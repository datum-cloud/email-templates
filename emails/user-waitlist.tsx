import "web-streams-polyfill/polyfill";

import { Heading, Row, Section, Text } from "@react-email/components";
import { EmailSignoff } from "./components";
import { MainLayout } from "./layouts";

interface UserWaitlistProps {
  Name: string;
}

export const UserWaitlist = ({ Name }: UserWaitlistProps) => {
  const previewText = `You're on the waitlist`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-8">
        <Row>
          <Heading as="h4" className="mt-0 font-medium mb-4">
            Hi {Name},
          </Heading>
          <Text className="text-sm mt-0 mb-4 font-light">
            Thanks for joining the waitlist for Datum Cloud. We&apos;re
            currently in a private beta, but we're onboarding people in batches
            every week.
          </Text>
          <Text className="text-sm m-0 font-light">
            I&apos;d love to hear about your use case, or what you feel is
            missing in your toolkit. Just reply to this email with any thoughts.
          </Text>

          <EmailSignoff
            greetingText="Cheers,"
            signatureText="Zac Smith"
            titleText="Co-founder & CEO at Datum"
          />
        </Row>
      </Section>
    </MainLayout>
  );
};

UserWaitlist.PreviewProps = {
  Name: "John Doe",
} as UserWaitlistProps;

export default UserWaitlist;
