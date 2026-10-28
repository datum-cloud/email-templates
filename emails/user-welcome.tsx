import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from '@react-email/components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

interface UserWelcomeProps {
  UserName: string;
}

export const UserWelcome = ({ UserName }: UserWelcomeProps) => {
  const previewText = `${UserName} Welcome to Datum!`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            Hey {UserName}, welcome to Datum! We&apos;re glad you&apos;re here.
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            Datum is building for a future that is evolving in front of our
            eyes, so we&apos;re shipping updates all the time. We&apos;re also
            serious about making improvements based on feedback, so if
            you&apos;ve got some for us (good, bad, ugly) we&apos;d love to have
            it.
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            Here&apos;s how to stay in the loop, get help, or get involved:
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <span className="font-semibold">Email</span> – Respond to this note
            and we&apos;ll get back to you
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <Link
              href={brandConfig.discordUrl}
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              Discord
            </Link>{' '}
            – Join for support and connect with other builders
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <Link
              href="https://link.datum.net/events"
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              Luma
            </Link>{' '}
            – Know when and where to meet us in person
          </Text>
          <Text className="mt-0 mb-2 text-4.5 leading-6 font-normal">
            <Link
              href="https://link.datum.net/discussions"
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              GitHub Discussions
            </Link>{' '}
            – Submit feedback, report issues, or request &amp; upvote features
          </Text>
          <Text className="mt-0 mb-0 text-4.5 leading-6 font-normal">
            <Link
              href="https://link.datum.net/careers"
              target="_blank"
              className="text-brand-canyon-clay underline font-semibold"
            >
              Careers
            </Link>{' '}
            – We&apos;re actively hiring, and value folks spreading the word
          </Text>

          <Text className="text-4.5 leading-6 font-normal mt-5.5 mb-0">
            {'\u2764\uFE0F'}
            <br />
            The Team at Datum
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

UserWelcome.PreviewProps = {
  UserName: 'John Doe',
} as UserWelcomeProps;

UserWelcome.Subject = '{{.UserName}} Welcome to Datum!';

export default UserWelcome;
