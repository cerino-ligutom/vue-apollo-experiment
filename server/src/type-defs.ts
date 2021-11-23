import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	scalar DateTime

	type User {
		id: ID!
		name: String!
		email: String!
		birthDate: DateTime!
	}

	type UserEdge {
		cursor: String!
		node: User!
	}

	input UserSort {
		field: UserSortField!
		direction: SortDirection!
	}

	enum UserSortField {
		ID
		NAME
		EMAIL
		BIRTH_DATE
	}

	type PageInfo {
		# When paginating forwards, the cursor to continue.
		endCursor: String

		# When paginating forwards, are there more items?
		hasNextPage: Boolean!

		# When paginating backwards, are there more items?
		hasPreviousPage: Boolean!

		startCursor: String
	}

  enum SortDirection {
    # Specifies an ascending order for a given sortBy argument.
    ASC
    # Specifies an descending order for a given sortBy argument.
    DESC
  }

	type UserConnection {
		edges: [UserEdge]!
		pageInfo: PageInfo!
		totalCount: Int!
	}

	type Query {
		users(
			first: Int = 25
			before: String
			after: String
			sortBy: UserSort!
		): UserConnection!
	}

	input CreateUserInput {
		name: String!
		email: String!
		birthDate: DateTime!
	}

	type CreateUserPayload {
		user: User!
	}

	input UpdateUserInput {
		userId: ID!
		name: String!
		email: String!
		birthDate: DateTime!
	}

	type UpdateUserPayload {
		user: User!
	}

	input DeleteUserInput {
		userId: ID!
	}

	type DeleteUserPayload {
		# Not required as the user could've been deleted already and there'd be nothing to return.
		user: User
	}

	type Mutation {
		createUser(input: CreateUserInput!): CreateUserPayload!
		updateUser(input: UpdateUserInput!): UpdateUserPayload!
		deleteUser(input: DeleteUserInput!): DeleteUserPayload!
	}
`;
