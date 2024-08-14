export default function MapLoader({
    heights,
} : {
    heights?: string;
}) {
    return (
        <div
            className={
                `${heights || 'h-[300px] w-[300px] md:h-[400px] md:w-[400px]'} mb-12 grid place-content-center`
            }
        >
            <div
                className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-300"
            />
        </div>
    );
}
