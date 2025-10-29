import "web-streams-polyfill/polyfill";

import { Heading, Row, Section, Text } from "@react-email/components";
import { CustomButton, EmailSignoff } from "./components";
import { MainLayout } from "./layouts";

interface PlatformInvitationProps {
  UserName: string;
  ActionUrl: string;
}

export const PlatformInvitation = ({ UserName, ActionUrl }: PlatformInvitationProps) => {
  const previewText = `Join Datum's private beta - exclusive access to our open network cloud`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-8">
        <Row>
          <Heading as="h4" className="mt-0 font-medium mb-4">
            Hi {UserName},
          </Heading>
          <Text className="text-sm mt-0 mb-4 font-light">
            We&apos;re building an open network cloud to help the next
            generation of builders get access to some of the building blocks of
            the internet. I&apos;m hoping you&apos;ll take some time to kick the
            tires during our private beta.
          </Text>
          <Text className="text-sm m-0 font-light">
            We&apos;re intentionally keeping this group small so we can listen
            closely to feedback.
          </Text>
          {ActionUrl && (
            <CustomButton
              href={ActionUrl || ""}
              className="my-6 block font-semibold"
            >
              Get started
            </CustomButton>
          )}
          <Text className="text-sm m-0 font-light">
            Let me know your thoughts?
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

PlatformInvitation.PreviewProps = {
  UserName: "John Doe",
  ActionUrl: "https://cloud.datum.net",
} as PlatformInvitationProps;

PlatformInvitation.Subject = "You're invited to join Datum's private beta";

export default PlatformInvitation;
