import type {
    Request,
    Response,
} from 'express';

import {
    COOKIE_ACCESS_TOKEN,
    COOKIE_REFRESH_TOKEN,
    ONE_YEAR,
} from '@/source/data';



export const setAuthCookies = (
    response: Response,
    tokens: {
        accessToken: string;
        refreshToken: string;
    },
) => {
    response.cookie(COOKIE_ACCESS_TOKEN, tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_YEAR,
    });
    response.cookie(COOKIE_REFRESH_TOKEN, tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_YEAR,
    });
}


export const clearAuthCookies = (
    response: Response,
) => {
    response.clearCookie(COOKIE_ACCESS_TOKEN);
    response.clearCookie(COOKIE_REFRESH_TOKEN);
}


export const getAuthCookies = (
    request: Request,
) => {
    const accessToken = request.cookies[COOKIE_ACCESS_TOKEN] || '';
    const refreshToken = request.cookies[COOKIE_REFRESH_TOKEN] || '';

    return {
        accessToken,
        refreshToken,
    };
}
