'use client';

import {
    useContext,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    currencyMap,
} from '@/data/index';



export default function ReturnablesCount({
    returnables,
    setReturnables,
    returnablesMultiplier,
    setReturnablesMultiplier,
    type,
} : {
    returnables: number,
    setReturnables: (value: number) => void,
    returnablesMultiplier: number,
    setReturnablesMultiplier: (value: number) => void,
    type?: string;
}) {
    const {
        language,
    } = useContext(LanguageContext);

    return (
        <div
            className="flex flex-col gap-2 text-center mb-8"
        >
            <input
                value={returnables.toString()}
                type="number"
                inputMode="numeric"
                min="0"
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (isNaN(value)) {
                        setReturnables(0);
                        return;
                    }

                    setReturnables(
                        Math.abs(value)
                    );
                }}
                className="text-center lg:min-w-[250px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />

            <div>
                {localization[language].callReturnables} {type ? type : ''}
            </div>

            <div>
                {returnablesMultiplier}
            </div>

            <input
                type="range"
                min={0}
                max={0.5}
                step={0.05}
                value={returnablesMultiplier}
                onChange={(e) => {
                    setReturnablesMultiplier(parseFloat(e.target.value));
                }}
            />

            <div
                className="text-xl"
            >
                {(returnables * returnablesMultiplier).toFixed(2)} {currencyMap[language]}
            </div>
        </div>
    );
}
