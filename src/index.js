import { ApolloServer, gql } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';
import RequestType from './models/Request/type';
import RequestResolver from './models/Request/resolver';
import Request from './models/Request';

const typeDefs = gql`
  scalar JSON
  ${RequestType}
`;

const resolvers = {
  ...RequestResolver,
  JSON: GraphQLJSON,
};

const getContext = {
  user: {
    roles: ['admin'],
  },
  models: {
    Request: new Request(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: getContext });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
