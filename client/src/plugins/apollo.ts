/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

// https://v4.apollo.vuejs.org/guide/installation.html#manual-installation
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { relayStylePagination } from '@apollo/client/utilities';
import { TypedTypePolicies } from '@/generated/graphql';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
});

/**
 * IMPORTANT:
 * I highly recommend studying on how to use this as it's important if you want
 * to maximize the capabilities of your front-end caching. There's a lot to absorb
 * and I don't think I can fit it here. The documentation is very thorough about it
 * and it'd probably be better for you to understand it from the official docs instead
 * as there's no silver bullet nor shortcuts to it.
 * https://www.apollographql.com/docs/react/caching/cache-field-behavior/
 */
const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      /**
       * This is a big PITA if you're coming from the old way of doing things (updateQuery from Apollo Client 2) and
       * have an existing codebase with it and you plan to migrate to Apollo Client 3 or higher.
       * Same sentiment as this comment: https://github.com/apollographql/apollo-client/issues/6502#issuecomment-683913176
       *
       * You can check the actual implementation of `relayStylePagination()` from the link below to see what's going on.
       * https://github.com/apollographql/apollo-client/blob/main/src/utilities/policies/pagination.ts
       *
       * There are 2 common ways to paginate in a GraphQL API:
       * - Offset-based Pagination
       * - Cursor-based Pagination
       *
       * This particular demo uses Cursor-based pagination in Relay Style and Apollo Client offers utility functions for both
       * ways to paginate. If you use a different way to paginate other than these two, then you'll have to implement your own.
       * Additional note, the implementation for offset-based pagination in the utility function strictly uses the variable names
       * "offset" and "limit". If you have a different name for the variables (e.g. page + pageSize), then feel free to copy and
       * make modifications to their implementation.
       * https://github.com/apollographql/apollo-client/blob/8fc56eda7cc34c7a6c952703c797c04edffa462d/src/utilities/policies/pagination.ts#L24
       */
      users: () => {
        /**
         * keyArgs here is more or less similar to the @connection directive that you used to do in
         * the old way (updateQuery + directive on the GraphQL query doc). But instead of repeating
         * the directive on the GraphQL query doc every time you make this particular query ("users" in
         * this case), you can centralize it here.
         */
        const keyArgs = ['sortBy'];

        /**
         * This function actually returns a FieldPolicy object implementing both the `read` and `merge` functions
         * as well as just including the keyArgs you specify into the FieldPolicy object. Read more from the docs:
         * https://www.apollographql.com/docs/react/caching/cache-field-behavior/
         */
        return relayStylePagination(keyArgs);
      },
    },
  },
};

// Cache implementation
const cache = new InMemoryCache({
  typePolicies, // Just comment this if you want to test updateQuery() of fetchMore
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
