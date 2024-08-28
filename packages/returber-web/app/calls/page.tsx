import ReturberHome from '@/components/ReturberHome';



export default function Calls() {
    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh grid place-content-center"
        >
            <ReturberHome
                absolute={true}
            />

            <h1>
                no calls
            </h1>
        </div>
    );
}
