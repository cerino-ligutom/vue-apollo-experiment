/* eslint-disable no-param-reassign */

import { useGetUsersQuery as _useGetUsersQuery } from '@/generated/graphql';

/**
 * Ultimately, we just want to intercept the query's result in case we want to manipulate the cache
 * so let's derive the parameters and return type. You most likely won't need this if you're making
 * use of the Field Type Policy approach (new way of doing it introduced on Apollo Client 3).
 */
export function useGetUsersQuery(...params: Parameters<typeof _useGetUsersQuery>): ReturnType<typeof _useGetUsersQuery> {
  const query = _useGetUsersQuery(...params);

  const defaultUpdateQuery: Parameters<typeof query.fetchMore>[0]['updateQuery'] = (
    previousResult,
    { fetchMoreResult, variables: updatedVariables },
  ) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    /**
     * IMPORTANT:
     * Do keep in mind that doing a fetchMore does not update the original variables passed to the `useQuery()` (in this case, the `customQueryVariables`)
     * nor does it update either the `variables` object that the `useQuery()` returns. You SHOULD NOT also update any of those variables either
     * from here as that would trigger a refetch of the query and you wouldn't want that to happen.
     */
    console.log('variables from using fetchMore()', updatedVariables);

    /**
     * We'll merge the new data with the existing data.
     * This should cause a re-render of our component with the merged list.
     *
     * IMPORTANT: Make sure to return the complete shape, otherwise it might cause bugs.
     * One notable bug is not supplying the `__typename` on any of the nodes.
     * It'd fire the network request twice and won't render properly either.
     */
    return {
      ...previousResult,
      users: {
        ...previousResult.users,
        // Append the new data
        edges: [...(previousResult.users.edges ?? []), ...fetchMoreResult.users.edges],
        // We want the new page info
        pageInfo: fetchMoreResult.users.pageInfo,
      },
    };
  };

  function fetchMore(...fetchMoreParams: Parameters<typeof query.fetchMore>): ReturnType<typeof query.fetchMore> {
    // The consumer of this composable might supply an updateQuery and we shouldn't override that.
    if (fetchMoreParams[0].updateQuery === undefined) {
      fetchMoreParams[0].updateQuery = defaultUpdateQuery;
    }

    return query.fetchMore(...fetchMoreParams);
  }

  return {
    ...query,
    fetchMore,
  };
}
