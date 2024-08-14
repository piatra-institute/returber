import dynamic from 'next/dynamic';



const DynamicMap = dynamic(() => import('./index'), {
    loading: () => (
        <div
            className="h-[252px] w-[252px] md:h-[352px] md:w-[352px] mb-12"
        />
    ),
    ssr: false,
});


export default DynamicMap;
