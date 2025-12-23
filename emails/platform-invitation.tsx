import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from '@react-email/components';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

interface PlatformInvitationProps {
  UserName: string;
  ActionUrl: string;
}

export const PlatformInvitation = ({
  UserName,
  ActionUrl,
}: PlatformInvitationProps) => {
  const previewText = `Join Datum's private beta - exclusive access to our open network cloud`;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-4.5 font-medium">
            Hi {UserName},
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-4.5 font-normal">
            We&apos;re building an open network cloud to help the next
            generation of builders get access to some of the building blocks of
            the internet. I&apos;m hoping you&apos;ll take some time to kick the
            tires during our private beta.
          </Text>
          <Text className="text-4.5 leading-4.5 m-0 font-normal">
            We&apos;re intentionally keeping this group small so we can listen
            closely to feedback.
          </Text>
          {ActionUrl && (
            <CustomButton
              href={ActionUrl || ''}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              Get started
            </CustomButton>
          )}
          <Text className="text-4.5 leading-4.5 m-0 font-normal">
            Let me know your thoughts?
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

PlatformInvitation.PreviewProps = {
  UserName: 'John Doe',
  ActionUrl: 'https://cloud.datum.net',
} as PlatformInvitationProps;

PlatformInvitation.Subject = "You're invited to join Datum's private beta";

export default PlatformInvitation;
