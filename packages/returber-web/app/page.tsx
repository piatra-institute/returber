import Image from 'next/image';

import LanguageSelector from '@/components/LanguageSelector';



export default function Home() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <LanguageSelector />

            <h1
                className="text-3xl font-bold"
            >
                <button
                    className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-4 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                >
                    call a returber collector
                </button>
            </h1>

            <Image
                src="/returber-logo.png" alt="Returber Logo" width={400} height={400}
                className="pointer-events-none select-none m-8"
            />

            <h1
                className="text-3xl font-bold"
            >
                <button
                    className="bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-4 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                >
                    or collect returnable waste
                </button>
            </h1>
        </div>
    );
}
