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
};
