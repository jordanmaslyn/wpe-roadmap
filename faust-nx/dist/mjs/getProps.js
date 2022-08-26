import isBoolean from 'lodash/isBoolean.js';
import isObject from 'lodash/isObject.js';
import { addApolloState, initializeApollo } from './client.js';
/**
 * This helper function lets you build a static site with your WordPress data
 *
 * @param {GetStaticPropsContext} context
 * @param {GetNextStaticPropsConfig} cfg
 */
export async function getNextStaticProps(context, cfg) {
    const { notFound, redirect, client, Page } = cfg;
    const apolloClient = initializeApollo(client);
    if (isBoolean(notFound) && notFound === true) {
        return {
            notFound,
        };
    }
    if (isObject(redirect)) {
        return {
            redirect,
        };
    }
    if (Page.query) {
        await apolloClient.query({
            query: Page.query,
            variables: (Page === null || Page === void 0 ? void 0 : Page.variables) ? Page === null || Page === void 0 ? void 0 : Page.variables(context) : undefined,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(apolloClient, { props: {} });
}
/**
 * This helper function lets you server side render your page with WordPress data
 *
 * @param {GetServerSidePropsContext} context
 * @param {GetNextServerSidePropsConfig} cfg
 */
export async function getNextServerSideProps(context, cfg) {
    const { notFound, redirect, client, Page } = cfg;
    const apolloClient = initializeApollo(client);
    if (isBoolean(notFound) && notFound === true) {
        return {
            notFound,
        };
    }
    if (isObject(redirect)) {
        return {
            redirect,
        };
    }
    if (Page.query) {
        await apolloClient.query({
            query: Page.query,
            variables: (Page === null || Page === void 0 ? void 0 : Page.variables) ? Page === null || Page === void 0 ? void 0 : Page.variables(context) : undefined,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(apolloClient, { props: {} });
}
