import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: "We've received your application for payment terms",
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1Before: 'Thanks for applying for payment terms for ',
  paragraph1After:
    '. Our team reviews every application, and most are reviewed within one business day.',
  paragraph2:
    "We'll email you as soon as there's a decision. If we need anything else from you, we'll be in touch.",
  paragraph3:
    "You can check on your application at any time. Don't want to wait? You can add a card instead from the same page.",
  buttonLabel: 'View your application',
  supportBefore: 'Questions? Just reach out to',
  supportAfter: "and we'll help.",
  signoffClosing: 'Many thanks,',
  signoffName: 'The Team at Datum',
};

/**
 * Props for the confirmation sent to the person who applied for payment
 * terms, as soon as milo sees their BillingArrangementApplication.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 */
interface PaymentTermsApplicationReceivedProps {
  /** The applicant's name, e.g. "Jane Doe" */
  UserName: string;
  /** Display name of the organization the application is for */
  OrganizationName: string;
  /** The application's page in the cloud portal */
  ActionUrl: string;
}

export const PaymentTermsApplicationReceived = ({
  UserName,
  OrganizationName,
  ActionUrl,
}: PaymentTermsApplicationReceivedProps) => {
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
            {copy.paragraph2}
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            {copy.paragraph3}
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

PaymentTermsApplicationReceived.PreviewProps = {
  UserName: 'Jane Doe',
  OrganizationName: 'Acme Corp',
  ActionUrl: 'https://cloud.datum.net/onboarding/payment-terms?orgId=acme-corp',
} as PaymentTermsApplicationReceivedProps;

PaymentTermsApplicationReceived.Subject =
  "We've received your application for payment terms";

export default PaymentTermsApplicationReceived;
