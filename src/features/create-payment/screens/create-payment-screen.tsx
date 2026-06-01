import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import type { CreateOrderResponse } from '@/features/create-payment/api/create-order';
import { CurrencySelectorButton } from '@/features/create-payment/components/currency-selector-button';
import { useCreateOrderMutation } from '@/features/create-payment/hooks/use-create-order-mutation';
import { selectSelectedCurrency } from '@/features/payment/model/payment-selectors';
import { setActiveOrder } from '@/features/payment/model/payment-slice';
import { AmountInput } from '@/shared/components/amount-input';
import { AppScreen } from '@/shared/components/app-screen';
import { AppText } from '@/shared/components/app-text';
import { BaseInput } from '@/shared/components/base-input';
import { PrimaryButton } from '@/shared/components/primary-button';
import { hasValidAmount } from '@/shared/utils/amount';

const openCurrencySelector = () => {
  router.push('/select-currency');
};

export const CreatePaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const createOrderMutation = useCreateOrderMutation();
  const selectedCurrency = useAppSelector(selectSelectedCurrency);
  const canContinue = hasValidAmount(amount) && !createOrderMutation.isPending;

  const handleAmountChange = (nextAmount: string) => {
    setAmount(nextAmount);
  };

  const handleDescriptionChange = (nextDescription: string) => {
    setDescription(nextDescription);
  };

  const handleCreateOrderSuccess = (order: CreateOrderResponse) => {
    dispatch(
      setActiveOrder({
        amount: Number(amount),
        currencyCode: selectedCurrency.code,
        identifier: order.identifier,
        webUrl: order.web_url,
      }),
    );
    router.push('/share-payment');
  };

  const handleCreateOrder = () => {
    createOrderMutation.mutate(
      {
        expected_output_amount: Number(amount),
        fiat: selectedCurrency.code,
        notes: description,
      },
      {
        onSuccess: handleCreateOrderSuccess,
      },
    );
  };

  return (
    <AppScreen>
      <View className="gap-11">
        <View className="min-h-12 flex-row items-center justify-center">
          <AppText className="text-[15px]" fontWeight="semibold">
            Crear pago
          </AppText>

          <CurrencySelectorButton
            className="absolute right-0"
            currency={selectedCurrency}
            onPress={openCurrencySelector}
          />
        </View>

        <View className="items-center gap-10">
          <AmountInput
            currencySymbol={selectedCurrency.symbol}
            currencySymbolPosition={selectedCurrency.symbolPosition}
            onAmountChange={handleAmountChange}
            value={amount}
          />

          <View className="w-full gap-2">
            <AppText className="text-sm" fontWeight="semibold">
              Concepto
            </AppText>
            <BaseInput
              accessibilityLabel="Concepto"
              maxLength={140}
              onChangeText={handleDescriptionChange}
              placeholder="Añade descripción del pago"
              value={description}
            />
          </View>
        </View>

        {createOrderMutation.isError && (
          <AppText color="muted" textAlign="center">
            No se pudo crear el pago. Intentalo de nuevo.
          </AppText>
        )}

        <PrimaryButton
          disabled={!canContinue}
          label={
            createOrderMutation.isPending ? 'Creando pago...' : 'Continuar'
          }
          onPress={handleCreateOrder}
        />
      </View>
    </AppScreen>
  );
};
