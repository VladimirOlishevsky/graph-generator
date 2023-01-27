import React, { useState } from 'react'
import { deleteTreeNodes } from "../utils/deleteTreeNodes";
import { getTransformedRootQuestions } from "../utils/questionUtils";
import { IOption, optionsQuestion } from './popupMenu/menuOptions';
import { PopupMenu } from "./popupMenu/popupMenu";
import { IQuestionDTO, IAnswerDTO, ICreateQuestionOrAnswer } from "./types";
import { styled } from "@mui/material/styles";
import { Card, Typography } from '@mui/material';

const prefix = 'Question';

const classes = {
    rootContent: `${prefix}-rootContent`,
    header: `${prefix}-header`,
    content: `${prefix}-content`,
};

const Root = styled(Card)(() => ({
    display: 'inline-block',
    padding: 12,
    borderRadius: 12,

    [`& .${classes.rootContent}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },

    [`& .${classes.header}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    [`& .${classes.content}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'baseline',
        maxWidth: 300
    },
}));

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const createAnswer = (value: ICreateQuestionOrAnswer) => {
        questionAnswer.answer.push({
            // name: `Ответ ${Math.random()}`,
            name: value.description,
            question_next: ''
        })
        handleClose();
        rerenderSheema?.();
    }

    const editQuestion = (value: ICreateQuestionOrAnswer) => {
        question.name = value.title;
        question.descr = value.description;
        handleClose();
    }

    const deleteQuestion = () => {
        const tree = getTransformedRootQuestions(questions, answers, [question])
        deleteTreeNodes({
            questions: tree,
            commonQuestions: questions,
            commonAnswers: answers
        })
        handleClose();
        rerenderSheema?.();
    }

    const adaptOptions = !isRootQuestion ? [...optionsQuestion, { type: 'delete', value: 'Удалить' }] : optionsQuestion

    return <Root variant="outlined">
        <div className={classes.rootContent}>
            <div className={classes.header}>
                <Typography fontWeight='700'>вопрос</Typography>
                <PopupMenu
                    anchorEl={anchorEl}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    open={open}
                    options={adaptOptions as IOption[]}
                    question={question}
                    createAnswer={createAnswer}
                    editQuestion={editQuestion}
                    deleteQuestion={deleteQuestion}
                    componentType='question'
                />
            </div>
            <div className={classes.content}>
                <Typography align='left'>{question.name}</Typography>
                <Typography align='left'>{question.descr}</Typography>
            </div>
        </div>


    </Root>
}


{/* <button onClick={() => {
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
        }}>удалить</button>} */}
{/* {<button onClick={() => {
            //    console.log('xxx', getFlatQuestionsAndAnswers(getTransformedRootQuestions(questions, answers, [question])))
            console.log('xxx', getTransformedRootQuestions(questions, answers, [question]))
        }}>get question Tree</button>} */}