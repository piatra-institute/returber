export type ReturberTaskStatus = 'pending' | 'assigned' | 'completed' | 'cancelled';

export type ReturnPointStatus = 'active' | 'inactive';


export type LocationCoords = {
    latitude: number;
    longitude: number;
};



export const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
export const COOKIE_ACCESS_TOKEN = 'RTBR_AT';
export const COOKIE_REFRESH_TOKEN = 'RTBR_RT';
export const COOKIE_UNAUTH_USER = 'RTBR_UA';
