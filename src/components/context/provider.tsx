import React, { ReactNode, useEffect, useState } from 'react';
import { context } from './context';
import { IInitialState } from './types';
import axios from "axios";
import { IResponseData, IResponseQuestion } from '../types';

// todo - test value for get script
// testcodescript

interface IContextProviderProps {
  children: ReactNode,
}

export const ContextProvider = ({ children }: IContextProviderProps) => {

  const urlGetScript = (document.getElementById('url_export_id') as HTMLInputElement).value
  const urlSendScript = (document.getElementById('url_import_id') as HTMLInputElement).value 

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const xmlId = urlParams.get('script') || '';

  const [loading, setIsLoading] = useState<boolean>(false)
  const [responseState, setResponseState] = useState<IResponseData>()

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

  const question_del: string[] = []
  const answer_del: string[] = []

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
    setIsLoading: setIsLoading,

    question_del,
    answer_del
  };

  return (
    <context.Provider value={initialState}>{children}</context.Provider>
  );
};