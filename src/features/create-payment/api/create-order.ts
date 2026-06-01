import { apiEndpoints } from '@/shared/api/endpoints';
import { bitnovoHttpClient } from '@/shared/api/http-client';

export type FiatCurrencyCode =
  | 'ARS'
  | 'AUD'
  | 'BGN'
  | 'BOB'
  | 'BRL'
  | 'CAD'
  | 'CHF'
  | 'CLP'
  | 'COP'
  | 'DKK'
  | 'DOP'
  | 'EUR'
  | 'GBP'
  | 'GEL'
  | 'HUF'
  | 'ISK'
  | 'JPY'
  | 'KRW'
  | 'MXN'
  | 'NOK'
  | 'NZD'
  | 'PEN'
  | 'PLN'
  | 'PYG'
  | 'RON'
  | 'SEK'
  | 'SGD'
  | 'SVC'
  | 'USD'
  | 'UYU';

export type CreateOrderPayload = {
  address_additional?: string;
  address_number?: string;
  city?: string;
  country?: string;
  email_client?: string;
  expected_output_amount: number;
  fiat?: FiatCurrencyCode;
  full_name?: string;
  home_address?: string;
  input_currency?: string;
  internal_data?: string;
  language?: string;
  merchant_url_standby?: string;
  merchant_urlko?: string;
  merchant_urlok?: string;
  nif?: string;
  notes?: string;
  phone_number?: string;
  province?: string;
  reference?: string;
  zip_code?: string;
};

export type CreateOrderResponse = {
  fiat: FiatCurrencyCode;
  identifier: string;
  language: string;
  need_dni: boolean;
  reference: string | null;
  web_url: string;
};

export const toCreateOrderFormData = (payload: CreateOrderPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value !== 'undefined') {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  return bitnovoHttpClient.post<CreateOrderResponse>(
    apiEndpoints.orders,
    toCreateOrderFormData(payload),
  );
};
