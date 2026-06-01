import { Linking } from 'react-native';

export const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

type OpenEmailComposerParams = {
  body: string;
  recipient: string;
  subject: string;
};

const buildEmailComposeUrls = ({
  body,
  recipient,
  subject,
}: OpenEmailComposerParams) => {
  const encodedRecipient = encodeURIComponent(recipient);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return [
    `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`,
    `googlegmail://co?to=${encodedRecipient}&subject=${encodedSubject}&body=${encodedBody}`,
    `ms-outlook://compose?to=${encodedRecipient}&subject=${encodedSubject}&body=${encodedBody}`,
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedRecipient}&su=${encodedSubject}&body=${encodedBody}`,
  ];
};

export const openEmailComposer = async (params: OpenEmailComposerParams) => {
  const composeUrls = buildEmailComposeUrls(params);

  for (const url of composeUrls) {
    try {
      await Linking.openURL(url);
      return true;
    } catch {
      continue;
    }
  }

  return false;
};
