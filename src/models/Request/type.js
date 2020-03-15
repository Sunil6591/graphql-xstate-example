export default `
  type Request {
    id: String
    date: Int
    type: String
    error: String
  }
  type Query {
    request (
      id: String!
    ): Request
    requests: [Request]
  }
`;
