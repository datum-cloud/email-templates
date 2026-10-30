import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: 'About your application for payment terms',
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1Before: "We've reviewed your application for payment terms for ",
  paragraph1After: ", and we aren't able to approve it right now.",
  paragraph2:
    'You can keep using Datum Cloud by adding a card, and you can apply again later from billing settings.',
  buttonLabel: 'Add a card',
  supportBefore: 'Questions about this decision? Just reach out to',
  supportAfter: "and we'll help.",
  signoffClosing: 'Many thanks,',
  signoffName: 'The Team at Datum',
};

/**
 * Props for the email sent to the applicant once staff decline their
 * application for payment terms.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 */
interface PaymentTermsApplicationDeclinedProps {
  /** The applicant's name, e.g. "Jane Doe" */
  UserName: string;
  /** Display name of the organization the application was for */
  OrganizationName: string;
  /**
   * The reviewer's message to the applicant (the application's
   * status.declineMessage). Staff write it to the applicant, and it reads as
   * a paragraph of this email, keeping any line breaks.
   */
  DeclineMessage: string;
  /** Where the applicant adds a card in the cloud portal */
  ActionUrl: string;
}

export const PaymentTermsApplicationDeclined = ({
  UserName,
  OrganizationName,
  DeclineMessage,
  ActionUrl,
}: PaymentTermsApplicationDeclinedProps) => {
  return (
    <MainLayout preview={copy.preview}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            {copy.greetingPrefix}
            {UserName}
            {copy.greetingSuffix}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.paragraph1Before}
            <strong>{OrganizationName}</strong>
            {copy.paragraph1After}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            <span className="whitespace-pre-line">{DeclineMessage}</span>
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            {copy.paragraph2}
          </Text>
          <CustomButton
            href={ActionUrl}
            className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
          >
            {copy.buttonLabel}
          </CustomButton>
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.supportBefore}{' '}
            <Link
              href={`mailto:${brandConfig.supportEmail}`}
              className="text-brand-canyon-clay underline"
            >
              {brandConfig.supportEmail}
            </Link>{' '}
            {copy.supportAfter}
          </Text>
          <Text className="text-4.5 leading-6 font-normal mt-5.5 mb-0">
            {copy.signoffClosing}
            <br />
            <br />
            {copy.signoffName}
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

PaymentTermsApplicationDeclined.PreviewProps = {
  UserName: 'Jane Doe',
  OrganizationName: 'Acme Corp',
  DeclineMessage:
    "We couldn't verify your company. Reply to support with your company registration number, or add a card to continue.",
  ActionUrl: 'https://cloud.datum.net/onboarding/billing?orgId=acme-corp',
} as PaymentTermsApplicationDeclinedProps;

PaymentTermsApplicationDeclined.Subject =
  'About your application for payment terms';

export default PaymentTermsApplicationDeclined;
