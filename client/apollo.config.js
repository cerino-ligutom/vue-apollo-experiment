const path = require("path");

module.exports = {
  // https://www.apollographql.com/docs/devtools/apollo-config/#client-projects
  client: {
    service: {
      name: "server",
      url: "http://localhost:3000/graphql",
      includes: ["./src/**/*.graphql"],
      excludes: ["./src/generated/graphql/index.ts"],
    },
    // bug? current workaround:
    // https://github.com/apollographql/apollo-tooling/issues/1715
    tagName: "omitGQLTags",
  },
};
