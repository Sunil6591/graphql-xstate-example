import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  # to keep it simple
  type Request {
    id: String
    type: String
  }

  type Query {
    requests: [Request]
  }
`;

const resolvers = {
  Query: {
    requests: () => [
      {
        id: '111',
        type: 'REQUEST',
      },
    ],
  },
};

const context = {
  user: {
    roles: ['admin'],
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
