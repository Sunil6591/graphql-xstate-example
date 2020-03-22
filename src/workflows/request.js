import { Machine } from 'xstate';

export const GUARDS = {
  SUBMIT: (request, context) => context.user.id === request.createdByUserId,
  SAVE: (request, context) => context.user.id === request.createdByUserId,
  APPROVE: (request, context) => (context.user.roles
    ? context.user.roles.includes('admin')
    && request.createdByUserId !== context.user.id : false),
  REJECT: (request, context) => (context.user.roles
    ? context.user.roles.includes('admin')
    && request.createdByUserId !== context.user.id : false),
};


export default Machine({
  id: 'request',
  initial: 'draft',
  states: {
    draft: {
      on: {
        SAVE: 'draft',
        SUBMIT: {
          target: 'pending',
          cond: (context) => GUARDS.SUBMIT(context.request, context.reqContext),
        },
      },
    },
    pending: {
      on: {
        SAVE: 'draft',
        APPROVE: {
          target: 'approved',
          cond: (context) => GUARDS.APPROVE(context.request, context.reqContext),
        },
        REJECT: {
          target: 'failure',
          cond: (context) => GUARDS.APPROVE(context.request, context.reqContext),
        },
      },
    },
    approved: {
      type: 'final',
    },
    failure: {
      type: 'final',
    },
  },
});
