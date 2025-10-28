import "web-streams-polyfill/polyfill";

import { Heading, Row, Section, Text } from "@react-email/components";
import { EmailSignoff } from './components';
import { MainLayout } from "./layouts";


interface UserRejectedProps {
  Name: string;
}

export const UserRejected = ({ Name }: UserRejectedProps) => {
  const previewText = `Your account has been rejected`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-8">
        <Row>
          <Heading as="h4" className="mt-0 font-medium mb-4">
            Hi {Name},
          </Heading>
          <Text className="text-sm mt-0 mb-4 font-light">
            Thank you for your interest in Datum Cloud. Unfortunately, we&apos;re
            unable to approve your account at this time.
          </Text>
          <Text className="text-sm m-0 font-light">
            If you have questions, or think this decision is in error, please
            respond to this email and we can investigate further.
          </Text>
          <EmailSignoff />
        </Row>
      </Section>
    </MainLayout>
  );
};

UserRejected.PreviewProps = {
  Name: "John Doe",
} as UserRejectedProps;

export default UserRejected;
