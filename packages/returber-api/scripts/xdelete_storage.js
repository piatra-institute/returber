import dotenv from 'dotenv';

import { R2 } from 'node-cloudflare-r2';



dotenv.config({
    path: '.env',
});


const r2 = new R2({
    accountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
});

const bucket = r2.bucket(process.env.CLOUDFLARE_R2_BUCKET_NAME);


const objectsRequest = await bucket.listObjects();

for (const object of objectsRequest.objects) {
    await bucket.deleteObject(object.key);
}
