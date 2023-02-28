import { createContext, ReactNode, useReducer, useState } from 'react';
import { Cycle } from '../@types/Cycle';
import { ActionTypes, cyclesReducer } from '../reducers/cycles';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextDataType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCyclesId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextDataType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCyclesId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCyclesId } = cycleState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCyclesId,
      },
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCyclesId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCyclesId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
