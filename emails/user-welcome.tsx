import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: (userName: string) => `${userName} Welcome to Datum!`,
  greetingPrefix: 'Hey ',
  greetingSuffix: ", welcome to Datum! We're glad you're here.",
  paragraph1:
    "Datum is building for a future that is evolving in front of our eyes, so we're shipping updates all the time. We're also serious about making improvements based on feedback, so if you've got some for us (good, bad, ugly) we'd love to have it.",
  paragraph2: "Here's how to stay in the loop, get help, or get involved:",
  emailLabel: 'Email',
  emailDescription: " – Respond to this note and we'll get back to you",
  discordLabel: 'Discord',
  discordDescription: '– Join for support and connect with other builders',
  lumaLabel: 'Luma',
  lumaDescription: '– Know when and where to meet us in person',
  githubDiscussionsLabel: 'GitHub Discussions',
  githubDiscussionsDescription:
    '– Submit feedback, report issues, or request & upvote features',
  careersLabel: 'Careers',
  careersDescription:
    "– We're actively hiring, and value folks spreading the word",
  signoffEmoji: '❤️',
  signoffName: 'The Team at Datum',
};

interface UserWelcomeProps {
  UserName: string;
}

export const UserWelcome = ({ UserName }: UserWelcomeProps) => {
  const previewText = copy.preview(UserName);

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
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.paragraph2}
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <span className="font-semibold">{copy.emailLabel}</span>
            {copy.emailDescription}
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <Link
              href={brandConfig.discordUrl}
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              {copy.discordLabel}
            </Link>{' '}
            {copy.discordDescription}
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <Link
              href="https://link.datum.net/events"
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              {copy.lumaLabel}
            </Link>{' '}
            {copy.lumaDescription}
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <Link
              href="https://link.datum.net/discussions"
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              {copy.githubDiscussionsLabel}
            </Link>{' '}
            {copy.githubDiscussionsDescription}
          </Text>
          <Text className="mt-0 mb-0 text-4.5 leading-6 font-normal">
            <Link
              href="https://link.datum.net/careers"
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              {copy.careersLabel}
            </Link>{' '}
            {copy.careersDescription}
          </Text>

          <Text className="text-4.5 leading-6 font-normal mt-5.5 mb-0">
            {copy.signoffEmoji}
            <br />
            {copy.signoffName}
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

UserWelcome.PreviewProps = {
  UserName: 'John Doe',
} as UserWelcomeProps;

UserWelcome.Subject = 'Welcome to Datum';

export default UserWelcome;
