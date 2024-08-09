'use client';



export default function Collect() {
    return (
        <div
            className="grid place-items-center h-full"
        >
            <div>
                map / select pickup task
            </div>

            <button
                className="select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
            >
                collect
            </button>
        </div>
    );
}
