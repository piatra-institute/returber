'use client';

import React, {
    useState,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    Language,
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
