import {
    Request,
    Response,
} from 'express';

import { v4 as uuid } from 'uuid';

import {
    google,
} from 'googleapis';

import {
    COOKIE_UNAUTH_USER,
    ONE_YEAR,
} from '@/source/data';

import {
    getAuthCookies,
} from '@/source/utilities/cookies';



function generateUnauthID(): string {
    return 'UA' + uuid().replace(/-/g, '');
}


export const getUser = async (
    request: Request,
    response: Response,
) => {
    const tokens = getAuthCookies(request);


    if (!tokens.accessToken || !tokens.refreshToken) {
        const unauthUserID = request.cookies[COOKIE_UNAUTH_USER] || generateUnauthID();

        response.cookie(COOKIE_UNAUTH_USER, unauthUserID, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ONE_YEAR,
        });

        return unauthUserID;
    }


    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
    });

    let result: any = null;

    try {
        result = await oauth2Client.getTokenInfo(tokens.accessToken);
    } catch (error) {
        result = await new Promise((resolve, _reject) => {
            oauth2Client.refreshAccessToken(async (error, tokens) => {
                if (error) {
                    resolve(null);
                    return;
                }

                const data = await oauth2Client.getTokenInfo(tokens?.access_token || '');
                resolve(data);
            });
        });
    }

    return result.name;
}
