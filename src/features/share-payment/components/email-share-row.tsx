import { TextInput, View } from 'react-native';

import { isValidEmail } from '@/features/share-payment/utils/email';
import { appColors } from '@/shared/theme/colors';

import { ShareActionIcon } from './share-action-icon';
import { ShareSendButton } from './share-send-button';

type EmailShareRowProps = {
  email: string;
  onChangeEmail: (value: string) => void;
  onPressSend: () => void;
};

export const EmailShareRow = ({
  email,
  onChangeEmail,
  onPressSend,
}: EmailShareRowProps) => {
  const isSendDisabled = !isValidEmail(email);

  return (
    <View className="min-h-16 flex-row items-center gap-4 rounded-2xl border border-border bg-surface-muted px-5">
      <View className="w-5 items-center">
        <ShareActionIcon name="email" size={20} />
      </View>

      <TextInput
        accessibilityLabel="Correo electronico"
        autoCapitalize="none"
        autoCorrect={false}
        className="flex-1 self-center p-0 text-base leading-5 text-text"
        keyboardType="email-address"
        onChangeText={onChangeEmail}
        placeholder="cliente@email.com"
        placeholderTextColor={appColors['input-placeholder']}
        style={{
          includeFontPadding: false,
          paddingVertical: 0,
        }}
        value={email}
      />

      <ShareSendButton
        accessibilityLabel="Enviar por correo"
        disabled={isSendDisabled}
        onPress={onPressSend}
      />
    </View>
  );
};
