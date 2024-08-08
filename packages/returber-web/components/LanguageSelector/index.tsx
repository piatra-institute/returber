const drsLanguages = [
    'en', // English
    'da', // Danish (Denmark)
    'de', // German (Germany)
    'et', // Estonian (Estonia)
    'fi', // Finnish (Finland)
    'he', // Hebrew (Israel)
    'hr', // Croatian (Croatia)
    'is', // Icelandic (Iceland)
    'ko', // Korean (South Korea)
    'lt', // Lithuanian (Lithuania)
    'lv', // Latvian (Latvia)
    'nl', // Dutch (Netherlands)
    'no', // Norwegian (Norway)
    'pl', // Polish (Poland)
    'ro', // Romanian (Romania)
    'sk', // Slovak (Slovakia)
    'sv', // Swedish (Sweden)
];


export default function LanguageSelector() {
    return (
        <div
            className="fixed top-0 right-0 p-4 focus:outline-none focus:ring-2 focus:ring-white"
        >
            <select
                className="px-2 bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-4 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
            >
                {drsLanguages.map((language) => (
                    <option
                        key={language}
                        value={language}
                    >
                        {language}
                    </option>
                ))}
            </select>
        </div>
    );
}
