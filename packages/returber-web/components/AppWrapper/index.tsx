'use client';

import React, {
    useState,
    useEffect,
} from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import {
    LanguageContext,
} from '@/app/context';

import {
    Language,
    languages,
    countryToLanguage,
    environment,
} from '@/data/index';

import LanguageSelector from '@/components/LanguageSelector';
import Spinner from '@/components/Spinner';

import useStore, {
    useVolatileStore,
} from '@/store';



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

    const {
        user: storeUser,
        setUser,
    } = useStore();

    const {
        showLoading,
    } = useVolatileStore();


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
        <GoogleOAuthProvider
            clientId={environment.GOOGLE_LOGIN}
        >
            <LanguageContext.Provider
                value={{
                    language,
                    setLanguage,
                }}
            >
                {showLoading && (
                    <Spinner
                        absolute={true}
                    />
                )}

                <div
                    className="max-w-[1600px] relative mx-auto"
                >
                    <LanguageSelector />
                </div>

                {children}
            </LanguageContext.Provider>
        </GoogleOAuthProvider>
    );
}
