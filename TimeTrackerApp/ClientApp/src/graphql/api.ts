import {accessTokenKey, clearCookie, getCookie, refreshTokenKey} from "../helpers/cookies";
import { parseJwt } from "../helpers/parseJwt";
import {AuthRefreshInputType, AuthUserResponse} from "../types/auth.types";
import {store} from "../store/store";
import {authRefreshAction} from "../store/auth/auth.slice";

const developmentApiUrl = "http://localhost:5000/graphql";
const productionApiUrl = "https://timetrackerwebapp1.azurewebsites.net/graphql";

const getAuthorizationHeader = (): string => {
    const accessToken = getCookie(accessTokenKey);
    return accessToken ? `Bearer ${accessToken}` : "";
}

export const request = async (query: string, variables?: any) => {
    return await fetch(`${window.location.origin}/graphql` === productionApiUrl ? productionApiUrl : developmentApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationHeader()
        },
        body: JSON.stringify({ query, variables }),
    });
}

export const graphqlRequest = async (query: string, variables?: any) => {
    const response = await request(query, variables)

    if (response.ok)
        return await response.json()

    const responseBody = await response.json()
    if (responseBody?.errors?.find((error: any) => error?.extensions?.number === "authorization")) {
        try {
            const refreshTokenInCookies = getCookie(refreshTokenKey) ?? '';
            const accessTokenInCookies = getCookie(accessTokenKey) ?? '';
            if (refreshTokenInCookies) {
                const authenticatedUserId = parseInt(parseJwt<AuthUserResponse>(refreshTokenInCookies).UserId)
                const authRefreshQueryVariables: AuthRefreshInputType = {
                    userId: authenticatedUserId,
                    accessToken: accessTokenInCookies,
                    refreshToken: refreshTokenInCookies,
                }
                clearCookie(refreshTokenKey)
                clearCookie(accessTokenKey)
                store.dispatch(authRefreshAction(authRefreshQueryVariables))
                return await request(query, variables).then(async response => await response.json())
            }
        } catch (error) {
            location.replace('/login')
        }
    }
}