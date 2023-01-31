import { createContext } from 'react';
import { IInitialState } from './types';


export const context = createContext<IInitialState>({
  questions: [],
  answers: [],
  fieldsShows: [],
});
