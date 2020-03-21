export default `
  type Request {
    id: String
    date: Int
    type: String
    payload: JSON
    error: String
    currentState: CurrentState
  }
  type CurrentState {
    value: String!
    nextEvents: [String]
  }
  input RequestInput {
    id: String
    type: String,
    error: String
    payload: String
    currentState: CurrentStateInput
  }
  input CurrentStateInput {
    value: String!
    nextEvents: [String]
  }
  type Query {
    request (
      id: String!
    ): Request
    requests: [Request]
  }
  type Mutation {
    saveRequest(
      request: RequestInput
    ): Request
    updateRequest(
      request: RequestInput
    ): Request
    executeRequest(
      eventName: String!
      request: RequestInput
    ): Boolean
  }
`;
