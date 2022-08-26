/// <reference types="react" />
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { DocumentNode } from 'graphql';
import { SeedNode } from './queries/seedQuery.js';
export interface WordPressTemplate {
    query: DocumentNode;
    variables: (seedNode: SeedNode) => {
        [key: string]: any;
    };
    Component: React.FC<{
        [key: string]: any;
    }>;
}
export interface GetWordPressPropsConfig {
    client: ApolloClient<NormalizedCacheObject>;
    ctx: GetServerSidePropsContext | GetStaticPropsContext;
}
export declare function getWordPressProps(options: GetWordPressPropsConfig): Promise<any>;
