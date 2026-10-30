import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { MainLayout } from './layouts';

const copy = {
  preview: 'A new application for payment terms is waiting for review',
  paragraph1Before: 'A customer has applied for payment terms for the ',
  paragraph1After: ' organization.',
  legalNameLabel: 'Legal name',
  applicantLabel: 'Applicant',
  paymentOptionLabel: 'Asked for',
  spendLabel: 'Estimated monthly spend',
  situationLabel: 'Their situation',
  buttonLabel: 'Review the application',
  replyBefore:
    "Replies to this email don't reach the customer. To contact them, email",
  replyAfter: 'directly.',
};

/**
 * Props for the notice sent to the support mailbox when someone applies for
 * payment terms. Help Scout turns it into a conversation, which is the
 * ticket staff follow up from; the decision itself is made in the staff
 * portal.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 */
interface PaymentTermsApplicationSubmittedProps {
  /** Display name of the organization the application is for */
  OrganizationName: string;
  /** The legal name the applicant gave */
  LegalName: string;
  /** The applicant's email address */
  ApplicantEmail: string;
  /** What they asked for, e.g. "Pay by invoice" or "Not sure yet" */
  PaymentOption: string;
  /** Their spend estimate, e.g. "$2,500–$10,000" or "Not sure yet" */
  EstimatedMonthlySpend: string;
  /** In the applicant's own words. May run over several lines. */
  Situation: string;
  /** The application in the staff portal */
  ReviewUrl: string;
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <Text className="mt-0 mb-3 text-4.5 leading-6 font-normal">
    <strong>{label}:</strong> {value}
  </Text>
);

export const PaymentTermsApplicationSubmitted = ({
  OrganizationName,
  LegalName,
  ApplicantEmail,
  PaymentOption,
  EstimatedMonthlySpend,
  Situation,
  ReviewUrl,
}: PaymentTermsApplicationSubmittedProps) => {
  return (
    <MainLayout preview={copy.preview}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.paragraph1Before}
            <strong>{OrganizationName}</strong>
            {copy.paragraph1After}
          </Text>
          <Detail label={copy.legalNameLabel} value={LegalName} />
          <Detail label={copy.applicantLabel} value={ApplicantEmail} />
          <Detail label={copy.paymentOptionLabel} value={PaymentOption} />
          <Detail label={copy.spendLabel} value={EstimatedMonthlySpend} />
          <Text className="mt-5.5 mb-2 text-4.5 leading-6 font-medium">
            {copy.situationLabel}
          </Text>
          <Text className="mt-0 mb-0 text-4.5 leading-6 font-normal border-0 border-l-4 border-solid border-brand-canyon-clay pl-4">
            <span className="whitespace-pre-line">{Situation}</span>
          </Text>
          <CustomButton
            href={ReviewUrl}
            className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
          >
            {copy.buttonLabel}
          </CustomButton>
          <Text className="text-sm leading-5 font-normal m-0">
            {copy.replyBefore}{' '}
            <Link
              href={`mailto:${ApplicantEmail}`}
              className="text-brand-canyon-clay underline"
            >
              {ApplicantEmail}
            </Link>{' '}
            {copy.replyAfter}
          </Text>
        </Row>
      </Section>
    </MainLayout>
  );
};

PaymentTermsApplicationSubmitted.PreviewProps = {
  OrganizationName: 'Acme Corp',
  LegalName: 'Acme Corporation Ltd',
  ApplicantEmail: 'jane@acme.com',
  PaymentOption: 'Pay by invoice',
  EstimatedMonthlySpend: '$2,500–$10,000',
  Situation:
    "Our company pays software vendors by purchase order on net-30 terms, so we can't use a corporate card.\n\nOur AP team needs the PO number on every invoice.",
  ReviewUrl:
    'https://staff.datum.net/customers/billing-accounts/applications/acme-corp/apply-acme-billing-x7k2p',
} as PaymentTermsApplicationSubmittedProps;

PaymentTermsApplicationSubmitted.Subject =
  'New payment terms application: {{.OrganizationName}}';

export default PaymentTermsApplicationSubmitted;
