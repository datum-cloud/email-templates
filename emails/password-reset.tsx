import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Reset your Datum password',
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1:
    'We received a request to reset your password. Click below to choose a new one.',
  buttonLabel: 'Reset Password',
  paragraph2:
    "If you didn't request this, you can safely ignore this email.",
};

interface PasswordResetProps {
  name: string;
  resetUrl: string;
}

export const PasswordReset = ({ name, resetUrl }: PasswordResetProps) => {
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
          {resetUrl && (
            <CustomButton
              href={resetUrl || ''}
              className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
            >
              {copy.buttonLabel}
            </CustomButton>
          )}
          <Text className="text-4.5 leading-6 font-normal mb-0">
            {copy.paragraph2}
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

PasswordReset.PreviewProps = {
  name: 'John Doe',
  resetUrl: 'https://cloud.datum.net/reset-password?token=example-token',
} as PasswordResetProps;

PasswordReset.Subject = 'Reset your Datum password';

export default PasswordReset;
