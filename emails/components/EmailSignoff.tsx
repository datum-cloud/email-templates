import { Text } from '@react-email/components';
import { brandConfig } from '../config/brand.config';

export interface EmailSignoffProps {
  /** Optional greeting text above the signature, e.g., "Many thanks," */
  greetingText?: string;
  /** Optional team or person line. Defaults to `The Team at <brandConfig.name>` */
  signatureText?: string;
  /** Optional title/role line shown after the signature */
  titleText?: string;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * EmailSignoff - Standardized closing/sign-off block for emails
 */
export const EmailSignoff = ({
  greetingText = 'Many thanks,',
  signatureText = `The Team at ${brandConfig.name}`,
  titleText,
  className = '',
}: EmailSignoffProps) => {
  return (
    <Text className={`text-sm mt-4 mb-0 font-light ${className}`}>
      {greetingText}
      <br />
      <br />
      {signatureText}
      {titleText ? (
        <>
          <br />
          {titleText}
        </>
      ) : null}
    </Text>
  );
};
