import 'web-streams-polyfill/polyfill';

import { Row, Section, Text } from 'react-email';
import { MainLayout } from './layouts';

const copy = {
  preview: 'Your suspended project is scheduled for deletion',
  greetingPrefix: 'Hello ',
  greetingSuffix: ',',
  projectPrefix: 'Your project ',
  suspendedIntro:
    ' is currently suspended. Unless the suspension is lifted, this project will be permanently deleted in ',
  daysSuffix: ' day(s), on ',
  sentenceEnd: '.',
  paragraph2:
    'To keep your project, resolve the reason for the suspension and contact support if you believe this was done in error.',
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
  /** Name of the suspended project, e.g. "acme-production" */
  ProjectName: string;
  /** Name of the organization that owns the project, e.g. "Acme Corp" */
  OrganizationName: string;
  /** Days left before the project is permanently deleted, e.g. "7" */
  DaysUntilDeletion: string;
  /** Date the project is permanently deleted, e.g. "August 18, 2026" */
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
            {copy.projectPrefix}
            <strong>{ProjectName}</strong>
            {copy.suspendedIntro}
            <strong>{DaysUntilDeletion}</strong>
            {copy.daysSuffix}
            <strong>{DeletionDate}</strong>
            {copy.sentenceEnd}
          </Text>
          <Text className="text-4.5 leading-6 m-0 font-normal">
            {copy.paragraph2}
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
  ProjectName: 'acme-production',
  OrganizationName: 'Acme Corp',
  // `scripts/generate-yaml.js` also replaces the literal preview value wherever
  // it appears in the rendered output, so a day count that shows up inside the
  // markup (e.g. "7" in "max-w-[570px]") would corrupt the generated YAML. "30"
  // — the first escalation checkpoint — appears nowhere else in this template.
  DaysUntilDeletion: '30',
  DeletionDate: 'September 10, 2026',
} as ProjectSuspensionDeletionWarningProps;

ProjectSuspensionDeletionWarning.Subject =
  'Action required: project {{.ProjectName}} will be deleted in {{.DaysUntilDeletion}} day(s)';

export default ProjectSuspensionDeletionWarning;
