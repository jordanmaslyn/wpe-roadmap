import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { AppProps } from 'next/app';
export declare const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
declare global {
    interface Window {
        [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
    }
}
export declare function initializeApollo(client: ApolloClient<NormalizedCacheObject>, initialState?: null): ApolloClient<NormalizedCacheObject>;
export declare function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps['pageProps']): AppProps['pageProps'];
export declare function useApollo(client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps['pageProps']): ApolloClient<NormalizedCacheObject>;
