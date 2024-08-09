'use client';

import {
    useContext,
} from 'react';

import Image from 'next/image';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
} from '@/data/index';

import LanguageSelector from '@/components/LanguageSelector';



export default function Home() {
    const {
        language,
    } = useContext(LanguageContext);


    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <LanguageSelector />

            <h1
                className="lg:text-3xl font-bold"
            >
                <button
                    className="select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                >
                    {localization[language].mainPageButtonCall}
                </button>
            </h1>

            <Image
                src="/returber-logo.png" alt="Returber Logo"
                width={400} height={400}
                className="pointer-events-none select-none m-8 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"
            />

            <h1
                className="lg:text-3xl font-bold"
            >
                <button
                    className="select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                >
                    {localization[language].mainPageButtonCollect}
                </button>
            </h1>
        </div>
    );
}
