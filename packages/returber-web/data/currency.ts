import {
    languages,
} from './languages';



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


export const returnPrices: Record<typeof languages[number], number> = {
    en: 0.25,  // USD
    da: 1.00,  // DKK (1 DKK for small containers, 1.5 DKK for large)
    de: 0.25,  // EUR
    et: 0.10,  // EUR
    fi: 0.15,  // EUR (small bottles/cans), 0.40 EUR (large bottles)
    he: 0.30,  // ILS
    hr: 0.50,  // HRK (3 HRK for most containers, but converting to EUR gives around 0.50 EUR)
    is: 0.10,  // ISK
    ko: 100,   // KRW (approx. 100 KRW)
    lt: 0.10,  // EUR
    lv: 0.10,  // EUR
    nl: 0.25,  // EUR (plastic bottles), 0.15 EUR (small bottles)
    no: 2.00,  // NOK (2 NOK for small, 3 NOK for large)
    pl: 0.50,  // PLN
    ro: 0.50,  // RON
    sk: 0.15,  // EUR
    sv: 1.00,  // SEK (approx. 1-2 SEK depending on size)
};
