import { bitnovoHttpClient } from '@/shared/api/http-client';

import {
  createOrder,
  toCreateOrderFormData,
  type CreateOrderResponse,
} from './create-order';

jest.mock('@/shared/api/http-client', () => ({
  bitnovoHttpClient: {
    post: jest.fn(),
  },
}));

class TestFormData {
  readonly parts: [string, string][] = [];

  append(key: string, value: string) {
    this.parts.push([key, value]);
  }
}

const originalFormData = globalThis.FormData;

const readFormDataParts = (formData: FormData) => {
  return (formData as unknown as TestFormData).parts;
};

describe('createOrder', () => {
  beforeEach(() => {
    globalThis.FormData = TestFormData as unknown as typeof FormData;
    jest.clearAllMocks();
  });

  afterAll(() => {
    globalThis.FormData = originalFormData;
  });

  it('serializes defined payload fields as multipart form data', () => {
    const formData = toCreateOrderFormData({
      expected_output_amount: 25.5,
      fiat: 'USD',
      language: 'ES',
      notes: 'Test payment',
    });

    expect(readFormDataParts(formData)).toEqual([
      ['expected_output_amount', '25.5'],
      ['fiat', 'USD'],
      ['language', 'ES'],
      ['notes', 'Test payment'],
    ]);
  });

  it('posts to the orders endpoint with FormData', async () => {
    const response: CreateOrderResponse = {
      fiat: 'USD',
      identifier: 'order-id',
      language: 'ES',
      need_dni: false,
      reference: null,
      web_url: 'https://payments.pre-bnvo.com/order-id',
    };

    jest.mocked(bitnovoHttpClient.post).mockResolvedValueOnce(response);

    await expect(
      createOrder({
        expected_output_amount: 25.5,
        fiat: 'USD',
        notes: 'Test payment',
      }),
    ).resolves.toEqual(response);

    expect(bitnovoHttpClient.post).toHaveBeenCalledWith(
      '/orders/',
      expect.any(FormData),
    );
  });
});
