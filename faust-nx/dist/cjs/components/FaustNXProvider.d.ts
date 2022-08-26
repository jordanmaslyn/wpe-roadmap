import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { AppProps } from 'next/app';
export declare function FaustNXProvider(props: {
    client: ApolloClient<NormalizedCacheObject>;
    children: React.ReactNode;
    pageProps: AppProps['pageProps'];
}): JSX.Element;
