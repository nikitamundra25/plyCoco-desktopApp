import englishLanguage from '../language/en.json';
import germanLanguage from '../language/de.json';

const Languages: any = {
  en: englishLanguage,
  de: germanLanguage,
};
export const languageTranslation = (
  key: string,
  replacement: any = {},
): string => {
  let lang = localStorage.getItem('language') || 'de';
  if (!Languages[lang]) {
    lang = 'en';
  }
  const language: any = Languages[lang];
  const languageMessages = language[key];
  for (const k in replacement) {
    if (replacement.hasOwnProperty(k)) {
      const value = replacement[k];
      console.log('====================================');
      console.log('value', value, k, languageMessages);
      console.log('====================================');
      languageMessages.replace(`:${k}`, `${value}`);
      console.log('====================================');
      console.log('languageMessages', languageMessages);
      console.log('====================================');
    }
  }
  const data: any = {
    languageMessages,
    language,
  };
  return data;
};
