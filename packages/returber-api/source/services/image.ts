import sharp from 'sharp';

import {
    storeFile,
} from './storage';



export const convertPngToWebP = async (
    data: string,
) => {
    return await sharp(Buffer.from(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
    )).webp().toBuffer();
}


/**
 * Takes a base64 encoded image and stores it in the storage service.
 *
 * Returns the URL of the stored image.
 *
 * @param data
 * @param name
 * @returns
 */
export const storeImage = async(
    data: string,
    name: string,
): Promise<string> => {
    const webpData = await convertPngToWebP(data);

    return await storeFile(webpData, `${name}.webp`, 'image/webp');
}
