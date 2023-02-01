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
    const flatObj = getFlatQuestionsAndAnswers(questions);
    flatObj.question.forEach(q => commonQuestions.some((value, index) => value.code === q.code && commonQuestions.splice(index, 1)));
    flatObj.answer.forEach(a => commonAnswers.some((el, index)=> el.question === a.question  && commonAnswers.splice(index, 1)));
}