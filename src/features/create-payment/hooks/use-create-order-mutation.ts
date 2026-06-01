import { useMutation } from '@tanstack/react-query';

import {
  createOrder,
  type CreateOrderPayload,
  type CreateOrderResponse,
} from '@/features/create-payment/api/create-order';

export const useCreateOrderMutation = () => {
  return useMutation<CreateOrderResponse, Error, CreateOrderPayload>({
    mutationFn: createOrder,
  });
};
