import { deleteTreeNodes } from "../utils/deleteTreeNodes";
import { getTransformedRootQuestions } from "../utils/questionUtils";
import { IQuestionDTO, IAnswerDTO, ICreateQuestionOrAnswer } from "./types";

export interface IQuestionProps {
    question: IQuestionDTO,
    questionAnswer: IAnswerDTO,
    rerenderSheema?: () => void,
    questions: IQuestionDTO[],
    answers: IAnswerDTO[],
    isRootQuestion?: boolean
}

export const Question = ({
    question,
    questionAnswer,
    rerenderSheema,
    questions,
    answers,
    isRootQuestion
}: IQuestionProps) => {

    const addQuestion = (value: string) => {
        questionAnswer.answer.push({
            // name: `Ответ ${Math.random()}`,
            name: value,
            question_next: ''
        })
        rerenderSheema?.();
    }

    const editQuestion = (value: ICreateQuestionOrAnswer) => {
        question.name = value.title
        question.descr = value.description
    }

    const deleteQuestion = () => {
        const tree = getTransformedRootQuestions(questions, answers, [question])
            deleteTreeNodes({
                questions: tree,
                commonQuestions: questions,
                commonAnswers: answers
            })
            rerenderSheema?.();
    }


    return <div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <div style={{ fontWeight: 700 }}>вопрос</div>
            <div>{question.name}</div>
        </div>

        <div>{question.descr}</div>
        <button onClick={() => {
            questionAnswer.answer.push({
                name: `Ответ ${Math.random()}`,
                question_next: ''
            })
            rerenderSheema?.();
        }}>добавить ответ</button>
        {!isRootQuestion && <button onClick={() => {
            const tree = getTransformedRootQuestions(questions, answers, [question])
            console.log('tree', tree)

            // const result = getFlatQuestionsAndAnswers(tree);
            deleteTreeNodes({
                questions: tree,
                commonQuestions: questions,
                commonAnswers: answers
            })
            rerenderSheema?.();
        }}>удалить</button>}
        {<button onClick={() => {
            //    console.log('xxx', getFlatQuestionsAndAnswers(getTransformedRootQuestions(questions, answers, [question])))
            console.log('xxx', getTransformedRootQuestions(questions, answers, [question]))
        }}>get question Tree</button>}
    </div>
}