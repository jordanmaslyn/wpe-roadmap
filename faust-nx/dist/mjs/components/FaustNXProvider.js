import React from 'react';
import { ApolloProvider, } from '@apollo/client';
import { useApollo } from '../client.js';
export function FaustNXProvider(props) {
    const { client, pageProps, children } = props;
    const apolloClient = useApollo(client, pageProps);
    return React.createElement(ApolloProvider, { client: apolloClient }, children);
}
