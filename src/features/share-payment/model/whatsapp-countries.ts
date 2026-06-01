export type WhatsAppCountryCode = 'AR' | 'ES' | 'VE';

export type WhatsAppCountry = {
  code: WhatsAppCountryCode;
  dialCode: string;
  name: string;
};

export const whatsappCountries: WhatsAppCountry[] = [
  {
    code: 'ES',
    dialCode: '+34',
    name: 'Espana',
  },
  {
    code: 'AR',
    dialCode: '+54',
    name: 'Argentina',
  },
  {
    code: 'VE',
    dialCode: '+58',
    name: 'Venezuela',
  },
];

export const defaultWhatsAppCountryCode: WhatsAppCountryCode = 'ES';

export const getWhatsAppCountryByCode = (code: WhatsAppCountryCode) => {
  const matchedCountry = whatsappCountries.find(
    (country) => country.code === code,
  );

  if (matchedCountry) {
    return matchedCountry;
  }

  return {
    code: defaultWhatsAppCountryCode,
    dialCode: '+34',
    name: 'Espana',
  };
};
