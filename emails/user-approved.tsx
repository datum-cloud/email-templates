import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from '@react-email/components';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

interface UserApprovedProps {
  UserName: string;
  ActionUrl: string;
}

export const UserApproved = ({ UserName, ActionUrl }: UserApprovedProps) => {
  const previewText = `Your account has been approved`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-4.5 font-medium">
            Hi {UserName},
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-4.5 font-normal">
            Good news, you&apos;re off the waitlist! I&apos;m excited to share
            what we&apos;ve built (so far) with Datum Cloud and get your
            feedback. To get started, just login below:
          </Text>
          {ActionUrl && (
            <CustomButton
              href={ActionUrl || ''}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              Start building
            </CustomButton>
          )}
          <Text className="text-4.5 leading-4.5 font-normal">
            We&apos;re releasing new features each week and chatting about
            issues and opportunities on{' '}
            <Link
              href={brandConfig.discordUrl}
              target="_blank"
              className="!text-brand-canyon-clay !underline"
            >
              Discord
            </Link>
            . Feel free to join me there with any questions or feedback.
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

UserApproved.PreviewProps = {
  UserName: 'John Doe',
  ActionUrl: 'https://cloud.datum.net',
} as UserApprovedProps;

UserApproved.Subject = "🚀 You're in! Your access to Datum is here 🚀";

export default UserApproved;
