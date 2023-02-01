import { IAnswerDTO, IResponseFields, IQuestionDTO, IResponseQuestion } from "../types";

export interface IInitialState {
  questions: IQuestionDTO[],
  answers: IAnswerDTO[]
  fieldsShows: IResponseFields[],

  rootQuestion: IResponseQuestion,
  answersAfterRootQuestion?: IAnswerDTO[],

  scriptUrl: string,
  xmlId: string
}