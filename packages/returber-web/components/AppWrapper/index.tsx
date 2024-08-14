'use client';

import React, {
    useState,
    useEffect,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    Language,
    languages,
    countryToLanguage,
} from '@/data/index';

import LanguageSelector from '@/components/LanguageSelector';



export default function AppWrapper({
    children,
} : {
    children: React.ReactNode;
}) {
    const [
        language,
        setLanguage,
    ] = useState<Language>('en');
    const [
        languageSet,
        setLanguageSet,
    ] = useState(false);


    useEffect(() => {
        async function detectLanguage() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const country = data.country_code.toLowerCase();

                const detectedLanguage = countryToLanguage[country];
                if (detectedLanguage && languages.includes(detectedLanguage)) {
                    setLanguage(detectedLanguage);
                } else {
                    setLanguage('en');
                }
                setLanguageSet(true);
            } catch (error) {
                setLanguage('en');
                setLanguageSet(true);
            }
        }

        detectLanguage();
    }, []);


    if (!languageSet) {
        return
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
            }}
        >
            <div
                className="max-w-[1600px] relative mx-auto"
            >
                <LanguageSelector />
            </div>

            {children}
        </LanguageContext.Provider>
    );
}
