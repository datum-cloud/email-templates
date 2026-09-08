import 'web-streams-polyfill/polyfill';

import {
  AccountRecoveryBody,
  type AccountRecoveryBodyProps,
} from './components';
import { MainLayout } from './layouts';

/**
 * Support-initiated account recovery: a staff member created a
 * PasskeyRegistrationLink for this user. Same body as the self-serve mail;
 * the variant switches the lead and the "if this wasn't you" sentence so the
 * recipient can sanity-check that they really did contact support.
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
