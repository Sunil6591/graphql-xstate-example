export default {
  Query: {
    request: (_, args, context) => context
      .models
      .Request
      .getRequestById(args.id, context),
    requests: (_, args, context) => context
      .models
      .Request
      .getRequests(args, context),
  },
  Mutation: {
    saveRequest: (_, args, context) => context
      .models
      .Request
      .saveRequests(args, context),
    updateRequest: (_, args, context) => context
      .models
      .Request
      .updateRequest(args, context),
    executeRequest: (_, args, context) => context
      .models
      .Request
      .executeRequest(args, context),
  },
};
