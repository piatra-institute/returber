import dynamic from 'next/dynamic';



const DynamicMap = dynamic(() => import('./index'), {
    loading: () => (
        <div
            className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] mb-12"
        />
    ),
    ssr: false,
});


export default DynamicMap;
