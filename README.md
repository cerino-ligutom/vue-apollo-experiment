# vue-apollo-experiment

An experiment on `vue-apollo` + `Apollo Client 3` using Composition API with Vue 3.

The codebase is heavily documented so I recommend going through it. Highly recommended to run the applications as well so you can see it in action.

## Running the server

Open a terminal on the `./server` directory and run the following commands:

```bash
npm run install
npm start
```

This should start the server on port 3000. The GraphQL endpoint is `http://localhost:3000/graphql`.

The server uses in-memory for storing the data and is seeded every time you run the server using FakerJS so you don't have anything extra setup to worry about when running the server.

## Running the client

Open a terminal on the `./client` directory and run the following commands:

```bash
npm run install
npm run serve
```

This should start the client on port 8080.

**NOTE:** Make sure the server is running so that the client can get data.

## Updating the TypeScript types for queries/mutations on the client and/or the schema on the server

The TypeScript types are generated using GraphQL Code Generator which is installed on the root directory so if you want to play with the queries/mutations or server schema, you'll have to install the dependencies and run the codegen first to get the updated types. Do the commands below on the root directory.

Install dependencies:

```bash
npm install
```

Run the codegen:

```bash
npm run generate:gql
```

Run the codegen on watch mode:

```bash
npm run generate:gql -- --watch
```
