import { GUARDS } from '../../workflows/request';

function getVacationRequestInfo() {
  return {
    vacationLeft: 10,
    totalAllowedVacation: 22,
    lastVacation: new Date('2020-01-01'),
  };
}

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
  Request: {
    payload: async (request, _, context) => ({
      ...request.payload,
      ...getVacationRequestInfo(request, context),
    }),
    currentState: (request, _, context) => {
      if (!request.currentState || !request.currentState.nextEvents) return request.currentState;
      return {
        ...request.currentState,
        nextEvents: request.currentState.nextEvents
          .filter((event) => {
            const fn = GUARDS[event];
            if (fn) {
              return fn(request, context);
            }
            return true;
          }),
      };
    },
  },
};
