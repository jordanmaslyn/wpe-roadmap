"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccessToken = exports.clearAccessTokenRefreshTimer = exports.setAccessTokenRefreshTimer = exports.setAccessToken = exports.getAccessTokenExpiration = exports.getAccessToken = exports.setRefreshTimer = exports.getRefreshTimer = exports.TIME_UNTIL_REFRESH_BEFORE_TOKEN_EXPIRES = void 0;
const isString_js_1 = __importDefault(require("lodash/isString.js"));
const constants_js_1 = require("../../lib/constants.js");
const index_js_1 = require("../../utils/index.js");
/**
 * The amount of time in seconds until the access token is fetched
 * before it expires.
 *
 * For example, if the access token expires in 5 minutes (300 seconds), and
 * this value is 60, then the access token will be refreshed at 240 seconds.
 *
 * This allows for enough time to fetch a new access token before it expires.
 *
 */
exports.TIME_UNTIL_REFRESH_BEFORE_TOKEN_EXPIRES = 60;
/**
 * The setTimeout instance that refreshes the access token.
 */
let REFRESH_TIMER;
function getRefreshTimer() {
    return REFRESH_TIMER;
}
exports.getRefreshTimer = getRefreshTimer;
function setRefreshTimer(timer) {
    REFRESH_TIMER = timer;
}
exports.setRefreshTimer = setRefreshTimer;
/**
 * The access token object
 */
let accessToken;
/**
 * Get an access token from memory if one exists
 *
 * @returns {string | undefined}
 */
function getAccessToken() {
    return accessToken === null || accessToken === void 0 ? void 0 : accessToken.token;
}
exports.getAccessToken = getAccessToken;
/**
 * Get an access token expiration from memory if one exists
 *
 * @returns {number | undefined}
 */
function getAccessTokenExpiration() {
    return accessToken === null || accessToken === void 0 ? void 0 : accessToken.expiration;
}
exports.getAccessTokenExpiration = getAccessTokenExpiration;
/**
 * Set an access token and/or its expiration in memory
 *
 * @param {string} token
 * @param {number} expiration
 *
 * @returns {void}
 */
function setAccessToken(token, expiration) {
    if ((0, index_js_1.isServerSide)()) {
        return;
    }
    accessToken = {
        token,
        expiration,
    };
}
exports.setAccessToken = setAccessToken;
/**
 * Creates the access token refresh timer that will fetch a new access token
 * before the current one expires.
 *
 * @returns {void}
 */
function setAccessTokenRefreshTimer() {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const accessTokenExpirationInSeconds = getAccessTokenExpiration();
    // If there is no access token/expiration, don't create a timer.
    if (accessTokenExpirationInSeconds === undefined) {
        return;
    }
    const secondsUntilExpiration = accessTokenExpirationInSeconds - currentTimeInSeconds;
    const secondsUntilRefresh = secondsUntilExpiration - exports.TIME_UNTIL_REFRESH_BEFORE_TOKEN_EXPIRES;
    setRefreshTimer(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setTimeout(() => void fetchAccessToken(), secondsUntilRefresh * 1000));
}
exports.setAccessTokenRefreshTimer = setAccessTokenRefreshTimer;
/**
 * Clears the current access token refresh timer if one exists.
 */
function clearAccessTokenRefreshTimer() {
    const timer = getRefreshTimer();
    if (timer !== undefined) {
        clearTimeout(timer);
    }
}
exports.clearAccessTokenRefreshTimer = clearAccessTokenRefreshTimer;
/**
 * Fetch an access token from the authorizeHandler middleware
 *
 * @export
 * @param {string} code An authorization code to fetch an access token
 */
async function fetchAccessToken(code) {
    let url = `${constants_js_1.FAUSTNX_API_BASE_PATH}/${constants_js_1.TOKEN_ENDPOINT_PARTIAL_PATH}`;
    // Add the code to the url if it exists
    if ((0, isString_js_1.default)(code) && code.length > 0) {
        url += `?code=${code}`;
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = (await response.json());
        // If the response is not ok, clear the access token
        if (!response.ok) {
            setAccessToken(undefined, undefined);
            return null;
        }
        setAccessToken(result.accessToken, result.accessTokenExpiration);
        // If there is an existing refresh timer, clear it.
        clearAccessTokenRefreshTimer();
        /**
         * Set a refresh timer to fetch a new access token before
         * the current one expires.
         */
        setAccessTokenRefreshTimer();
        return result.accessToken;
    }
    catch (error) {
        setAccessToken(undefined, undefined);
        return null;
    }
}
exports.fetchAccessToken = fetchAccessToken;
