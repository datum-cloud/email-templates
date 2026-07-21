import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Your account has been approved',
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1:
    "Good news, you're off the waitlist! I'm excited to share what we've built (so far) with Datum Cloud and get your feedback. To get started, just login below:",
  buttonLabel: 'Start building',
  paragraph2Before:
    "We're releasing new features each week and chatting about issues and opportunities on",
  discordLabel: 'Discord',
  paragraph2After:
    '. Feel free to join me there with any questions or feedback.',
  signoffClosing: 'Cheers,',
  signoffName: 'Zac Smith',
  signoffTitle: 'Co-founder & CEO at Datum',
};

interface UserApprovedProps {
  UserName: string;
  ActionUrl: string;
}

export const UserApproved = ({ UserName, ActionUrl }: UserApprovedProps) => {
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
          {ActionUrl && (
            <CustomButton
              href={ActionUrl || ''}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              {copy.buttonLabel}
            </CustomButton>
          )}
          <Text className="text-4.5 leading-6 font-normal">
            {copy.paragraph2Before}{' '}
            <Link
              href={brandConfig.discordUrl}
              target="_blank"
              className="!text-brand-canyon-clay !underline"
            >
              {copy.discordLabel}
            </Link>
            {copy.paragraph2After}
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

UserApproved.PreviewProps = {
  UserName: 'John Doe',
  ActionUrl: 'https://cloud.datum.net',
} as UserApprovedProps;

UserApproved.Subject = "🚀 You're in! Your access to Datum is here 🚀";

export default UserApproved;
