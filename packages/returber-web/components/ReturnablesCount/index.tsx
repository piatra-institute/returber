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
    returnableMaxValue,
    setReturnablesMaxValue,
    returnablesMultiplier,
    setReturnablesMultiplier,
    type,
    multiples,
} : {
    returnables: number;
    setReturnables: (value: number) => void;
    returnableMaxValue: number;
    setReturnablesMaxValue: (value: number) => void;
    returnablesMultiplier: number;
    setReturnablesMultiplier: (value: number) => void;
    type?: string;
    multiples?: boolean;
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
                <span>
                    {new Intl.NumberFormat(language).format(returnablesMultiplier)} {currencyMap[language]} {localization[language].callPerPiece}
                </span>

                <input
                    value={returnableMaxValue}
                    min={0}
                    step={0.1}
                    type="number"
                    inputMode="decimal"
                    lang="en"
                    onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (isNaN(value)) {
                            return;
                        }

                        setReturnablesMaxValue(value);
                    }}
                    className="w-[70px] mx-2 text-right px-2 rounded-full"
                />

                <span>
                    {currencyMap[language]}
                </span>
            </div>

            <input
                type="range"
                min={0}
                max={returnableMaxValue}
                step={returnableMaxValue / 10}
                value={returnablesMultiplier}
                onChange={(e) => {
                    setReturnablesMultiplier(parseFloat(e.target.value));
                }}
            />

            <div
                className={multiples ? 'text-md' : 'text-xl'}
            >
                {new Intl.NumberFormat(language).format(
                    (returnables * returnablesMultiplier)
                )} {currencyMap[language]}
            </div>
        </div>
    );
}
