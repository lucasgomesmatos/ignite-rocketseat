import { Cycle } from '../../@types/Cycle';
import { ActionTypes } from './actions';

interface CyclesState {
  cycles: Cycle[];
  activeCyclesId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCyclesId: action.payload.newCycle.id,
      };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCyclesId) {
            return {
              ...cycle,
              interruptedDate: new Date(),
            };
          } else {
            return cycle;
          }
        }),
        activeCyclesId: null,
      };
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCyclesId) {
            return {
              ...cycle,
              finishedDate: new Date(),
            };
          } else {
            return cycle;
          }
        }),
        activeCyclesId: null,
      };
    default:
      return state;
  }
}
