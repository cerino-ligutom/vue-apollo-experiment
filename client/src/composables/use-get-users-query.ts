import { useGetUsersQuery as _useGetUsersQuery } from '@/generated/graphql';

// Ultimately, we just want to intercept the query's result in case we want to manipulate the cache
// so let's derive the parameters and return type.
export function useGetUsersQuery(...params: Parameters<typeof _useGetUsersQuery>): ReturnType<typeof _useGetUsersQuery> {
  const query = _useGetUsersQuery(...params);

  query.onResult((result) => {
    // TODO: centralized cache handling if needed
    console.log('Result from useGetUsersQuery composable:', result);
  });

  return query;
}
