import "web-streams-polyfill/polyfill";

import { Heading, Hr, Link, Row, Section, Text } from "@react-email/components";
import { CustomButton } from "./components";
import { MainLayout } from "./layouts";
import { brandConfig } from "./config/brand.config";

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
      <Section className="my-8">
        <Row>
          <Heading as="h4" className="mt-0 font-medium mb-4">
            Hey there!,
          </Heading>
          <Text className="text-sm mt-0 mb-4 font-light">
            {InviterDisplayName} has invited you to join the{" "}
            {OrganizationDisplayName} organization at Datum.
          </Text>
          <Text className="text-sm m-0 font-light">
            Please click the button to set up your account and get started. If
            you need help, just reply to this email or visit us on{" "}
            <Link href={brandConfig.discordUrl} target="_blank">
              Discord
            </Link>
            .
          </Text>
          {UserInvitationName && (
            <CustomButton
              href={`https://cloud.datum.net/invitation/${UserInvitationName}/accept`}
              className="my-6 block font-semibold"
            >
              Accept invitation
            </CustomButton>
          )}
          <Text className="text-sm m-0 font-light">
            Or paste the following URL into your browser:{" "}
            <Link
              href={`https://cloud.datum.net/invitation/${UserInvitationName}/accept`}
              className="text-brand-canyon-clay"
            >
              https://cloud.datum.net/invitation/{UserInvitationName}/accept
            </Link>
          </Text>
        </Row>

        <Row>
          <Hr className="mx-0 my-8 block border border-brand-light-gray border-solid" />
          <Heading as="h3" className="mt-0 font-medium mb-4">
            Why Datum?
          </Heading>
          <Text className="text-sm m-0 font-light">
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
  InviterDisplayName: "John Doe",
  OrganizationDisplayName: "Braintree Corp",
  UserInvitationName: "invitation-name",
} as UserInvitationProps;

UserInvitation.Subject = "Invitation to collaborate at Datum";

export default UserInvitation;
