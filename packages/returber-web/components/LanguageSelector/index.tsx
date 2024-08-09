'use client';

import {
    useContext,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    languages,
    languageMap,
    Language,
} from '@/data/index';



export default function LanguageSelector() {
    const {
        language,
        setLanguage,
    } = useContext(LanguageContext);


    return (
        <div
            className="fixed top-0 right-0 p-4 z-50"
        >
            <select
                className="select-none bg-[#f0f4ed] focus:outline-none focus:ring-2 focus:ring-white"
                onChange={(event) => setLanguage(event.target.value as Language)}
                name="language-selector"
            >
                {languages.map((lg) => (
                    <option
                        key={lg}
                        value={lg}
                        className="text-right"
                    >
                        {lg === language ? lg.toUpperCase() : languageMap[lg]}
                    </option>
                ))}
            </select>
        </div>
    );
}
