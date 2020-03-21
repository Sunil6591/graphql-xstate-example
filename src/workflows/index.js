import { interpret, State } from 'xstate';
import requestMachine from './request';

function getMachine(machineId) {
  switch (machineId) {
    case 'request':
      return requestMachine;
    default:
      return null;
  }
}

const noop = () => {};

export async function createService(context, machineId, onTransition = noop) {
  const machine = getMachine(machineId);
  const machineWithContext = machine.withContext(context);
  const service = interpret(machineWithContext);
  await service.onTransition(onTransition);
  if (context && context.currentState) {
    const previousState = State.create({
      context,
      ...context.currentState,
    });
    const resolvedState = machineWithContext.resolveState(previousState);
    return service.start(resolvedState);
  }
  return service.start();
}
