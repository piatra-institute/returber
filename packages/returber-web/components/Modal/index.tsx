'use client';

import { useRouter } from 'next/navigation';



export default function Modal({
    children,
}: {
    children: React.ReactNode,
}) {
    const router = useRouter();

    return (
        <div
            className="absolute bg-[#f0f4ed] top-0 left-0 w-full h-full z-40"
        >
            <div
                className="fixed top-0 left-0 p-2 z-50"
            >
                <button
                    className="text-2xl"
                    onClick={() => {
                        router.back();
                    }}
                >
                    {/* 🞪 */}
                    &#128938;
                </button>
            </div>

            {children}
        </div>
    );
}
