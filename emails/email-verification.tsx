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
  UserName: string;
  VerifyUrl: string;
}

export const EmailVerification = ({
  UserName,
  VerifyUrl,
}: EmailVerificationProps) => {
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
          {VerifyUrl && (
            <CustomButton
              href={VerifyUrl || ''}
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
  UserName: 'John Doe',
  VerifyUrl: 'https://cloud.datum.net/verify-email?token=example-token',
} as EmailVerificationProps;

EmailVerification.Subject = 'Verify your email address';

export default EmailVerification;
