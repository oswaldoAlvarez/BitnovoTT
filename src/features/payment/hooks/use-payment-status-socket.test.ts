import { renderHook } from '@testing-library/react-native';

import {
  isCompletedPaymentStatus,
  usePaymentStatusSocket,
} from './use-payment-status-socket';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

class TestWebSocket {
  static instances: TestWebSocket[] = [];

  close = jest.fn();
  onmessage: ((event: { data: unknown }) => void) | null = null;

  constructor(readonly url: string) {
    TestWebSocket.instances.push(this);
  }
}

const originalWebSocket = globalThis.WebSocket;

describe('isCompletedPaymentStatus', () => {
  it.each([{ status: 'CO' }, { status: 'OC' }, { safe: true, status: 'AC' }])(
    'accepts a completed payment message',
    (message) => {
      expect(isCompletedPaymentStatus(message)).toBe(true);
    },
  );

  it('keeps waiting while an accepted payment is not safe', () => {
    expect(isCompletedPaymentStatus({ safe: false, status: 'AC' })).toBe(false);
  });
});

describe('usePaymentStatusSocket', () => {
  beforeEach(() => {
    TestWebSocket.instances = [];
    globalThis.WebSocket = TestWebSocket as unknown as typeof WebSocket;
  });

  afterAll(() => {
    globalThis.WebSocket = originalWebSocket;
  });

  it('keeps one socket per active order and closes stale connections', () => {
    const { rerender, unmount } = renderHook<void, { identifier: string }>(
      ({ identifier }) => usePaymentStatusSocket(identifier),
      {
        initialProps: { identifier: 'order-1' },
      },
    );

    expect(TestWebSocket.instances).toHaveLength(1);
    expect(TestWebSocket.instances[0]!.url).toBe(
      'wss://payments.pre-bnvo.com/ws/merchant/order-1',
    );

    rerender({ identifier: 'order-1' });

    expect(TestWebSocket.instances).toHaveLength(1);

    rerender({ identifier: 'order-2' });

    expect(TestWebSocket.instances[0]!.close).toHaveBeenCalledTimes(1);
    expect(TestWebSocket.instances).toHaveLength(2);

    unmount();

    expect(TestWebSocket.instances[1]!.close).toHaveBeenCalledTimes(1);
  });
});
