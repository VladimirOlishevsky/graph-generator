import React, { ReactNode, useEffect, useState } from 'react';
import { context } from './context';
import { IInitialState } from './types';
import axios from "axios";
import { IResponseData, IResponseQuestion } from '../types';
import { newGraphMock } from '../mock';


interface IContextProviderProps {
  children: ReactNode,
}

export const ContextProvider = ({ children }: IContextProviderProps) => {

  const urlGetScript = import.meta.env.VITE_DEV_EXPORT_SCRIPT_API_ENDPOINT
  const urlSendScript = import.meta.env.VITE_DEV_IMPORT_SCRIPT_API_ENDPOINT
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const xmlId = urlParams.get('script') || '';

  const [loading, setIsLoading] = useState<boolean>(false)

  const [responseState, setResponseState] = useState<IResponseData>()
  // const [responseState, setResponseState] = useState<IResponseData>(newGraphMock)

  // testcodescript

  const getGraph = async () => {
    setIsLoading(true);
    const response = await axios<IResponseData>({
      method: 'post',
      url: urlGetScript,
      data: { "xml_id": xmlId },
    });
    setIsLoading(false);
    return response
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

    urlGetScript,
    urlSendScript,
    xmlId,

    isLoading: loading,
    setIsLoading: setIsLoading
  };

  return (
    <context.Provider value={initialState}>{children}</context.Provider>
  );
};
