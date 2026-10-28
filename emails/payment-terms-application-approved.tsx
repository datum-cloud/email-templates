import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: "You're approved for payment terms",
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1Before: 'Good news: your application has been approved, so ',
  paragraph1After: ' can pay by invoice.',
  paragraph2Before: 'Your payment terms start on ',
  paragraph2Middle: ". From then on, we'll email you each invoice, due ",
  paragraph2After: ' days after the invoice date.',
  paragraph3:
    'You can see your payment terms and change where invoices are sent in billing settings.',
  buttonLabel: 'Go to Datum Cloud',
  supportBefore: 'Questions about your terms? Just reach out to',
  supportAfter: "and we'll help.",
  signoffClosing: 'Many thanks,',
  signoffName: 'The Team at Datum',
};

/**
 * Props for the email sent to the applicant once staff approve their
 * application for payment terms.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 */
interface PaymentTermsApplicationApprovedProps {
  /** The applicant's name, e.g. "Jane Doe" */
  UserName: string;
  /** Display name of the organization the terms are for */
  OrganizationName: string;
  /** Days after the invoice date that payment is due, e.g. "45" */
  NetDays: string;
  /** When the terms start, e.g. "October 28, 2026" */
  StartDate: string;
  /** Where the applicant picks up in the cloud portal */
  ActionUrl: string;
}

export const PaymentTermsApplicationApproved = ({
  UserName,
  OrganizationName,
  NetDays,
  StartDate,
  ActionUrl,
}: PaymentTermsApplicationApprovedProps) => {
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
            {copy.paragraph2Before}
            {StartDate}
            {copy.paragraph2Middle}
            {NetDays}
            {copy.paragraph2After}
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

PaymentTermsApplicationApproved.PreviewProps = {
  UserName: 'Jane Doe',
  OrganizationName: 'Acme Corp',
  NetDays: '45',
  StartDate: 'October 28, 2026',
  ActionUrl: 'https://cloud.datum.net/onboarding/payment-terms?orgId=acme-corp',
} as PaymentTermsApplicationApprovedProps;

PaymentTermsApplicationApproved.Subject = "You're approved for payment terms";

export default PaymentTermsApplicationApproved;
