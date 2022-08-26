import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GetStaticPropsContext, GetServerSidePropsResult, GetServerSidePropsContext, Redirect } from 'next';
import type { DocumentNode } from 'graphql';
export interface GetNextServerSidePropsConfig<Props = Record<string, unknown>> {
    client: ApolloClient<NormalizedCacheObject>;
    Page: {
        query?: DocumentNode;
        variables?: (context: GetStaticPropsContext | GetServerSidePropsContext) => {
            [key: string]: any;
        };
    };
    props?: Props;
    notFound?: boolean;
    redirect?: Redirect;
}
export interface GetNextStaticPropsConfig<Props = Record<string, unknown>> extends GetNextServerSidePropsConfig<Props> {
    revalidate?: number | boolean;
}
/**
 * This helper function lets you build a static site with your WordPress data
 *
 * @param {GetStaticPropsContext} context
 * @param {GetNextStaticPropsConfig} cfg
 */
export declare function getNextStaticProps<Props>(context: GetStaticPropsContext, cfg: GetNextStaticPropsConfig<Props>): Promise<any>;
/**
 * This helper function lets you server side render your page with WordPress data
 *
 * @param {GetServerSidePropsContext} context
 * @param {GetNextServerSidePropsConfig} cfg
 */
export declare function getNextServerSideProps<Props>(context: GetServerSidePropsContext, cfg: GetNextServerSidePropsConfig<Props>): Promise<GetServerSidePropsResult<Props>>;
