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
    UserCall,
} from '@/data/index';

import ReturberHome from '@/components/ReturberHome';



export default function Calls() {
    const {
        language,
    } = useContext(LanguageContext);


    const [
        calls,
        setCalls,
    ] = useState<UserCall[]>([]);


    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh grid place-content-center"
        >
            <ReturberHome
                absolute={true}
            />

            {calls.length === 0 && (
                <h1>
                    {localization[language].noCalls}
                </h1>
            )}

            {calls.map((call) => (
                <div
                    key={call.id}
                >
                    {/* <div>
                        as caller: cancel, update location, update time, finish
                    </div>

                    <div>
                        as collector: cancel, finish
                    </div> */}
                </div>
            ))}
        </div>
    );
}
