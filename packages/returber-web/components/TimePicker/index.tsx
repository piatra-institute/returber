'use client';

import {
    useContext,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    PickTimeType,
} from '@/data/index';



export default function TimePicker({
    pickTimeType,
    setPickTimeType,
    customTimeText,
    setCustomTimeText,
} : {
    pickTimeType: string,
    setPickTimeType: (value: PickTimeType) => void,
    customTimeText: string,
    setCustomTimeText: (value: string) => void,
}) {
    const {
        language,
    } = useContext(LanguageContext);


    return (
        <div
            className="flex flex-col gap-2 text-center mb-8"
        >
            <div
                className="mb-2"
            >
                {localization[language].callPickTime}
            </div>

            <button
                className={pickTimeType === 'next-hrs'
                    ? 'select-none lg:min-w-[250px] bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out'
                    : 'select-none py-2 px-8 font-bold rounded-full'
                }
                onClick={() => {
                    setPickTimeType('next-hrs');
                }}
            >
                {localization[language].callNextHours}
            </button>

            <button
                className={pickTimeType === 'custom'
                    ? 'select-none lg:min-w-[250px] bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out'
                    : 'select-none py-2 px-8 font-bold rounded-full'
                }
                onClick={() => {
                    setPickTimeType('custom');
                }}
            >
                {localization[language].callCustom}
            </button>

            {pickTimeType === 'custom' && (
                <input
                    placeholder={localization[language].callCustomPlaceholder}
                    value={customTimeText}
                    onChange={(e) => {
                        setCustomTimeText(e.target.value);
                    }}
                    autoCapitalize="none"
                    className="text-center lg:min-w-[250px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 mt-4"
                />
            )}
        </div>
    );
}
