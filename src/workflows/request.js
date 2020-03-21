import { Machine } from 'xstate';

export default Machine({
  id: 'request',
  initial: 'draft',
  states: {
    draft: {
      on: {
        SAVE: 'draft',
        SUBMIT: 'pending',
      },
    },
    pending: {
      on: {
        SAVE: 'draft',
        APPROVE: {
          target: 'approved', cond: (context) => context.user.roles.includes('admin'),
        },
        REJECT: {
          target: 'failure', cond: (context) => context.user.roles.includes('admin'),
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
