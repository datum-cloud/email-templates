import 'web-streams-polyfill/polyfill';

import { Body, Head, Html, Link, Preview, Text } from 'react-email';

const copy = {
  preview: 'A new application for payment terms is waiting for review',
  paragraph1Before: 'A customer has applied for payment terms for the ',
  paragraph1After: ' organization.',
  legalNameLabel: 'Legal name',
  applicantLabel: 'Applicant',
  paymentOptionLabel: 'Asked for',
  spendLabel: 'Estimated monthly spend',
  situationLabel: 'Their situation',
  reviewLabel: 'Review the application',
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
 * Only staff read it, so it is plain text with no Datum branding: no
 * MainLayout, header, footer or button.
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
  <Text style={{ margin: 0 }}>
    {label}: {value}
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
    <Html>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body>
        <Text>
          {copy.paragraph1Before}
          {OrganizationName}
          {copy.paragraph1After}
        </Text>
        <Detail label={copy.legalNameLabel} value={LegalName} />
        <Detail label={copy.applicantLabel} value={ApplicantEmail} />
        <Detail label={copy.paymentOptionLabel} value={PaymentOption} />
        <Detail label={copy.spendLabel} value={EstimatedMonthlySpend} />
        <Text style={{ marginBottom: 0 }}>{copy.situationLabel}:</Text>
        <Text style={{ marginTop: 0, whiteSpace: 'pre-line' }}>
          {Situation}
        </Text>
        <Text>
          {copy.reviewLabel}: <Link href={ReviewUrl}>{ReviewUrl}</Link>
        </Text>
        <Text>
          {copy.replyBefore} {ApplicantEmail} {copy.replyAfter}
        </Text>
      </Body>
    </Html>
  );
};

PaymentTermsApplicationSubmitted.PreviewProps = {
  OrganizationName: 'Acme Corp',
  LegalName: 'Acme Corporation Ltd',
  ApplicantEmail: 'jane@acme.com',
  PaymentOption: 'Pay by invoice',
  EstimatedMonthlySpend: '$2,500–$10,000',
  Situation:
    "Our company pays software vendors by purchase order on net-30 terms, so we can't use a corporate card.",
  ReviewUrl:
    'https://staff.datum.net/customers/billing-accounts/applications/acme-corp/apply-acme-billing-x7k2p',
} as PaymentTermsApplicationSubmittedProps;

PaymentTermsApplicationSubmitted.Subject =
  'New payment terms application: {{.OrganizationName}}';

export default PaymentTermsApplicationSubmitted;
