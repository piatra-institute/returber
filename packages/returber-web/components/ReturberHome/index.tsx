'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';



export default function ReturberHome() {
    const router = useRouter();

    return (
        <Link
            href="/"
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            onClick={() => {
                router.back();
            }}
        >
            <Image
                src="/returber-logo.png"
                alt="Returber Logo"
                width={200} height={200}
                priority={true}
                className="pointer-events-none select-none m-8 w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]"
            />
        </Link>
    );
}
