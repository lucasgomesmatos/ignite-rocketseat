import { produce } from 'immer';
import { Cycle } from '../../@types/Cycle';
import { ActionTypes } from './actions';

interface CyclesState {
  cycles: Cycle[];
  activeCyclesId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCyclesId = action.payload.newCycle.id;
      });
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCyclesId,
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCyclesId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCyclesId,
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCyclesId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
}
