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

export type Language = typeof languages[number];


export interface Localization {
    mainPageButtonCall: string;
    mainPageButtonCollect: string;
}

export const localization: Record<typeof languages[number], Localization> = {
    en: {
        mainPageButtonCall: 'call returber collector',
        mainPageButtonCollect: 'collect returnable waste',
    },
    da: {
        mainPageButtonCall: 'ring Returber-samleren',
        mainPageButtonCollect: 'indsamle returbare affald',
    },
    de: {
        mainPageButtonCall: 'rufen Sie den Returber-Sammler an',
        mainPageButtonCollect: 'sammeln Sie pfandfähigen Abfall',
    },
    et: {
        mainPageButtonCall: 'kutsuge Returberi koguja',
        mainPageButtonCollect: 'koguge tagastatav jäätmed',
    },
    fi: {
        mainPageButtonCall: 'soita Returber-kerääjälle',
        mainPageButtonCollect: 'kerää palautettava jäte',
    },
    he: {
        mainPageButtonCall: 'קרא לאספן של רטורבר',
        mainPageButtonCollect: 'אסוף פסולת מוחזרת',
    },
    hr: {
        mainPageButtonCall: 'nazovite sakupljača Returber',
        mainPageButtonCollect: 'skupljajte povratni otpad',
    },
    is: {
        mainPageButtonCall: 'hafðu samband við Returber safnarann',
        mainPageButtonCollect: 'safna endurvinnanlegu úrgangi',
    },
    ko: {
        mainPageButtonCall: 'Returber 수집기에 전화하세요',
        mainPageButtonCollect: '반품 가능한 폐기물 수집',
    },
    lt: {
        mainPageButtonCall: 'paskambinkite Returber surinkėjui',
        mainPageButtonCollect: 'rinkite grąžintinį atliekas',
    },
    lv: {
        mainPageButtonCall: 'zvaniet atpakaļuzņēmējam Returber',
        mainPageButtonCollect: 'savāciet atkārtoti izmantojamo atkritumu',
    },
    nl: {
        mainPageButtonCall: 'bel de Returber-verzamelaar',
        mainPageButtonCollect: 'verzamel statiegeldafval',
    },
    no: {
        mainPageButtonCall: 'ring Returber-samleren',
        mainPageButtonCollect: 'samle pantbart avfall',
    },
    pl: {
        mainPageButtonCall: 'zadzwoń do zbieracza Returber',
        mainPageButtonCollect: 'zbieraj odpady zwrotne',
    },
    ro: {
        mainPageButtonCall: 'cheamă colector Returber',
        mainPageButtonCollect: 'colectează deșeuri returnabile',
    },
    sk: {
        mainPageButtonCall: 'zavolajte zberača Returber',
        mainPageButtonCollect: 'zbierajte vrátený odpad',
    },
    sv: {
        mainPageButtonCall: 'ring Returber-samlaren',
        mainPageButtonCollect: 'samla in returavfall',
    },
};
