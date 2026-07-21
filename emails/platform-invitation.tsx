import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

const copy = {
  preview:
    "Join Datum's private beta - exclusive access to our open network cloud",
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1:
    "We're building an open network cloud to help the next generation of builders get access to some of the building blocks of the internet. I'm hoping you'll take some time to kick the tires during our private beta.",
  paragraph2:
    "We're intentionally keeping this group small so we can listen closely to feedback.",
  buttonLabel: 'Get started',
  paragraph3: 'Let me know your thoughts?',
  signoffClosing: 'Cheers,',
  signoffName: 'Zac Smith',
  signoffTitle: 'Co-founder & CEO at Datum',
};

interface PlatformInvitationProps {
  UserName: string;
  ActionUrl: string;
}

export const PlatformInvitation = ({
  UserName,
  ActionUrl,
}: PlatformInvitationProps) => {
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
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.paragraph2}
          </Text>
          {ActionUrl && (
            <CustomButton
              href={ActionUrl || ''}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              {copy.buttonLabel}
            </CustomButton>
          )}
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.paragraph3}
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

PlatformInvitation.PreviewProps = {
  UserName: 'John Doe',
  ActionUrl: 'https://cloud.datum.net',
} as PlatformInvitationProps;

PlatformInvitation.Subject = "You're invited to join Datum's private beta";

export default PlatformInvitation;
