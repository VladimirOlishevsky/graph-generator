import { IAnswerDTO, IFieldsShowsResponseItem, IQuestionDTO } from "../types";

export interface IInitialState {
  questions: IQuestionDTO[],
  answers: IAnswerDTO[]
  fieldsShows: IFieldsShowsResponseItem[],
}