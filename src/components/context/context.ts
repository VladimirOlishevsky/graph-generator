import { createContext } from 'react';
import { IResponseQuestion } from '../types';
import { IInitialState } from './types';


export const context = createContext<IInitialState>({
  questions: [],
  answers: [],
  fieldsShows: [],
  rootQuestion: {} as IResponseQuestion,
  answersAfterRootQuestion: [],

  urlGetScript: '',
  urlSendScript: '',
  xmlId: '',

  isLoading: false,
  setIsLoading: () => {},

  question_del: [],
  answer_del: []
});
