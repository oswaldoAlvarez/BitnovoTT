import { BlurView } from 'expo-blur';
import { cssInterop } from 'nativewind';
import { Modal, Pressable, View } from 'react-native';

import { AppText } from '@/shared/components/app-text';
import { CircleIcon } from '@/shared/components/icons/circle-icon';
import { PrimaryButton } from '@/shared/components/primary-button';

type RequestSentModalProps = {
  onClose: () => void;
  visible: boolean;
};

cssInterop(BlurView, {
  className: 'style',
});

export const RequestSentModal = ({
  onClose,
  visible,
}: RequestSentModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center px-3"
        onPress={onClose}
      >
        <BlurView className="absolute inset-0" intensity={80} tint="light" />

        <View
          className="absolute inset-0 bg-slate-400/30"
          pointerEvents="none"
        />

        <Pressable
          className="w-full"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="min-h-[320px] items-center justify-center rounded-[36px] bg-surface px-10 shadow-lg">
            <CircleIcon size={80} />

            <AppText className="mt-2" size="xl" textAlign="center">
              Solicitud enviada
            </AppText>

            <AppText className="mt-4" color="muted" textAlign="center">
              Tu solicitud de pago ha sido enviada con éxito.
            </AppText>

            <View className="mt-6 w-full">
              <PrimaryButton label="Entendido" onPress={onClose} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
