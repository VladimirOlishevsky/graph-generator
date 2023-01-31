import { IAnswer, IAnswerDTO, IQuestion, IQuestionDTO } from "../components/types";

export const feelTreeQuestion = (questions: IQuestionDTO[], answers: IAnswerDTO[], question: IQuestionDTO): IQuestion => {
    const questionAnswers: IAnswer[] = answers
        .filter(x => x.question === question.code)
        .map(f => ({
            ...f,
            answer: f.answer.map(z => ({
                ...z,
                question_next: (() => {
                    const foundQuestion = questions.find(y => y.code === z.question_next);
                    if (!foundQuestion) {
                        return undefined;
                    }
                    return feelTreeQuestion(questions, answers, foundQuestion)
                })()
            }))
        }));

    return {
        ...question,
        answers: questionAnswers
    } as IQuestion;
}


export const getTransformedRootQuestions = (questions: IQuestionDTO[], answers: IAnswerDTO[], rootQuestions: IQuestionDTO[]): IQuestion[] =>
    rootQuestions.map(x => feelTreeQuestion(questions, answers, x));
