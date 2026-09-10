import 'web-streams-polyfill/polyfill';

import {
  AccountRecoveryBody,
  type AccountRecoveryBodyProps,
} from './components';
import { MainLayout } from './layouts';

/**
 * Support-initiated account recovery: a staff member created a
 * PasskeyRegistrationLink for this user. Same body as the self-serve mail,
 * minus the typed-code paragraph — this mail is LINK-ONLY — and with a closing
 * line that lets the recipient sanity-check that they really did contact
 * support.
 */
type UserAccountRecoverySupportProps = Omit<
  AccountRecoveryBodyProps,
  'variant'
>;

export const UserAccountRecoverySupport = (
  props: UserAccountRecoverySupportProps,
) => {
  const previewText = 'Datum Support sent you a passkey setup link';

  return (
    <MainLayout preview={previewText}>
      <AccountRecoveryBody variant="support" {...props} />
    </MainLayout>
  );
};

UserAccountRecoverySupport.PreviewProps = {
  UserName: 'Wave Two',
  /**
   * Declared but never rendered, on purpose. generate-yaml.js derives the CR's
   * variable list from these keys, so keeping Code here makes the support CR
   * DECLARE it — and, since neither body references `{{.Code}}`, declare it
   * `required: false`. That is what milo's Email admission webhook needs: it
   * rejects an Email carrying a variable the template does not declare
   * (pkg/email/templating/emailvalidator.go, ValidateEmailVariables) and
   * zitadel-provider's REST create always sends Code, while its html/text
   * validators only insist that REQUIRED variables be referenced.
   *
   * Not OptionalVariables: that escape hatch is for variables this body DOES
   * render but which may be absent at send time.
   */
  Code: 'K7QM2XD4',
  ActionUrl:
    'https://auth.datum.net/recover/complete?userId=349828036672626689&codeId=354110073216270337&code=K7QM2XD4',
  /**
   * NOT '60' — see user-account-recovery.tsx for why the literal preview value
   * must be absent from the rendered output. Keep both templates in step.
   */
  ExpiryMinutes: '45',
} as UserAccountRecoverySupportProps;

UserAccountRecoverySupport.Subject = 'Datum Support: set up a new passkey';

export default UserAccountRecoverySupport;
