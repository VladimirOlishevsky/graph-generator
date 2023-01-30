import { IModalWrapeprProps } from "../modal";
import { IAnswerDTO, IFieldsShowsResponseItem, IQuestionDTO } from "../types";

export interface IInitialState {
  questions: IQuestionDTO[],
  answers: IAnswerDTO[]
  fieldsShows: IFieldsShowsResponseItem[],

  modalState: IModalWrapeprProps,
  setModalState: React.Dispatch<React.SetStateAction<IModalWrapeprProps>>
}