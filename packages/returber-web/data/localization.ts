import {
    languages,
} from './languages';



export interface Localization {
    mainPageButtonCalls: string;
    mainPageButtonCall: string;
    mainPageButtonCollect: string;
    mainPageButtonReturn: string;
    callPictureReturnables: string;
    callReturnables: string;
    callPerPiece: string;
    callPickTime: string;
    callNextHours: string;
    callCustom: string;
    callCustomPlaceholder: string;
    callReturberSuccess: string;
    callNewReturber: string;
    returnAddReturnLocation: string;
    returnEditReturnLocation: string;
    returnPointPicturePoint: string;
    returnPointCreatedSuccess: string;
    cancel: string;
    active: string;
    inactive: string;
    queue: string;
    people: string;
    home: string;
    collect: string;
    somethingWentWrongTryAgain: string;
}

export const localization: Record<typeof languages[number], Localization> = {
    en: {
        mainPageButtonCalls: 'returnable calls',
        mainPageButtonCall: 'call returber collector',
        mainPageButtonCollect: 'collect returnable waste',
        mainPageButtonReturn: 'return locations',
        callPictureReturnables: 'picture the returnables',
        callReturnables: 'returnables',
        callPerPiece: 'per piece out of',
        callPickTime: 'pick time',
        callNextHours: 'next 4 hours',
        callCustom: 'custom',
        callCustomPlaceholder: 'in 2 hours, next Tuesday, etc.',
        callReturberSuccess: 'returber task has been posted',
        callNewReturber: 'new returber',
        returnAddReturnLocation: 'add return location',
        returnEditReturnLocation: 'edit return location',
        returnPointPicturePoint: 'picture the return location',
        returnPointCreatedSuccess: 'return point has been created',
        cancel: 'cancel',
        active: 'active',
        inactive: 'inactive',
        queue: 'queue',
        people: 'people',
        home: 'home',
        collect: 'collect',
        somethingWentWrongTryAgain: 'something went wrong, try again',
    },
    da: {
        mainPageButtonCalls: 'returbare opkald',
        mainPageButtonCall: 'ring returber-samleren',
        mainPageButtonCollect: 'indsamle returbare affald',
        mainPageButtonReturn: 'retursteder',
        callPictureReturnables: 'tag billede af returbare',
        callReturnables: 'returbare',
        callPerPiece: 'per stykke ud af',
        callPickTime: 'vælg tid',
        callNextHours: 'næste 4 timer',
        callCustom: 'tilpasset',
        callCustomPlaceholder: 'om 2 timer, næste tirsdag, osv.',
        callReturberSuccess: 'returber-opgave er blevet oprettet',
        returnPointCreatedSuccess: 'retursted er blevet oprettet',
        callNewReturber: 'ny returber',
        returnAddReturnLocation: 'tilføj retursted',
        returnEditReturnLocation: 'rediger retursted',
        returnPointPicturePoint: 'tag bille af retursted',
        cancel: 'annuller',
        active: 'aktiv',
        inactive: 'inaktiv',
        queue: 'kø',
        people: 'mennesker',
        home: 'hjem',
        collect: 'indsamle',
        somethingWentWrongTryAgain: 'noget gik galt, prøv igen',
    },
    de: {
        mainPageButtonCalls: 'rückrufbare Anrufe',
        mainPageButtonCall: 'rufen Sie den returber-Sammler an',
        mainPageButtonCollect: 'sammeln Sie pfandfähigen Abfall',
        mainPageButtonReturn: 'Rückgabeorte',
        callPictureReturnables: 'Bild der Pfandflaschen',
        callReturnables: 'Pfandflaschen',
        callPerPiece: 'pro Stück von',
        callPickTime: 'Zeit auswählen',
        callNextHours: 'nächsten 4 Stunden',
        callCustom: 'benutzerdefiniert',
        callCustomPlaceholder: 'in 2 Stunden, nächsten Dienstag, usw.',
        callReturberSuccess: 'returber-Aufgabe wurde erstellt',
        callNewReturber: 'neuer returber',
        returnAddReturnLocation: 'Rückgabeort hinzufügen',
        returnEditReturnLocation: 'Rückgabeort bearbeiten',
        returnPointPicturePoint: 'Bild des Rückgabeorts',
        returnPointCreatedSuccess: 'Rückgabeort wurde erstellt',
        cancel: 'stornieren',
        active: 'aktiv',
        inactive: 'inaktiv',
        queue: 'Warteschlange',
        people: 'Menschen',
        home: 'Zuhause',
        collect: 'sammeln',
        somethingWentWrongTryAgain: 'etwas ist schief gelaufen, versuchen Sie es erneut',
    },
    et: {
        mainPageButtonCalls: 'tagastatavad kõned',
        mainPageButtonCall: 'kutsuge returberi koguja',
        mainPageButtonCollect: 'koguge tagastatav jäätmed',
        mainPageButtonReturn: 'tagastuskohad',
        callPictureReturnables: 'pildistage tagastatavad',
        callReturnables: 'tagastatavad',
        callPerPiece: 'tükist',
        callPickTime: 'vali aeg',
        callNextHours: 'järgmised 4 tundi',
        callCustom: 'kohandatud',
        callCustomPlaceholder: '2 tunni pärast, järgmisel teisipäeval jne',
        callReturberSuccess: 'returber ülesanne on postitatud',
        callNewReturber: 'uus returber',
        returnAddReturnLocation: 'lisage tagastuskoht',
        returnEditReturnLocation: 'muuda tag tagastuskoht',
        returnPointPicturePoint: 'pildistage tagastuskoht',
        returnPointCreatedSuccess: 'tagastuspunkt on loodud',
        cancel: 'tühistama',
        active: 'aktiivne',
        inactive: 'mitteaktiivne',
        queue: 'järjekord',
        people: 'inimesed',
        home: 'kodu',
        collect: 'koguma',
        somethingWentWrongTryAgain: 'midagi läks valesti, proovige uuesti',
    },
    fi: {
        mainPageButtonCalls: 'palautett avat puhelut',
        mainPageButtonCall: 'soita returber-kerääjälle',
        mainPageButtonCollect: 'kerää palautettava jäte',
        mainPageButtonReturn: 'palautuspaikat',
        callPictureReturnables: 'ota kuva palautettavista',
        callReturnables: 'palautettavat',
        callPerPiece: 'kappaletta',
        callPickTime: 'valitse aika',
        callNextHours: 'seuraavat 4 tuntia',
        callCustom: 'mukautettu',
        callCustomPlaceholder: '2 tunnin kuluttua, ensi tiistaina jne.',
        callReturberSuccess: 'returber-tehtävä on lähetetty',
        callNewReturber: 'uusi returber',
        returnAddReturnLocation: 'lisää palautuspaikka',
        returnEditReturnLocation: 'muokkaa palautuspaikkaa',
        returnPointPicturePoint: 'ota kuva palautuspaikasta',
        returnPointCreatedSuccess: 'palautuspiste on luotu',
        cancel: 'peruuttaa',
        active: 'aktiivinen',
        inactive: 'epäaktiivinen',
        queue: 'jono',
        people: 'ihmiset',
        home: 'koti',
        collect: 'kerätä',
        somethingWentWrongTryAgain: 'jotain meni pieleen, yritä uudelleen',
    },
    he: {
        mainPageButtonCalls: 'שיחות מוחזרות',
        mainPageButtonCall: 'קרא לאספן של רטורבר',
        mainPageButtonCollect: 'אסוף פסולת מוחזרת',
        mainPageButtonReturn: 'מיקומי החזרה',
        callPictureReturnables: 'צלם תמונה של פסולת מוחזרת',
        callReturnables: 'פסולת מוחזרת',
        callPerPiece: 'לכל חתיכה מתוך',
        callPickTime: 'בחר זמן',
        callNextHours: '4 השעות הבאות',
        callCustom: 'המותאם אישית',
        callCustomPlaceholder: 'בעוד 2 שעות, ביום שלישי הבא וכו',
        callReturberSuccess: 'המשימה של רטורבר פורסמה',
        callNewReturber: 'רטורבר חדש',
        returnAddReturnLocation: 'הוסף מיקום החזרה',
        returnEditReturnLocation: 'ערוך מיקום החזרה',
        returnPointPicturePoint: 'צלם את מיקום ההחזרה',
        returnPointCreatedSuccess: 'נקודת ההחזרה נוצרה',
        cancel: 'לְבַטֵל',
        active: 'פָּעִיל',
        inactive: 'לֹא פָּעִיל',
        queue: 'תור',
        people: 'אנשים',
        home: 'בית',
        collect: 'לְאָסוֹף',
        somethingWentWrongTryAgain: 'משהו השתבש, נסה שוב',
    },
    hr: {
        mainPageButtonCalls: 'povratni pozivi',
        mainPageButtonCall: 'nazovite sakupljača returber',
        mainPageButtonCollect: 'skupljajte povratni otpad',
        mainPageButtonReturn: 'lokacije povratka',
        callPictureReturnables: 'snimite sliku povratnih',
        callReturnables: 'povratnih',
        callPerPiece: 'po komadu od',
        callPickTime: 'odaberite vrijeme',
        callNextHours: 'sljedećih 4 sata',
        callCustom: 'prilagođeno',
        callCustomPlaceholder: 'za 2 sata, sljedeći utorak itd.',
        callReturberSuccess: 'returber zadatak je objavljen',
        callNewReturber: 'novi returber',
        returnAddReturnLocation: 'dodajte lokaciju povratka',
        returnEditReturnLocation: 'uredi lokaciju povratka',
        returnPointPicturePoint: 'snimite lokaciju povratka',
        returnPointCreatedSuccess: 'lokacija povratka je stvorena',
        cancel: 'otkazati',
        active: 'aktivan',
        inactive: 'neaktivan',
        queue: 'red',
        people: 'ljudi',
        home: 'dom',
        collect: 'skupiti',
        somethingWentWrongTryAgain: 'nešto je pošlo po zlu, pokušajte ponovo',
    },
    is: {
        mainPageButtonCalls: 'endurvinnanlegar símtölur',
        mainPageButtonCall: 'hafðu samband við returber safnarann',
        mainPageButtonCollect: 'safna endurvinnanlegu úrgangi',
        mainPageButtonReturn: 'endurvinnslustaðir',
        callPictureReturnables: 'taktu mynd af endurvinnanlegu',
        callReturnables: 'endurvinnanlegu',
        callPerPiece: 'fyrir hvern einasta',
        callPickTime: 'veldu tíma',
        callNextHours: 'næstu 4 klukkustundir',
        callCustom: 'sérsniðið',
        callCustomPlaceholder: 'eftir 2 klukkustundir, næsta þriðjudag o.fl.',
        callReturberSuccess: 'returber verkefni hefur verið bókað',
        callNewReturber: 'nýr returber',
        returnAddReturnLocation: 'bæta við endurvinnslustað',
        returnEditReturnLocation: 'breyta endurvinnslustað',
        returnPointPicturePoint: 'taktu my nd af endurvinnslustað',
        returnPointCreatedSuccess: 'endurvinnslustaður hefur verið búinn til',
        cancel: 'hætta við',
        active: 'virkur',
        inactive: 'óvirkur',
        queue: 'biðröð',
        people: 'fólk',
        home: 'heimili',
        collect: 'safna',
        somethingWentWrongTryAgain: 'eitthvað fór úrskeiðis, reyndu aftur',
    },
    ko: {
        mainPageButtonCalls: '반품 가능한 전화',
        mainPageButtonCall: 'returber 수집기에 전화하세요',
        mainPageButtonCollect: '반품 가능한 폐기물 수집',
        mainPageButtonReturn: '반품 위치',
        callPictureReturnables: '반품 가능한 사진 찍기',
        callReturnables: '반품 가능한',
        callPerPiece: '개당',
        callPickTime: '시간 선택',
        callNextHours: '다음 4 시간',
        callCustom: '사용자 정의',
        callCustomPlaceholder: '2 시간 후, 다음 화요일 등',
        callReturberSuccess: 'returber 작업이 게시되었습니다',
        callNewReturber: '새로운 returber',
        returnAddReturnLocation: '반품 위치 추가',
        returnEditReturnLocation: '반품 위치 편집',
        returnPointPicturePoint: '반품 위치 사진',
        returnPointCreatedSuccess: '반품 지점이 생성되었습니다',
        cancel: '취소',
        active: '활성화',
        inactive: '비활성화',
        queue: '대기열',
        people: '사람들',
        home: '집',
        collect: '수집',
        somethingWentWrongTryAgain: '문제가 발생했습니다. 다시 시도하세요',
    },
    lt: {
        mainPageButtonCalls: 'grąžinimo skambučiai',
        mainPageButtonCall: 'paskambinkite returber surinkėjui',
        mainPageButtonCollect: 'rinkite grąžintinį atliekas',
        mainPageButtonReturn: 'grąžinimo vietos',
        callPictureReturnables: 'padarykite nuotrauką grąžintinės',
        callReturnables: 'grąžintinės',
        callPerPiece: 'vienam gabalui iš',
        callPickTime: 'pasirinkite laiką',
        callNextHours: 'kitą 4 valandas',
        callCustom: 'pasirinktinai',
        callCustomPlaceholder: 'po 2 valandų, kitą antradienį ir t.t.',
        callReturberSuccess: 'returber užduotis paskelbta',
        callNewReturber: 'naujas returber',
        returnAddReturnLocation: 'pridėti grąžinimo vietą',
        returnEditReturnLocation: 'redaguoti grąžinimo vietą',
        returnPointPicturePoint: 'padarykite nuotrauką grąžinimo vietos',
        returnPointCreatedSuccess: 'grąžinimo taškas sukurtas',
        cancel: 'atšaukti',
        active: 'aktyvus',
        inactive: 'neaktyvus',
        queue: 'eilė',
        people: 'žmonės',
        home: 'namai',
        collect: 'rinkti',
        somethingWentWrongTryAgain: 'kažkas nepavyko, bandykite dar kartą',
    },
    lv: {
        mainPageButtonCalls: 'atgriežamie zvani',
        mainPageButtonCall: 'zvaniet atpakaļuzņēmējam returber',
        mainPageButtonCollect: 'savāciet atkārtoti izmantojamo atkritumu',
        mainPageButtonReturn: 'atgriešanās vietas',
        callPictureReturnables: 'uzņemiet attēlu atkārtoti izmantojamā',
        callReturnables: 'atkārtoti izmantojamā',
        callPerPiece: 'par gabalu no',
        callPickTime: 'izvēlieties laiku',
        callNextHours: 'nākamās 4 stundas',
        callCustom: 'pielāgots',
        callCustomPlaceholder: 'pēc 2 stundām, nākamajā otrdienā utt.',
        callReturberSuccess: 'returber uzdevums ir izveidots',
        callNewReturber: 'jauns returber',
        returnAddReturnLocation: 'pievienot atgriešanās vietu',
        returnEditReturnLocation: 'rediģēt atgriešanās vietu',
        returnPointPicturePoint: 'uzņemt atgriešanās vietas attēlu',
        returnPointCreatedSuccess: 'atgriešanās punkts ir izveidots',
        cancel: 'atcelt',
        active: 'aktīvs',
        inactive: 'neaktīvs',
        queue: 'rinda',
        people: 'cilvēki',
        home: 'mājas',
        collect: 'savākt',
        somethingWentWrongTryAgain: 'kas nogāja greizi, mēģiniet vēlreiz',
    },
    nl: {
        mainPageButtonCalls: 'statiegeldoproepen',
        mainPageButtonCall: 'bel de returber-verzamelaar',
        mainPageButtonCollect: 'verzamel statiegeldafval',
        mainPageButtonReturn: 'retourlocaties',
        callPictureReturnables: 'maak een foto van statiegeld',
        callReturnables: 'statiegeld',
        callPerPiece: 'per stuk van',
        callPickTime: 'tijd kiezen',
        callNextHours: 'volgende 4 uur',
        callCustom: 'aangepast',
        callCustomPlaceholder: 'over 2 uur, volgende dinsdag, enz.',
        callReturberSuccess: 'returber taak is geplaatst',
        callNewReturber: 'nieuwe returber',
        returnAddReturnLocation: 'retourlocatie toevoegen',
        returnEditReturnLocation: 'bewerk retourlocatie',
        returnPointPicturePoint: 'foto van retourlocatie',
        returnPointCreatedSuccess: 'retourpunt is aangemaakt',
        cancel: 'annuleren',
        active: 'actief',
        inactive: 'inactief',
        queue: 'wachtrij',
        people: 'mensen',
        home: 'huis',
        collect: 'verzamelen',
        somethingWentWrongTryAgain: 'er is iets misgegaan, probeer opnieuw',
    },
    no: {
        mainPageButtonCalls: 'panteoppringninger',
        mainPageButtonCall: 'ring returber-samleren',
        mainPageButtonCollect: 'samle pantbart avfall',
        mainPageButtonReturn: 'retursteder',
        callPictureReturnables: 'ta bilde av pantbart',
        callReturnables: 'pantbart',
        callPerPiece: 'per stykke av',
        callPickTime: 'velg tid',
        callNextHours: 'neste 4 timer',
        callCustom: 'tilpasset',
        callCustomPlaceholder: 'om 2 timer, neste tirsdag, osv.',
        callReturberSuccess: 'returber-oppgaven er lagt ut',
        callNewReturber: 'ny returber',
        returnAddReturnLocation: 'legg til retursted',
        returnEditReturnLocation: 'rediger retursted',
        returnPointPicturePoint: 'ta bilde av retursted',
        returnPointCreatedSuccess: 'retursted er opprettet',
        cancel: 'avbryt',
        active: 'aktiv',
        inactive: 'inaktiv',
        queue: 'kø',
        people: 'mennesker',
        home: 'hjem',
        collect: 'samle',
        somethingWentWrongTryAgain: 'noe gikk galt, prøv igjen',
    },
    pl: {
        mainPageButtonCalls: 'połączenia zwrotne',
        mainPageButtonCall: 'zadzwoń do zbieracza returber',
        mainPageButtonCollect: 'zbieraj odpady zwrotne',
        mainPageButtonReturn: 'lokaliz acje zwrotu',
        callPictureReturnables: 'zrób zdjęcie zwrotnych',
        callReturnables: 'zwrotne',
        callPerPiece: 'za sztukę z',
        callPickTime: 'wybierz czas',
        callNextHours: 'następne 4 godziny',
        callCustom: 'niestandardowy',
        callCustomPlaceholder: 'za 2 godziny, w następny wtorek itp.',
        callReturberSuccess: 'zadanie returber zostało opublikowane',
        callNewReturber: 'nowy returber',
        returnAddReturnLocation: 'dodaj lokal izację zwrotu',
        returnEditReturnLocation: 'edytuj lokal izację zwrotu',
        returnPointPicturePoint: 'zrób zdjęcie lokalizacji zwrotu',
        returnPointCreatedSuccess: 'punkt zwrotu został utworzony',
        cancel: 'anuluj',
        active: 'aktywny',
        inactive: 'nieaktywny',
        queue: 'kolejka',
        people: 'osoby',
        home: 'dom',
        collect: 'zbierać',
        somethingWentWrongTryAgain: 'coś poszło nie tak, spróbuj ponownie',
    },
    ro: {
        mainPageButtonCalls: 'curse returnabile',
        mainPageButtonCall: 'cheamă colector returber',
        mainPageButtonCollect: 'colectează deșeuri returnabile',
        mainPageButtonReturn: 'locuri de returnare',
        callPictureReturnables: 'fotografiază returnabile',
        callReturnables: 'returnabile',
        callPerPiece: 'pe bucată din',
        callPickTime: 'alege timpul',
        callNextHours: 'următoarele 4 de ore',
        callCustom: 'personalizat',
        callCustomPlaceholder: 'în 2 ore, marțea viitoare etc.',
        callReturberSuccess: 'sarcina returber a fost postată',
        callNewReturber: 'returber nou',
        returnAddReturnLocation: 'adaugă loc de returnare',
        returnEditReturnLocation: 'editează loc de returnare',
        returnPointPicturePoint: 'fotografiază locul de returnare',
        returnPointCreatedSuccess: 'punctul de returnare a fost creat',
        cancel: 'anulare',
        active: 'activ',
        inactive: 'inactiv',
        queue: 'coadă',
        people: 'persoane',
        home: 'acasă',
        collect: 'colectează',
        somethingWentWrongTryAgain: 'ceva nu a mers bine, încearcă din nou',
    },
    sk: {
        mainPageButtonCalls: 'volania na vrátenie',
        mainPageButtonCall: 'zavolajte zberača returber',
        mainPageButtonCollect: 'zbierajte vrátený odpad',
        mainPageButtonReturn: 'miesta vrátenia',
        callPictureReturnables: 'fotografujte vrátené',
        callReturnables: 'vrátené',
        callPerPiece: 'za kus z',
        callPickTime: 'vyberte čas',
        callNextHours: 'nasledujúcich 4 hodín',
        callCustom: 'prispôsobené',
        callCustomPlaceholder: 'o 2 hodiny, budúci utorok atď.',
        callReturberSuccess: 'úloha returber bola zverejnená',
        callNewReturber: 'nový returber',
        returnAddReturnLocation: 'pridať miesto vrátenia',
        returnEditReturnLocation: 'upraviť miesto vrátenia',
        returnPointPicturePoint: 'fotografujte miesto vrátenia',
        returnPointCreatedSuccess: 'miesto vrátenia bolo vytvorené',
        cancel: 'zrušiť',
        active: 'aktívny',
        inactive: 'neaktívny',
        queue: 'fronta',
        people: 'ľudia',
        home: 'domov',
        collect: 'zbierať',
        somethingWentWrongTryAgain: 'niečo sa pokazilo, skúste to znova',
    },
    sv: {
        mainPageButtonCalls: 'returbartelefonsamtal',
        mainPageButtonCall: 'ring returber-samlaren',
        mainPageButtonCollect: 'samla in returavfall',
        mainPageButtonReturn: 'returplatser',
        callPictureReturnables: 'ta bild av returavfall',
        callReturnables: 'returavfall',
        callPerPiece: 'per stycke av',
        callPickTime: 'välj tid',
        callNextHours: 'nästa 4 timmar',
        callCustom: 'anpassad',
        callCustomPlaceholder: 'om 2 timmar, nästa tisdag osv.',
        callReturberSuccess: 'returber-uppgiften har publicerats',
        callNewReturber: 'ny returber',
        returnAddReturnLocation: 'lägg till returplats',
        returnEditReturnLocation: 'redigera returplats',
        returnPointPicturePoint: 'ta bild av returplats',
        returnPointCreatedSuccess: 'returplatsen har skapats',
        cancel: 'avbryt',
        active: 'aktiv',
        inactive: 'inaktiv',
        queue: 'kö',
        people: 'människor',
        home: 'hem',
        collect: 'samla in',
        somethingWentWrongTryAgain: 'något gick fel, försök igen',
    },
};
