'use client';

import {
    useContext,
    useState,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
} from '@/data/index';

import ReturberHome from '@/components/ReturberHome';
import LoginScreen from '@/components/LoginScreen';



export default function Login() {
    const {
        language,
    } = useContext(LanguageContext);


    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh grid place-content-center gap-8"
        >
            <ReturberHome
                absolute={true}
            />

            <LoginScreen
                atLoginSuccess={(data) => {
                }}
            />
        </div>
    );
}
