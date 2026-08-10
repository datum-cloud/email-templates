import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Your suspended project is scheduled for deletion',
  greetingPrefix: 'Hello ',
  greetingSuffix: ',',
  suspendedBefore: 'Your project',
  suspendedAfter: 'is currently suspended.',
  deletionBefore:
    'Unless the suspension is lifted, this project will be permanently deleted in',
  deletionBetween: 'day(s), on',
  deletionSuffix: '.',
  resolutionBefore:
    'To keep your project, resolve the reason for the suspension and',
  supportLinkLabel: 'contact support',
  resolutionAfter: 'if you believe this was done in error.',
  signoffClosing: 'Many thanks,',
  signoffName: 'The Team at Datum',
};

/**
 * Props for the project suspension deletion warning.
 *
 * Each PascalCase key maps 1:1 to a Go template variable in the backend
 * (`{{.PropName}}`) and is emitted into the EmailTemplate `variables:` block
 * by `scripts/generate-yaml.js`. Keep names PascalCase and values plain strings
 * so the backend can populate them directly.
 */
interface ProjectSuspensionDeletionWarningProps {
  /** Name of the suspended project, e.g. "production-api" */
  ProjectName: string;
  /** Name of the organization that owns the project */
  OrganizationName: string;
  /** Whole days left before deletion, e.g. "30", "7", "3", "1" */
  DaysUntilDeletion: string;
  /** Pre-formatted deletion date, e.g. "March 14, 2026" */
  DeletionDate: string;
}

export const ProjectSuspensionDeletionWarning = ({
  ProjectName,
  OrganizationName,
  DaysUntilDeletion,
  DeletionDate,
}: ProjectSuspensionDeletionWarningProps) => {
  const previewText = copy.preview;

  return (
    <MainLayout preview={previewText}>
      <Section className="my-10.5">
        <Row>
          <Text className="mt-0 text-4.5 mb-5.5 leading-6 font-medium">
            {copy.greetingPrefix}
            {OrganizationName}
            {copy.greetingSuffix}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.suspendedBefore} <strong>{ProjectName}</strong>{' '}
            {copy.suspendedAfter}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.deletionBefore}{' '}
            <strong>
              {DaysUntilDeletion} {copy.deletionBetween} {DeletionDate}
            </strong>
            {copy.deletionSuffix}
          </Text>
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.resolutionBefore}{' '}
            <Link
              href={`mailto:${brandConfig.supportEmail}`}
              className="text-brand-canyon-clay underline"
            >
              {copy.supportLinkLabel}
            </Link>{' '}
            {copy.resolutionAfter}
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

ProjectSuspensionDeletionWarning.PreviewProps = {
  ProjectName: 'production-api',
  OrganizationName: 'Acme Corporation',
  DaysUntilDeletion: '30',
  DeletionDate: 'March 14, 2026',
} as ProjectSuspensionDeletionWarningProps;

ProjectSuspensionDeletionWarning.Subject =
  'Action required: project {{.ProjectName}} will be deleted in {{.DaysUntilDeletion}} day(s)';

export default ProjectSuspensionDeletionWarning;
