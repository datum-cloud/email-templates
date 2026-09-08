import 'web-streams-polyfill/polyfill';

import {
  AccountRecoveryBody,
  type AccountRecoveryBodyProps,
} from './components';
import { MainLayout } from './layouts';

/**
 * Self-serve account recovery: the user asked for a new passkey at /recover.
 * All copy lives in AccountRecoveryBody; this file fixes the variant, the
 * subject and the preview props. The support-initiated sibling is
 * user-account-recovery-support.tsx.
 */
type UserAccountRecoveryProps = Omit<AccountRecoveryBodyProps, 'variant'>;

export const UserAccountRecovery = (props: UserAccountRecoveryProps) => {
  const previewText = 'Set up a new passkey for your Datum account';

  return (
    <MainLayout preview={previewText}>
      <AccountRecoveryBody variant="self" {...props} />
    </MainLayout>
  );
};

UserAccountRecovery.PreviewProps = {
  UserName: 'Wave Two',
  Code: 'K7QM2XD4',
  ActionUrl:
    'https://auth.datum.net/recover/complete?userId=349828036672626689&codeId=354110073216270337&code=K7QM2XD4',
  /**
   * NOT '60' — the configured lifetime — on purpose. generate-yaml.js
   * substitutes the literal preview value as well as the placeholder token, so
   * '60' also rewrites every `font-weight:600` in the rendered CSS to
   * `font-weight:{{.ExpiryMinutes}}0`, which renders as garbage for any expiry
   * other than 60. The real lifetime comes from zitadel-provider at send time;
   * this value only has to be absent from the rendered output. If you change
   * it, check `grep -c <value> out-html/user-account-recovery.html` is 0.
   */
  ExpiryMinutes: '45',
} as UserAccountRecoveryProps;

UserAccountRecovery.Subject = 'Set up a new passkey for Datum';

export default UserAccountRecovery;
