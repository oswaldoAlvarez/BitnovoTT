import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import type {
  CurrencyCode,
  PaymentCurrency,
} from '@/features/payment/model/currencies';
import { paymentCurrencies } from '@/features/payment/model/currencies';
import { selectSelectedCurrencyCode } from '@/features/payment/model/payment-selectors';
import { setSelectedCurrencyCode } from '@/features/payment/model/payment-slice';
import { CurrencyOptionRow } from '@/features/select-currency/components/currency-option-row';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { AppScreen } from '@/shared/components/app-screen';
import { AppText } from '@/shared/components/app-text';
import { BackButton } from '@/shared/components/back-button';
import { BaseInput } from '@/shared/components/base-input';
import { SearchIcon } from '@/shared/components/icons/search-icon';

const goBack = () => {
  router.back();
};

export const SelectCurrencyScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const selectedCurrencyCode = useAppSelector(selectSelectedCurrencyCode);

  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const filteredCurrencies = paymentCurrencies.filter((currency) => {
    if (!normalizedSearchValue) {
      return true;
    }

    const searchableCurrency =
      `${currency.name} ${currency.code}`.toLocaleLowerCase();

    return searchableCurrency.includes(normalizedSearchValue);
  });

  const handleSelectCurrency = (code: CurrencyCode) => {
    dispatch(setSelectedCurrencyCode(code));
    router.back();
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const renderCurrencyOption = (currency: PaymentCurrency) => {
    return (
      <CurrencyOptionRow
        currency={currency}
        isSelected={currency.code === selectedCurrencyCode}
        key={currency.code}
        onSelect={handleSelectCurrency}
      />
    );
  };

  return (
    <AppScreen>
      <View className="gap-5">
        <View className="relative min-h-12 flex-row items-center justify-center border-b border-surface-muted">
          <BackButton
            className="absolute left-0 h-9 w-9 items-center justify-center rounded-full bg-back-button"
            onPress={goBack}
          />

          <AppText className="text-[15px]" fontWeight="semibold">
            Selecciona una divisa
          </AppText>
        </View>

        <BaseInput
          accessibilityLabel="Buscar divisa"
          leftIcon={<SearchIcon />}
          onChangeText={handleSearchValueChange}
          placeholder="Buscar"
          value={searchValue}
        />

        <View className="gap-1">
          {filteredCurrencies.length ? (
            filteredCurrencies.map(renderCurrencyOption)
          ) : (
            <AppText color="muted" textAlign="center">
              No tenemos la divisa que buscas, pronto la tendremos.
            </AppText>
          )}
        </View>
      </View>
    </AppScreen>
  );
};
