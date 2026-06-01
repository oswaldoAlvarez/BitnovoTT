export const sanitizeAmountValue = (nextValue: string) => {
  const normalizedValue = nextValue.replace(',', '.').replace(/[^\d.]/g, '');
  const [integerPart = '', ...decimalParts] = normalizedValue.split('.');
  const cleanIntegerPart = integerPart.replace(/^0+(?=\d)/, '');

  if (!normalizedValue.includes('.')) {
    return cleanIntegerPart;
  }

  return `${cleanIntegerPart || '0'}.${decimalParts.join('').slice(0, 2)}`;
};

export const hasValidAmount = (amount: string) => {
  return Number(amount) > 0;
};
