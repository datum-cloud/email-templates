/**
 * Centralized export for all reusable email components
 *
 * This file provides a single import point for all email components,
 * making it easier to maintain and use throughout the project.
 *
 * @example
 * ```tsx
 * import {
 *   CustomButton,
 * } from './components';
 * ```
 */

export type {
  CustomButtonProps,
  CustomButtonSize,
  CustomButtonVariant
} from './CustomButton';

// Interactive Components
export { CustomButton } from './CustomButton';

export { EmailSupport } from './EmailSupport';
export type { EmailSupportProps } from './EmailSupport';

export { EmailSignoff } from './EmailSignoff';
export type { EmailSignoffProps } from './EmailSignoff';