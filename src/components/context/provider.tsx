import React, { ReactNode, useEffect, useState } from 'react';
import { context } from './context';
import { IInitialState } from './types';
import axios from "axios";
import { IResponseData, IResponseQuestion } from '../types';


interface IContextProviderProps {
  children: ReactNode,
}

export const ContextProvider = ({ children }: IContextProviderProps) => {

  const scriptUrl = import.meta.env.VITE_SCRIPT_API_ENDPOINT
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const xmlId = urlParams.get('script') || '';

  const [responseState, setResponseState] = useState<IResponseData>()

  // testcodescript

  const getGraph = async () => {
    return await axios<IResponseData>({
      method: 'post',
      url: scriptUrl,
      data: { "xml_id": xmlId },
    });
  }

  const questions = responseState?.question;
  const answers = responseState?.answer;
  const fieldsShows = responseState?.fields;

  useEffect(() => {
    getGraph().then(res => setResponseState(res.data))
  }, [])

  const constQuestionsLinks = answers?.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)), []);
  const rootQuestion = questions?.filter(f => !constQuestionsLinks?.find(x => f.code == x))[0];
  const answersAfterRootQuestion = answers?.filter(el => el.question === rootQuestion?.code)

  const initialState: IInitialState = {
    questions: questions || [],
    answers: answers || [],
    fieldsShows: fieldsShows || [],
    rootQuestion: rootQuestion || {} as IResponseQuestion,
    answersAfterRootQuestion,

    scriptUrl,
    xmlId
  };

  return (
    <context.Provider value={initialState}>{children}</context.Provider>
  );
};
