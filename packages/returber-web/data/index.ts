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

export const languageMap: Record<typeof languages[number], string> = {
    en: 'English',
    da: 'Danish',
    de: 'German',
    et: 'Estonian',
    fi: 'Finnish',
    he: 'Hebrew',
    hr: 'Croatian',
    is: 'Icelandic',
    ko: 'Korean',
    lt: 'Lithuanian',
    lv: 'Latvian',
    nl: 'Dutch',
    no: 'Norwegian',
    pl: 'Polish',
    ro: 'Romanian',
    sk: 'Slovak',
    sv: 'Swedish',
};

export type Language = typeof languages[number];


export const localization = {
    en: {
        mainPageButtonCall: 'call a returber collector',
        mainPageButtonCollect: 'or collect returnable waste',
    },
    da: {
        mainPageButtonCall: 'ring en returber samler',
        mainPageButtonCollect: 'eller indsamle returbart affald',
    },
    de: {
        mainPageButtonCall: 'rufen Sie einen Returber-Sammler an',
        mainPageButtonCollect: 'oder sammeln Sie rückführbaren Abfall',
    },
    et: {
        mainPageButtonCall: 'helista Returberi kogujale',
        mainPageButtonCollect: 'või koguge tagastatavat jäätet',
    },
    fi: {
        mainPageButtonCall: 'soita Returber-kerääjälle',
        mainPageButtonCollect: 'tai kerää palautettavaa jätettä',
    },
    he: {
        mainPageButtonCall: 'קרא לאוסף Returber',
        mainPageButtonCollect: 'או לאסוף פסולת מוחזרת',
    },
    hr: {
        mainPageButtonCall: 'nazovi sakupljača Returber',
        mainPageButtonCollect: 'ili sakupiti otpad koji se može vratiti',
    },
    is: {
        mainPageButtonCall: 'hafa samband við Returber safnara',
        mainPageButtonCollect: 'eða safna endurvinnanlegu úrgangi',
    },
    ko: {
        mainPageButtonCall: 'Returber 수집가에게 전화',
        mainPageButtonCollect: '또는 반환 가능한 폐기물 수집',
    },
    lt: {
        mainPageButtonCall: 'paskambinkite Returber rinkėjui',
        mainPageButtonCollect: 'arba surinkite grąžinamą atlieką',
    },
    lv: {
        mainPageButtonCall: 'zvaniet Returber kolekcionāram',
        mainPageButtonCollect: 'vai savāciet atgriezeniskos atkritumus',
    },
    nl: {
        mainPageButtonCall: 'bel een Returber-verzamelaar',
        mainPageButtonCollect: 'of verzamel retourafval',
    },
    no: {
        mainPageButtonCall: 'ring en Returber-samler',
        mainPageButtonCollect: 'eller samle returbart avfall',
    },
    pl: {
        mainPageButtonCall: 'zadzwoń do zbieracza Returber',
        mainPageButtonCollect: 'lub zbierz odpady zwracalne',
    },
    ro: {
        mainPageButtonCall: 'sună un colector Returber',
        mainPageButtonCollect: 'sau colectează deșeuri returnabile',
    },
    sk: {
        mainPageButtonCall: 'zavolajte zberačovi Returber',
        mainPageButtonCollect: 'alebo zozbierajte vrátený odpad',
    },
    sv: {
        mainPageButtonCall: 'ring en Returber-samlare',
        mainPageButtonCollect: 'eller samla returnerbar avfall',
    },
};
