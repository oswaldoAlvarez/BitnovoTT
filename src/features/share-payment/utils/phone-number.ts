export const sanitizePhoneNumber = (value: string) => {
  return value.replace(/[^\d\s-]/g, '');
};

export const getPhoneDigits = (value: string) => {
  return value.replace(/\D/g, '');
};

export const hasValidPhoneNumber = (value: string) => {
  return getPhoneDigits(value).length >= 7;
};
