export function convertTurkishChars(str: string) {
  const translate_re = /[öüğıçÇÖÜİĞ]/g;

  const translate: Record<string, string> = {
    ö: 'o',
    ü: 'u',
    ğ: 'g',
    ı: 'i',
    ç: 'c',
    Ç: 'C',
    Ö: 'O',
    Ü: 'U',
    İ: 'I',
    Ğ: 'G',
  };

  return str.replace(translate_re, (match) => translate[match]);
}
