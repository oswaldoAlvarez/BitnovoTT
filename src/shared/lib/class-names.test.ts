import { cn } from './class-names';

describe('cn', () => {
  it('joins truthy class names in order', () => {
    expect(cn('flex-1', false, 'gap-4', null, undefined, 'bg-screen')).toBe(
      'flex-1 gap-4 bg-screen',
    );
  });
});
