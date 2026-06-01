import { router } from 'expo-router';
import { useEffect } from 'react';

type PaymentStatusMessage = {
  safe?: boolean;
  status?: string;
};

export const isCompletedPaymentStatus = (message: PaymentStatusMessage) => {
  return (
    message.status === 'CO' ||
    message.status === 'OC' ||
    (message.status === 'AC' && message.safe === true)
  );
};

export const usePaymentStatusSocket = (identifier?: string) => {
  useEffect(() => {
    if (!identifier) {
      return;
    }

    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/merchant/${identifier}`,
    );

    socket.onmessage = ({ data }) => {
      try {
        const message = JSON.parse(String(data)) as PaymentStatusMessage;

        if (isCompletedPaymentStatus(message)) {
          router.replace('/payment-completed');
        }
      } catch (error) {
        console.warn('Ignored malformed payment websocket message.', error);
      }
    };

    socket.onerror = () => {
      console.warn('Payment websocket connection error.');
    };

    return () => {
      socket.close();
    };
  }, [identifier]);
};
