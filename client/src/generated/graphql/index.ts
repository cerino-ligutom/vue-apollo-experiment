/* eslint-disable */
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateUserInput = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserPayload;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  users: UserConnection;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sortBy: UserSort;
};

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type User = {
  __typename?: 'User';
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<Maybe<UserEdge>>;
  nodes: Array<Maybe<User>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortField;
};

export enum UserSortField {
  BIRTH_DATE = 'BIRTH_DATE',
  EMAIL = 'EMAIL',
  ID = 'ID',
  NAME = 'NAME'
}

export type GetUsersQueryVariables = Exact<{
  first: Scalars['Int'];
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  sortBy: UserSort;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', nodes: Array<{ __typename?: 'User', id: string, name: string, email: string, birthDate: any } | null | undefined>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined, endCursor?: string | null | undefined } } };


export const GetUsersDocument = gql`
    query GetUsers($first: Int!, $before: String, $after: String, $sortBy: UserSort!) {
  users(first: $first, before: $before, after: $after, sortBy: $sortBy) @connection(key: "users", filter: ["sortBy"]) {
    nodes {
      id
      name
      email
      birthDate
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a Vue component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUsersQuery({
 *   first: // value for 'first'
 *   before: // value for 'before'
 *   after: // value for 'after'
 *   sortBy: // value for 'sortBy'
 * });
 */
export function useGetUsersQuery(variables: GetUsersQueryVariables | VueCompositionApi.Ref<GetUsersQueryVariables> | ReactiveFunction<GetUsersQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables, options);
}
export type GetUsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUsersQuery, GetUsersQueryVariables>;