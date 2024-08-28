'use client';

import {
    useContext,
} from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
} from '@/data/index';

import LanguageSelector from '@/components/LanguageSelector';
import LinkButton from '@/components/LinkButton';



export default function Home() {
    const {
        language,
    } = useContext(LanguageContext);


    return (
        <div
            className="flex flex-col items-center justify-center h-dvh py-2"
        >
            <LanguageSelector />

            <div
                className="mb-12"
            >
                <Link
                    href="/calls"
                    tabIndex={-1}
                    draggable={false}
                >
                    <LinkButton
                        text={localization[language].mainPageButtonCalls}
                        onClick={() => {}}
                        className="lg:text-2xl font-bold select-none"
                    />
                </Link>
            </div>

            <h1
                className="lg:text-3xl font-bold"
            >
                <Link
                    href="/call"
                    tabIndex={-1}
                    draggable={false}
                >
                    <button
                        className="min-w-[300px] lg:min-w-[500px] select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                    >
                        {localization[language].mainPageButtonCall}
                    </button>
                </Link>
            </h1>

            <Image
                src="/returber-logo.png" alt="Returber Logo"
                width={400} height={400}
                priority={true}
                className="pointer-events-none select-none m-8 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"
            />

            <h1
                className="lg:text-3xl font-bold"
            >
                <Link
                    href="/collect"
                    tabIndex={-1}
                    draggable={false}
                >
                    <button
                        className="min-w-[300px] lg:min-w-[500px] select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                    >
                        {localization[language].mainPageButtonCollect}
                    </button>
                </Link>
            </h1>

            <div
                className="mt-12"
            >
                <Link
                    href="/return"
                    tabIndex={-1}
                    draggable={false}
                >
                    <LinkButton
                        text={localization[language].mainPageButtonReturn}
                        onClick={() => {}}
                        className="lg:text-2xl font-bold select-none"
                    />
                </Link>
            </div>
        </div>
    );
}
