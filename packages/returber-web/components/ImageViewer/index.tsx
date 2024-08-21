import Image from 'next/image';

import {
    closeX,
} from '@/data/icons';



export default function ImageViewer({
    image,
    setImage,
} : {
    image: string,
    setImage: (image: string | null) => void,
}) {
    return (
        <div
            className="relative mb-8 flex flex-col items-center"
        >
            <Image
                src={image}
                alt="user image"
                height={400}
                width={400}
                priority={false}
                draggable={false}
                className="rounded-full select-none max-h-[400px] shadow-xl w-auto"
            />

            <button
                className="select-none absolute top-0 left-[50%] -translate-x-[50%] text-2xl p-2 bg-[#f0f4ed] rounded-b-full"
                onClick={() => {
                    setImage(null);
                }}
            >
                {closeX}
            </button>
        </div>
    );
}
