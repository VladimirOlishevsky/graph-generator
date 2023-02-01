import React, { ReactNode, useEffect } from 'react';
import { newMock } from '../mock';
import { context } from './context';
import { IInitialState } from './types';
import axios from "axios";


interface IProp {
  children: ReactNode,
}

export const ContextProvider = ({ children }: IProp) => {


  const url = import.meta.env.VITE_GET_SCRIPT_API_ENDPOINT
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const xmlId = urlParams.get('script')

  const getGraph = async () => {

    // {"Access-Control-Allow-Origin", "*"}

    const response = await axios({
      method: 'post',
      headers: {"Access-Control-Allow-Origin": "*"},
      url: url,
      data: JSON.stringify({ "xml_id":"testcodescript" })
    });

    


    // const response =  axios.post('https://bitrix24rrt-develop-dev5.dev.rrt.ru/api/graph_generation/', JSON.stringify({"xml_id":"testcodescript"})),

    
    // const response = await fetch('https://bitrix24rrt-develop-dev5.dev.rrt.ru/api/graph_generation/', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "http://localhost:5173/",
    //     "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    // },
    // body: JSON.stringify({"xml_id":"testcodescript"})
    // });

    console.log(response)
  }

  useEffect(() => {
    getGraph()
  }, [])


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
