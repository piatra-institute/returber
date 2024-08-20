import {
    Readable,
} from 'node:stream';

import {
    ReadStream,
} from 'node:fs';

import { R2 } from 'node-cloudflare-r2';



const r2 = new R2({
    accountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID!,
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
});

export const bucket = r2.bucket(process.env.CLOUDFLARE_R2_BUCKET_NAME!);


export const storeFile = async(
    data: string | Uint8Array | Buffer | Readable | ReadStream,
    filename: string,
    contentType: string,
): Promise<string> => {
    const result = await bucket.upload(data, filename, {}, contentType);

    return result.uri;
}
