import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import {
	GQL_PageInfo,
	GQL_Resolvers,
	GQL_User,
	GQL_UserConnection,
} from './generated/graphql';
import { typeDefs } from './type-defs';
import { GraphQLDateTime } from 'graphql-scalars';
import { SortDirection, UserSortField } from './enums';
import {
	take,
	takeRight,
	orderBy,
	findIndex,
	slice,
	first as getFirstItem,
	last as getLastItem,
	get as getByProperty,
	pullAt,
	merge
} from 'lodash';
import { users } from './data';
import { base64 } from './utils';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import faker from 'faker';

const APP_PORT = process.env.PORT || 3000;

const resolvers: GQL_Resolvers = {
	Query: {
		users: async (parent, args, ctx) => {
			/**
			 * Do note that this naive cursor implementation does not consider
			 * types other than String (e.g. the sorting field is a number or serialized from an object)
			 * and this is only meant for demonstration purposes without using an actual database.
			 */
			const { first, after, before, sortBy } = args;

			if (after && before) {
				throw new Error('Cannot use both after and before');
			}

			const sortedUsers = orderBy(users, [sortBy.field], [sortBy.direction]);

			let usersToReturn: GQL_User[] = [];
			let slicedUsersToReturn: GQL_User[] = [];

			let cursor: string | null = after
				? base64.decode(after)
				: before
				? base64.decode(before)
				: null;
			let cursorIndex: number = -1;

			const pageInfo: GQL_PageInfo = {
				hasNextPage: false,
				hasPreviousPage: false,
				endCursor: null,
				startCursor: null,
			};

			// If we have a cursor, try to paginate based on that cursor
			if (cursor) {
				cursorIndex = findIndex(
					sortedUsers,
					(user) =>
						user[sortBy.field as unknown as keyof typeof user] === cursor
				);

				// If the cursor is found, we can paginate
				if (cursorIndex > -1) {
					if (after) {
						slicedUsersToReturn = slice(sortedUsers, cursorIndex + 1);
						// https://lodash.com/docs/4.17.15#take
						usersToReturn = take(slicedUsersToReturn, first);
					}

					if (before) {
						slicedUsersToReturn = slice(sortedUsers, 0, cursorIndex);
						// https://lodash.com/docs/4.17.15#takeRight
						usersToReturn = takeRight(slicedUsersToReturn, first);
					}
				}
			} else {
				// Otherwise, this is the first page, so just take the first few users
				slicedUsersToReturn = slice(sortedUsers, 0);
				usersToReturn = take(slicedUsersToReturn, first);
			}

			const remainingItemsInCurrentDirection =
				slicedUsersToReturn.length - usersToReturn.length;
			const remainingItemsInOppositeDirection =
				sortedUsers.length - slicedUsersToReturn.length;

			if (before) {
				// reverse perspective since we're paginating backwards
				pageInfo.hasNextPage =
					usersToReturn.length > 0 && remainingItemsInOppositeDirection > 0;
				pageInfo.hasPreviousPage =
					usersToReturn.length > 0 && remainingItemsInCurrentDirection > 0;
			} else {
				pageInfo.hasNextPage =
					usersToReturn.length > 0 && remainingItemsInCurrentDirection > 0;
				pageInfo.hasPreviousPage =
					usersToReturn.length > 0 && remainingItemsInOppositeDirection > 0;
			}

			const firstItem = getFirstItem(usersToReturn);
			const lastItem = getLastItem(usersToReturn);

			pageInfo.startCursor = firstItem
				? base64.encode(getByProperty(firstItem, sortBy.field as any))
				: null;
			pageInfo.endCursor = lastItem
				? base64.encode(getByProperty(lastItem, sortBy.field as any))
				: null;

			const userConnection: GQL_UserConnection = {
				edges: usersToReturn.map((user) => ({
					cursor: base64.encode(getByProperty(user, sortBy.field as any)),
					node: user,
				})),
				pageInfo,
				// There's no search/filter functionality, so just return length of the users
				totalCount: users.length,
			};

			return userConnection;
		},
	},

	Mutation: {
		createUser: (parent, { input }, ctx) => {
			const { name, email, birthDate } = input;

			const newUser: GQL_User = {
				id: faker.datatype.uuid(),
				// ignore the type assertion to "any" below
				// we're actually storing it as a string but the generated TS types 
				// are mapped to type "Date" with graphql code generator
				birthDate: birthDate.toISOString() as any,
				email,
				name,
			};

			users.push(newUser);

			return {
				user: newUser,
			};
		},
		updateUser: (parent, { input }, ctx) => {
			const { userId, name, email, birthDate } = input;

			const user = users.find((user) => user.id === userId);

			if (!user) {
				throw new Error(`User ${userId} not found.`)
			}

			merge(user, {
				name, email, birthDate: birthDate.toISOString() as any,
			});

			return { user };
		},
		deleteUser: (parent, { input }, ctx) => {
			const { userId } = input;

			const [ user ] = pullAt(users, findIndex(users, (user) => user.id === userId));

			return { user }
		},
	},

	// Scalars
	DateTime: GraphQLDateTime,
	SortDirection: SortDirection,
	UserSortField: UserSortField,
};

(async () => {
	const app = express();
	const httpServer = http.createServer(app);
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
	httpServer.listen({ port: +APP_PORT }, () => {
		console.log(`App is now listening on port ${APP_PORT}`);
	});
})();
