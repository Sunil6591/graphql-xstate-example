export default `
  type Request {
    id: String
    date: Int
    type: String
    error: String
  }
  input RequestInput {
    id: String
    type: String,
    error: String
  }
  type Query {
    request (
      id: String!
    ): Request
    requests: [Request]
  }
  type Mutation {
    saveRequest(request: RequestInput): Request
  }
`;
