import Image from 'next/image';



export default function Home() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <h1
                className="text-4xl font-bold"
            >
                call a returber collector
            </h1>

            <Image src="/returber-logo.png" alt="Returber Logo" width={400} height={400} />

            <h1
                className="text-4xl font-bold"
            >
                or collect returnable waste
            </h1>
        </div>
    );
}
