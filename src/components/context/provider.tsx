import React, { ReactNode } from 'react';
import { newMock } from '../mock';
import { context } from './context';
import { IInitialState } from './types';


interface IProp {
  children: ReactNode,
}

export const ContextProvider = ({ children }: IProp) => {
  const questions = newMock.question;
  const answers = newMock.answer;
  const fieldsShows = newMock.fields;
  // const questions = mockQuestions;
  // const answers = mockAnswers;
  // const fieldsShows = mockFieldShows;


  const initialState: IInitialState = {
    questions,
    answers,
    fieldsShows,
  };

  return (
    <context.Provider value={initialState}>{children}</context.Provider>
  );
};
