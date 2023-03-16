import { HandPalm, Play } from 'phosphor-react';
import { CountDown } from './components/CountDown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './style';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { CyclesContext } from '../../context/CycleContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo de 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo de 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar o foco
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
};
