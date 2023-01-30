import { createContext } from 'react';
import { IModalWrapeprProps } from '../modal';
import { IInitialState } from './types';


export const context = createContext<IInitialState>({
  questions: [],
  answers: [],
  fieldsShows: [],

  modalState: {} as IModalWrapeprProps,
  setModalState: () => {}
});
