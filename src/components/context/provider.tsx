import React, { ReactNode, useState } from 'react';
import { mockAnswers, mockFieldShows, mockQuestions, newMock } from '../mock';
import { IModalWrapeprProps } from '../modal';
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

  const [modalState, setModalState] = useState<IModalWrapeprProps>({} as IModalWrapeprProps);

  console.log('modalState', modalState)

  const initialState: IInitialState = {
    questions,
    answers,
    fieldsShows,

    modalState,
    setModalState
  };

  return (
    <context.Provider value={initialState}>{children}</context.Provider>
  );
};
