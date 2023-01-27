import { IAnswerDTO, IInternalAnswerDTO, IQuestion, IQuestionDTO } from "../components/types";
import { feelTreeQuestion } from "./questionUtils";

interface IFeelTreeAnswers {
    questions: IQuestionDTO[], 
    answers: IAnswerDTO[], 
    answer: IAnswerDTO, 
    answerVariant: IInternalAnswerDTO
}

export const feelTreeAnswers = ({
    questions,
    answers,
    answer,
    answerVariant
}:IFeelTreeAnswers): IQuestion | undefined => {
    const questionAnswers = answer.answer.map(z => ({
        ...z,
        question_next: (() => {
            const foundQuestion = questions.find(y => y.code == z.question_next);
            if (!foundQuestion) {
                return undefined;
            }
            return feelTreeQuestion(questions, answers, foundQuestion)
        })()
    }))

    const result = questionAnswers.find(el => el.name === answerVariant.name)
    return result?.question_next
}