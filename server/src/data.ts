import faker from 'faker';
import { GQL_User } from './generated/graphql';

const TOTAL_COUNT_OF_USERS = 200;

export const users: GQL_User[] = [...Array(TOTAL_COUNT_OF_USERS)].map<GQL_User>(
	() => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();

		return {
			id: faker.datatype.uuid(),
			birthDate: faker.date.past(18).toISOString() as any,
			name: `${firstName} ${lastName}`,
			email: faker.internet.email(firstName, lastName),
		};
	}
);
