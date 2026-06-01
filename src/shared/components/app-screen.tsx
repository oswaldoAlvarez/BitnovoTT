import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AppScreen = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView
      className="flex-1 bg-screen"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets
        className="flex-1"
        contentContainerClassName="flex-grow p-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View className="flex-1 gap-5">{children}</View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
