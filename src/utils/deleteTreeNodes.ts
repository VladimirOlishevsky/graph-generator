import { getFlatQuestionsAndAnswers } from "./getFlatQuestionsAndAnswers";
import { IAnswerDTO, IQuestion, IQuestionDTO } from "../components/types";

interface IFilterExcludeDeleteElements {
    questions: IQuestion[],
    commonQuestions: IQuestionDTO[]
    commonAnswers: IAnswerDTO[],
}

export const deleteTreeNodes = ({
    questions,
    commonQuestions,
    commonAnswers,
}: IFilterExcludeDeleteElements) => {
    const obj = getFlatQuestionsAndAnswers(questions);
    obj.questions.forEach(x => commonQuestions.some((value, index) => value.code === x.code && commonQuestions.splice(index, 1)));
    obj.answers.forEach(ll => commonAnswers.some((el, index)=> el.question === ll.question  && commonAnswers.splice(index, 1)));
}