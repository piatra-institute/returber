import reverseGeocoder, {
    AddressObject,
} from 'local-reverse-geocoder';

import {
    LocationCoords,
} from '@/source/data'



export const countryCodes = [
    // 'GB', // United Kingdom (English)
    // 'US', // United States (English)
    // 'DK', // Denmark (Danish)
    // 'DE', // Germany (German)
    // 'EE', // Estonia (Estonian)
    // 'FI', // Finland (Finnish)
    // 'IL', // Israel (Hebrew)
    // 'HR', // Croatia (Croatian)
    // 'IS', // Iceland (Icelandic)
    // 'KR', // South Korea (Korean)
    // 'LT', // Lithuania (Lithuanian)
    // 'LV', // Latvia (Latvian)
    // 'NL', // Netherlands (Dutch)
    // 'NO', // Norway (Norwegian)
    // 'PL', // Poland (Polish)
    'RO', // Romania (Romanian)
    // 'SK', // Slovakia (Slovak)
    // 'SE', // Sweden (Swedish)
];


export const getReverseGeocode = async (location: LocationCoords) => {
    const data = await new Promise<AddressObject>(
        (resolve, reject) => {
            reverseGeocoder.lookUp({
                latitude: location.latitude,
                longitude: location.longitude,
            }, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(res[0][0]);
            });
        },
    );

    return data;
}


export const initializeGeocoder = async () => {
    reverseGeocoder.init({
        countries: countryCodes,
    }, async function () {
        // geocoder is loaded and ready to run
        await getReverseGeocode({ latitude: 51.4934, longitude: 0.0098 });
    });
}
