import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Verify your email address',
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1:
    'Please confirm your email address to finish setting up your Datum account. This link expires in 24 hours.',
  buttonLabel: 'Verify Email',
};

interface EmailVerificationProps {
  name: string;
  verifyUrl: string;
}

export const EmailVerification = ({
  name,
  verifyUrl,
}: EmailVerificationProps) => {
  const previewText = copy.preview;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            {copy.greetingPrefix}
            {name}
            {copy.greetingSuffix}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.paragraph1}
          </Text>
          {verifyUrl && (
            <CustomButton
              href={verifyUrl || ''}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              {copy.buttonLabel}
            </CustomButton>
          )}
        </Row>
      </Section>
    </MainLayout>
  );
};

EmailVerification.PreviewProps = {
  name: 'John Doe',
  verifyUrl: 'https://cloud.datum.net/verify?token=example-token',
} as EmailVerificationProps;

EmailVerification.Subject = 'Verify your email address';

export default EmailVerification;
