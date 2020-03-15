
const requests = [
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

  saveRequests({ request }) {
    requests.push(request);
    return request;
  }
}
