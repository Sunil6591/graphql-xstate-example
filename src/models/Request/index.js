import { createService } from '../../workflows';

let requests = [
  {
    id: '111',
    type: 'VACATION_REQUEST',
  },
  {
    id: '222',
    type: 'SICK_APPLICATION_REQUEST',
  },
];

export default class Request {
  getRequests() {
    return requests;
  }

  getRequestById(id) {
    return requests.find((r) => r.id === id);
  }

  saveRequest({ request }) {
    requests.push({
      ...request,
      payload: request.payload ? JSON.parse(request.payload) : {},
    });
    return request;
  }

  updateRequest({ request }) {
    const index = requests.findIndex((r) => r.id === request.id);
    if (index === -1) return null;
    requests = [
      ...requests.slice(0, index),
      {
        ...requests[index],
        ...request,
      },
      ...requests.slice(index + 1),
    ];
    return requests[index];
  }

  async onTransition({ value, nextEvents, context }) {
    const { request, error } = context;
    const requestInput = {
      id: request.id || Date.now(),
      error: error ? error.toString() : '',
      currentState: {
        value,
        nextEvents,
      },
    };
    if (!request.id) {
      await this.saveRequest({ request: requestInput });
      return;
    }
    await this.updateRequest({ request: requestInput });
  }

  async executeRequest(args, context) {
    let { request } = args;
    if (request && request.id) {
      const requestFromDB = requests.filter((r) => r.id === request.id);
      request = {
        ...request,
        currentState: requestFromDB.currentState,
      };
    }
    const stateContext = {
      request,
      reqContext: context,
      currentState: request.currentState || {
        value: 'draft',
      },
    };
    const service = await createService(stateContext, 'request', this.onTransition.bind(this));
    // Send events
    service.send(args.eventName);
    return true;
  }
}
