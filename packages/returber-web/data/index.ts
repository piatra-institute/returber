export type PickTimeType = 'next-hrs' | 'custom';


export interface ReturberLocation {
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    image: string;
    status: 'active' | 'inactive';
    queue: number;
}


export interface User {
    id: string;
    name: string;
    email: string;
}



export * from './currency';
export * from './environment';
export * from './icons';
export * from './languages';
export * from './localization';
export * from './styles';
export * from './yoloClasses';
