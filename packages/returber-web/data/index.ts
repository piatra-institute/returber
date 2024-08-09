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

export const currencyMap: Record<typeof languages[number], string> = {
    en: 'USD',
    da: 'DKK',    // Denmark - Danish Krone
    de: 'EUR',    // Germany - Euro
    et: 'EUR',    // Estonia - Euro
    fi: 'EUR',    // Finland - Euro
    he: 'ILS',    // Israel - Israeli Shekel
    hr: 'EUR',    // Croatia - Euro
    is: 'ISK',    // Iceland - Icelandic Króna
    ko: 'KRW',    // South Korea - South Korean Won
    lt: 'EUR',    // Lithuania - Euro
    lv: 'EUR',    // Latvia - Euro
    nl: 'EUR',    // Netherlands - Euro
    no: 'NOK',    // Norway - Norwegian Krone
    pl: 'PLN',    // Poland - Polish Złoty
    ro: 'RON',    // Romania - Romanian Leu
    sk: 'EUR',    // Slovakia - Euro
    sv: 'SEK',    // Sweden - Swedish Krona
};


export type Language = typeof languages[number];


export interface Localization {
    mainPageButtonCall: string;
    mainPageButtonCollect: string;
    callPictureReturnables: string;
    callReturnables: string;
    callPickTime: string;
    cancel: string;
}

export const localization: Record<typeof languages[number], Localization> = {
    en: {
        mainPageButtonCall: 'call returber collector',
        mainPageButtonCollect: 'collect returnable waste',
        callPictureReturnables: 'picture the returnables',
        callReturnables: 'returnables',
        callPickTime: 'pick time',
        cancel: 'cancel',
    },
    da: {
        mainPageButtonCall: 'ring returber-samleren',
        mainPageButtonCollect: 'indsamle returbare affald',
        callPictureReturnables: 'tag billede af returbare',
        callReturnables: 'returbare',
        callPickTime: 'vælg tid',
        cancel: 'annuller',
    },
    de: {
        mainPageButtonCall: 'rufen Sie den returber-Sammler an',
        mainPageButtonCollect: 'sammeln Sie pfandfähigen Abfall',
        callPictureReturnables: 'Bild der Pfandflaschen',
        callReturnables: 'Pfandflaschen',
        callPickTime: 'Zeit auswählen',
        cancel: 'stornieren',
    },
    et: {
        mainPageButtonCall: 'kutsuge returberi koguja',
        mainPageButtonCollect: 'koguge tagastatav jäätmed',
        callPictureReturnables: 'pildistage tagastatavad',
        callReturnables: 'tagastatavad',
        callPickTime: 'vali aeg',
        cancel: 'tühistama',
    },
    fi: {
        mainPageButtonCall: 'soita returber-kerääjälle',
        mainPageButtonCollect: 'kerää palautettava jäte',
        callPictureReturnables: 'ota kuva palautettavista',
        callReturnables: 'palautettavat',
        callPickTime: 'valitse aika',
        cancel: 'peruuttaa',
    },
    he: {
        mainPageButtonCall: 'קרא לאספן של רטורבר',
        mainPageButtonCollect: 'אסוף פסולת מוחזרת',
        callPictureReturnables: 'צלם תמונה של פסולת מוחזרת',
        callReturnables: 'פסולת מוחזרת',
        callPickTime: 'בחר זמן',
        cancel: 'לְבַטֵל',
    },
    hr: {
        mainPageButtonCall: 'nazovite sakupljača returber',
        mainPageButtonCollect: 'skupljajte povratni otpad',
        callPictureReturnables: 'snimite sliku povratnih',
        callReturnables: 'povratnih',
        callPickTime: 'odaberite vrijeme',
        cancel: 'otkazati',
    },
    is: {
        mainPageButtonCall: 'hafðu samband við returber safnarann',
        mainPageButtonCollect: 'safna endurvinnanlegu úrgangi',
        callPictureReturnables: 'taktu mynd af endurvinnanlegu',
        callReturnables: 'endurvinnanlegu',
        callPickTime: 'veldu tíma',
        cancel: 'hætta við',
    },
    ko: {
        mainPageButtonCall: 'returber 수집기에 전화하세요',
        mainPageButtonCollect: '반품 가능한 폐기물 수집',
        callPictureReturnables: '반품 가능한 사진 찍기',
        callReturnables: '반품 가능한',
        callPickTime: '시간 선택',
        cancel: '취소',
    },
    lt: {
        mainPageButtonCall: 'paskambinkite returber surinkėjui',
        mainPageButtonCollect: 'rinkite grąžintinį atliekas',
        callPictureReturnables: 'padarykite nuotrauką grąžintinės',
        callReturnables: 'grąžintinės',
        callPickTime: 'pasirinkite laiką',
        cancel: 'atšaukti',
    },
    lv: {
        mainPageButtonCall: 'zvaniet atpakaļuzņēmējam returber',
        mainPageButtonCollect: 'savāciet atkārtoti izmantojamo atkritumu',
        callPictureReturnables: 'uzņemiet attēlu atkārtoti izmantojamā',
        callReturnables: 'atkārtoti izmantojamā',
        callPickTime: 'izvēlieties laiku',
        cancel: 'atcelt',
    },
    nl: {
        mainPageButtonCall: 'bel de returber-verzamelaar',
        mainPageButtonCollect: 'verzamel statiegeldafval',
        callPictureReturnables: 'maak een foto van statiegeld',
        callReturnables: 'statiegeld',
        callPickTime: 'tijd kiezen',
        cancel: 'annuleren',
    },
    no: {
        mainPageButtonCall: 'ring returber-samleren',
        mainPageButtonCollect: 'samle pantbart avfall',
        callPictureReturnables: 'ta bilde av pantbart',
        callReturnables: 'pantbart',
        callPickTime: 'velg tid',
        cancel: 'avbryt',
    },
    pl: {
        mainPageButtonCall: 'zadzwoń do zbieracza returber',
        mainPageButtonCollect: 'zbieraj odpady zwrotne',
        callPictureReturnables: 'zrób zdjęcie zwrotnych',
        callReturnables: 'zwrotne',
        callPickTime: 'wybierz czas',
        cancel: 'anuluj',
    },
    ro: {
        mainPageButtonCall: 'cheamă colector returber',
        mainPageButtonCollect: 'colectează deșeuri returnabile',
        callPictureReturnables: 'pozează returnabile',
        callReturnables: 'returnabile',
        callPickTime: 'alege timpul',
        cancel: 'anulare',
    },
    sk: {
        mainPageButtonCall: 'zavolajte zberača returber',
        mainPageButtonCollect: 'zbierajte vrátený odpad',
        callPictureReturnables: 'fotografujte vrátené',
        callReturnables: 'vrátené',
        callPickTime: 'vyberte čas',
        cancel: 'zrušiť',
    },
    sv: {
        mainPageButtonCall: 'ring returber-samlaren',
        mainPageButtonCollect: 'samla in returavfall',
        callPictureReturnables: 'ta bild av returavfall',
        callReturnables: 'returavfall',
        callPickTime: 'välj tid',
        cancel: 'avbryt',
    },
};
