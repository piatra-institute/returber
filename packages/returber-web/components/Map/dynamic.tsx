import dynamic from 'next/dynamic';

import MapLoader from '@/components/MapLoader';



const DynamicMap = dynamic(() => import('./index'), {
    loading: () => (
        <MapLoader
            heights="h-[254px] w-[254px] md:h-[354px] md:w-[354px]"
        />
    ),
    ssr: false,
});


export default DynamicMap;
