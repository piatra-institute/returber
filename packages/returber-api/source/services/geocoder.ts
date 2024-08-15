import reverseGeocoder, {
    AddressObject,
} from 'local-reverse-geocoder';



export const getReverseGeocode = async (location: any) => {
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
        // countries: ['GB'],
    }, async function () {
        // geocoder is loaded and ready to run
        await getReverseGeocode({ latitude: 51.4934, longitude: 0.0098 });
    });
}
