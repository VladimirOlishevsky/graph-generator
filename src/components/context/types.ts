import { IAnswerDTO, IResponseFields, IQuestionDTO, IResponseQuestion } from "../types";

export interface IInitialState {
  questions: IQuestionDTO[],
  answers: IAnswerDTO[]
  fieldsShows: IResponseFields[],

  rootQuestion: IResponseQuestion,
  answersAfterRootQuestion?: IAnswerDTO[],

  urlGetScript: string,
  urlSendScript: string,
  xmlId: string,

  isLoading: boolean,
  setIsLoading: (v: boolean) => void,

  question_del: string[]
  answer_del: string[]
}