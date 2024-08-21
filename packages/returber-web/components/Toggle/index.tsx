export default function Toggle({
    text,
    checked,
    toggle,
} : {
    text: string;
    checked: boolean;
    toggle: () => void;
}) {
    return (
        <div
            className="flex items-center justify-center mt-12 mb-12"
        >
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={() => toggle()}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-400" />
                <span className="ms-3">
                    {text}
                </span>
            </label>
        </div>
    );
}
