export const languages = [
    'en',
    'da',
    'de',
    'et',
    'fi',
    'he',
    'hr',
    'is',
    'ko',
    'lt',
    'lv',
    'nl',
    'no',
    'pl',
    'ro',
    'sk',
    'sv',
] as const;

export type Language = typeof languages[number];


export const languageMap: Record<typeof languages[number], string> = {
    en: 'English',
    da: 'Dansk',
    de: 'Deutsch',
    et: 'Eesti',
    fi: 'Suomi',
    he: 'עברית',
    hr: 'Hrvatski',
    is: 'Íslenska',
    ko: '한국어',
    lt: 'Lietuvių',
    lv: 'Latviešu',
    nl: 'Nederlands',
    no: 'Norsk',
    pl: 'Polski',
    ro: 'Română',
    sk: 'Slovenský',
    sv: 'Svenska',
};


export const countryToLanguage: { [key: string]: Language } = {
    us: 'en', gb: 'en', // English
    dk: 'da', // Danish
    de: 'de', at: 'de', ch: 'de', // German
    ee: 'et', // Estonian
    fi: 'fi', // Finnish
    il: 'he', // Hebrew
    hr: 'hr', // Croatian
    is: 'is', // Icelandic
    kr: 'ko', // Korean
    lt: 'lt', // Lithuanian
    lv: 'lv', // Latvian
    nl: 'nl', be: 'nl', // Dutch
    no: 'no', // Norwegian
    pl: 'pl', // Polish
    ro: 'ro', // Romanian
    sk: 'sk', // Slovak
    se: 'sv', // Swedish
};
