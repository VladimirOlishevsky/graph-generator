import { getFlatQuestionsAndAnswers } from "./getFlatQuestionsAndAnswers";
import { IAnswerDTO, IQuestion, IQuestionDTO } from "../components/types";

interface IFilterExcludeDeleteElements {
    questions: IQuestion[],
    commonQuestions: IQuestionDTO[]
    commonAnswers: IAnswerDTO[],

    question_del: string[], 
    answer_del: string[]
}

export const deleteTreeNodes = ({
    questions,
    commonQuestions,
    commonAnswers,

    question_del,
    answer_del
}: IFilterExcludeDeleteElements) => {

    const flatObj = getFlatQuestionsAndAnswers(questions);
    
    flatObj.question.forEach(q => commonQuestions.some((value, index) =>  {
        if(value.code === q.code) {
            question_del.push(value.code);
            commonQuestions.splice(index, 1)
        }
    }));

    flatObj.answer.forEach(a => commonAnswers.some((el, index)=> {
        if(el.question === a.question) {
            answer_del.push(el.code);
            commonAnswers.splice(index, 1)
        }
    }));
}