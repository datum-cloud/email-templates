import "web-streams-polyfill/polyfill";

import { Heading, Link, Row, Section, Text } from "@react-email/components";
import { CustomButton } from "./components";
import { MainLayout } from "./layouts";

import { EmailSupport } from "./components/EmailSupport";
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

        {/* <EmailSupport /> */}
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
