import "web-streams-polyfill/polyfill";

import { Heading, Row, Section, Text } from "@react-email/components";
import { CustomButton, EmailSignoff } from "./components";
import { MainLayout } from "./layouts";

interface UserApprovedProps {
  Name: string;
  ActionUrl: string;
}

export const UserApproved = ({ Name, ActionUrl }: UserApprovedProps) => {
  const previewText = `Your account has been approved`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-8">
        <Row>
          <Heading as="h4" className="mt-0 font-medium mb-4">
            Hi {Name},
          </Heading>
          <Text className="text-sm m-0 font-light">
            Good news, you&apos;re off the waitlist! I&apos;m excited to share
            what we&apos;ve built (so far) with Datum Cloud and get your
            feedback. To get started, just login below:
          </Text>
          {ActionUrl && (
            <CustomButton
              href={ActionUrl || ""}
              className="my-6 block font-semibold"
            >
              Start building
            </CustomButton>
          )}
          <Text className="text-sm m-0 font-light">
            We&apos;re releasing new features each week and chatting about
            issues and opportunities on Discord. Feel free to join me there with
            any questions or feedback.
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

UserApproved.PreviewProps = {
  Name: "John Doe",
  ActionUrl: "https://cloud.datum.net",
} as UserApprovedProps;

export default UserApproved;
