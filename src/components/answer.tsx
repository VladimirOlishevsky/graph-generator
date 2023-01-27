import React, { useState } from 'react'
import { feelTreeAnswers } from '../utils/answerUtils';
import { deleteTreeNodes } from '../utils/deleteTreeNodes';
import { getFlatQuestionsAndAnswers } from '../utils/getFlatQuestionsAndAnswers';
import { IOption, optionsAnswer } from './popupMenu/menuOptions';
import { PopupMenu } from './popupMenu/popupMenu';
import { IAnswerDTO, ICreateQuestionOrAnswer, IInternalAnswerDTO, IQuestionDTO } from "./types";


export interface IAnswerProps {
    questions: IQuestionDTO[],
    answers: IAnswerDTO[],
    answerVariant: IInternalAnswerDTO,
    rerenderSheema?: () => void,
    questionAnswer: IAnswerDTO,
    index: number
    questionBefore: IQuestionDTO
}

export const Answer = ({
    questions,
    rerenderSheema,
    answerVariant,
    answers,
    questionAnswer,
    index,
    questionBefore
}: IAnswerProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const questionAnswerVariant = questionAnswer.answer.find(el => el.name === answerVariant.name);
    const rootQuestionAfterAnswer = questionAnswerVariant && feelTreeAnswers({
        questions,
        answers,
        answer: questionAnswer,
        answerVariant: questionAnswerVariant
    });

    console.log('questionAnswer', questionAnswer)

    const deleteClick = () => {
        if (questionAnswerVariant) {
            rootQuestionAfterAnswer && deleteTreeNodes({
                questions: [rootQuestionAfterAnswer],
                commonQuestions: questions,
                commonAnswers: answers,
            })
            questionAnswer.answer.splice(index, 1);

            // if (!questionAnswerVariant?.question_next) {
            //     const index = questionAnswer.answer.indexOf(questionAnswerVariant)
            //     questionAnswer.answer.splice(index, 1);
            // } else {
            //     const answerRootQuestion = feelTreeAnswers(questions, answers, questionAnswer, questionAnswerVariant);

            //     const index = questionAnswer.answer.indexOf(questionAnswerVariant)
            //     questionAnswer.answer.splice(index, 1);

            //     // console.log('answerRootQuestion', answerRootQuestion)
            //     // answerRootQuestion && deleteTreeNodes({
            //     //     questions: answerRootQuestion ? [answerRootQuestion] : [],
            //     //     commonQuestions: questions,
            //     //     commonAnswers: answers,
            //     // })

            //     //0.3423241901637042
            //     //0.50684821753806
            // }
        }
        rerenderSheema?.();
    }

    const addClick = (value: ICreateQuestionOrAnswer) => {

        console.log('value', value)
        const questionCode = `${Math.random()}`;
        const question: IQuestionDTO = {
            code: questionCode,
            name: `${value.title}`,
            descr: `${value.description}`,
            // descr: `Описание вопроса ${questionCode}`,
            // name: `Название вопроса ${questionCode}`,
            fields_shows: []
        }
        questions.push(question);

        const answerCode = `${Math.random()}`;
        const answer: IAnswerDTO = {
            answer: [],
            name: `${value.title}`,
            // name: `Описание вопроса ${answerCode}`,
            code: answerCode,
            question: questionCode
        }
        answers.push(answer);

        answerVariant.question_next = questionCode;
        rerenderSheema?.();
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdd = (value: ICreateQuestionOrAnswer) => {
        addClick(value);
        handleClose()
    };

    // edit
    const handleEditAnswer = (value: string) => {
        questionAnswerVariant ? questionAnswerVariant.name = value : null
        handleClose()
    };

    //delete
    const handleDeleteAnswer = () => {
        deleteClick();
        handleClose()
    };
    const isNoQuestion = !answerVariant.question_next;

    const adaptOptions = [!rootQuestionAfterAnswer ? { type: 'add', value: 'Добавить вопрос' } : { type: 'empty', value: '' }, ...optionsAnswer]
    return <div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontWeight: 700 }}>ответ</div>
            <div>{answerVariant.name}</div>

            <PopupMenu
                anchorEl={anchorEl}
                handleClick={handleClick}
                handleClose={handleClose}
                open={open}
                options={adaptOptions as IOption[]}

                question={questionBefore}
                answer={questionAnswerVariant}
                // handleAdd={handleAdd}

                handleCreateQuestion={handleAdd}

                handleEditAnswer={handleEditAnswer}
                deleteAnswer={handleDeleteAnswer}

                componentType='answer'
            />
        </div>


        {/* <button onClick={() => {
            const questionCode = `${Math.random()}`;
            const question: IQuestionDTO = {
                code: questionCode,
                descr: `Описание вопроса ${questionCode}`,
                name: `Название вопроса ${questionCode}`,
                fields_shows: []
            }
            questions.push(question);

            const answerCode = `${Math.random()}`;
            const answer: IAnswerDTO = {
                answer: [],
                name: `Описание вопроса ${answerCode}`,
                code: answerCode,
                question: questionCode
            }
            answers.push(answer);

            answerVariant.question_next = questionCode;
            rerenderSheema?.();
        }}>{isNoQuestion ? 'добавить' : 'изменить'} вопрос</button>


        <button onClick={() => {

            const questionAnswerVariant = questionAnswer.answer.find(el => el.name === answerVariant.name);

            if (questionAnswerVariant) {
                const answerRootQuestion = feelTreeAnswers(questions, answers, questionAnswer, questionAnswerVariant);
                answerRootQuestion && deleteTreeNodes({
                    questions: [answerRootQuestion],
                    commonQuestions: questions,
                    commonAnswers: answers,
                })

                const index = questionAnswer.answer.indexOf(questionAnswerVariant)
                questionAnswer.answer.splice(index, 1);

                

                // if (!questionAnswerVariant?.question_next) {
                //     const index = questionAnswer.answer.indexOf(questionAnswerVariant)
                //     questionAnswer.answer.splice(index, 1);
                // } else {
                //     const answerRootQuestion = feelTreeAnswers(questions, answers, questionAnswer, questionAnswerVariant);

                //     const index = questionAnswer.answer.indexOf(questionAnswerVariant)
                //     questionAnswer.answer.splice(index, 1);

                //     // console.log('answerRootQuestion', answerRootQuestion)
                //     // answerRootQuestion && deleteTreeNodes({
                //     //     questions: answerRootQuestion ? [answerRootQuestion] : [],
                //     //     commonQuestions: questions,
                //     //     commonAnswers: answers,
                //     // })

                //     //0.3423241901637042
                //     //0.50684821753806
                // }
            }
            rerenderSheema?.();
        }}>удалить</button> */}


        {/* <button onClick={() => {
            const res = feelTreeAnswers({ questions, answers, answer: questionAnswer, answerVariant })
            console.log('answer treeeeeee', res && getFlatQuestionsAndAnswers([res]))
        }}>get Answer Tree</button> */}


    </div>
}