/* eslint-disable */
import { SortDirection } from '../../enums/index';
import { UserSortField } from '../../enums/index';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type GQL_CreateUserInput = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type GQL_CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user: GQL_User;
};

export type GQL_Mutation = {
  __typename?: 'Mutation';
  createUser: GQL_CreateUserPayload;
};


export type GQL_MutationCreateUserArgs = {
  input: GQL_CreateUserInput;
};

export type GQL_PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type GQL_Query = {
  __typename?: 'Query';
  users: GQL_UserConnection;
};


export type GQL_QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sortBy: GQL_UserSort;
};

export { SortDirection };

export type GQL_User = {
  __typename?: 'User';
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GQL_UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<Maybe<GQL_UserEdge>>;
  pageInfo: GQL_PageInfo;
  totalCount: Scalars['Int'];
};

export type GQL_UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: GQL_User;
};

export type GQL_UserSort = {
  direction: SortDirection;
  field: UserSortField;
};

export { UserSortField };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQL_ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserInput: GQL_CreateUserInput;
  CreateUserPayload: ResolverTypeWrapper<GQL_CreateUserPayload>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<GQL_PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  SortDirection: SortDirection;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<GQL_User>;
  UserConnection: ResolverTypeWrapper<GQL_UserConnection>;
  UserEdge: ResolverTypeWrapper<GQL_UserEdge>;
  UserSort: GQL_UserSort;
  UserSortField: UserSortField;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQL_ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateUserInput: GQL_CreateUserInput;
  CreateUserPayload: GQL_CreateUserPayload;
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PageInfo: GQL_PageInfo;
  Query: {};
  String: Scalars['String'];
  User: GQL_User;
  UserConnection: GQL_UserConnection;
  UserEdge: GQL_UserEdge;
  UserSort: GQL_UserSort;
};

export type GQL_CreateUserPayloadResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['CreateUserPayload'] = GQL_ResolversParentTypes['CreateUserPayload']> = {
  user?: Resolver<GQL_ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQL_DateTimeScalarConfig extends GraphQLScalarTypeConfig<GQL_ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GQL_MutationResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Mutation'] = GQL_ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<GQL_ResolversTypes['CreateUserPayload'], ParentType, ContextType, RequireFields<GQL_MutationCreateUserArgs, 'input'>>;
};

export type GQL_PageInfoResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['PageInfo'] = GQL_ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQL_QueryResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = {
  users?: Resolver<GQL_ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<GQL_QueryUsersArgs, 'first' | 'sortBy'>>;
};

export type GQL_SortDirectionResolvers = EnumResolverSignature<{ ASC?: any, DESC?: any }, GQL_ResolversTypes['SortDirection']>;

export type GQL_UserResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['User'] = GQL_ResolversParentTypes['User']> = {
  birthDate?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQL_UserConnectionResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['UserConnection'] = GQL_ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Array<Maybe<GQL_ResolversTypes['UserEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<GQL_ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQL_UserEdgeResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['UserEdge'] = GQL_ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<GQL_ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQL_UserSortFieldResolvers = EnumResolverSignature<{ BIRTH_DATE?: any, EMAIL?: any, ID?: any, NAME?: any }, GQL_ResolversTypes['UserSortField']>;

export type GQL_Resolvers<ContextType = any> = {
  CreateUserPayload?: GQL_CreateUserPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: GQL_MutationResolvers<ContextType>;
  PageInfo?: GQL_PageInfoResolvers<ContextType>;
  Query?: GQL_QueryResolvers<ContextType>;
  SortDirection?: GQL_SortDirectionResolvers;
  User?: GQL_UserResolvers<ContextType>;
  UserConnection?: GQL_UserConnectionResolvers<ContextType>;
  UserEdge?: GQL_UserEdgeResolvers<ContextType>;
  UserSortField?: GQL_UserSortFieldResolvers;
};

