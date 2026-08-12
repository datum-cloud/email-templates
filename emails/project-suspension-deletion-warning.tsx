import 'web-streams-polyfill/polyfill';

import { Link, Row, Section, Text } from 'react-email';
import { CustomButton } from './components';
import { brandConfig } from './config/brand.config';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Your suspended project is scheduled for deletion',
  greetingPrefix: 'Hi ',
  greetingSuffix: ',',
  paragraph1Before: "We're writing to let you know that your project ",
  paragraph1After: ' is currently suspended.',
  paragraph2Before:
    "No need to panic, but we do want to flag that if the suspension isn't resolved within ",
  paragraph2Middle: ' day(s), the project will be permanently deleted on ',
  paragraph2After: ", and we'd hate for that to happen.",
  paragraph3:
    "Simply log into your account and resolve the reason for the suspension, and you'll be back up and running.",
  buttonLabel: 'Resolve suspension',
  urlFallbackBefore:
    'Or you can copy and paste the following URL into your browser:',
  supportBefore: 'If you think this was an error, just reach out to',
  supportAfter: "and we'll help get it sorted.",
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
  /** Name of the suspended project, e.g. "acme-analytics" */
  ProjectName: string;
  /** Display name of the organization that owns the project */
  OrganizationName: string;
  /** Whole days left before the project is deleted, e.g. "30" */
  DaysUntilDeletion: string;
  /** Date the project will be permanently deleted, e.g. "September 10, 2026" */
  DeletionDate: string;
}

export const ProjectSuspensionDeletionWarning = ({
  ProjectName,
  OrganizationName,
  DaysUntilDeletion,
  DeletionDate,
}: ProjectSuspensionDeletionWarningProps) => {
  const previewText = copy.preview;
  const projectUrl = `https://cloud.datum.net/project/${ProjectName}/home`;

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
            {copy.paragraph1Before}
            <strong>{ProjectName}</strong>
            {copy.paragraph1After}
          </Text>
          <Text className="mt-0 mb-5.5 text-4.5 leading-6 font-normal">
            {copy.paragraph2Before}
            {DaysUntilDeletion}
            {copy.paragraph2Middle}
            {DeletionDate}
            {copy.paragraph2After}
          </Text>
          <Text className="m-0 text-4.5 leading-6 font-normal">
            {copy.paragraph3}
          </Text>
          <CustomButton
            href={projectUrl}
            className="mt-9 mb-8 block text-[16px] font-semibold leading-5"
          >
            {copy.buttonLabel}
          </CustomButton>
          <Text className="text-sm leading-5 font-normal mt-0 mb-5.5">
            {copy.urlFallbackBefore}{' '}
            <Link
              href={projectUrl}
              className="text-brand-canyon-clay underline"
            >
              {projectUrl}
            </Link>
          </Text>
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

ProjectSuspensionDeletionWarning.PreviewProps = {
  ProjectName: 'acme-analytics',
  OrganizationName: 'Acme Corp',
  DaysUntilDeletion: '30',
  DeletionDate: 'September 10, 2026',
} as ProjectSuspensionDeletionWarningProps;

ProjectSuspensionDeletionWarning.Subject =
  'Action required: project {{.ProjectName}} will be deleted in {{.DaysUntilDeletion}} day(s)';

export default ProjectSuspensionDeletionWarning;
