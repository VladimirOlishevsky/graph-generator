import React, { useState, useRef, useMemo, useContext, useEffect } from 'react'
import { deleteTreeNodes } from "../utils/deleteTreeNodes";
import { getTransformedRootQuestions } from "../utils/questionUtils";
import { ActionType, IOption, optionsQuestion } from './popupMenu/menuOptions';
import { PopupMenu } from "./popupMenu/popupMenu";
import { IQuestionDTO, IAnswerDTO, ICreateQuestionOrAnswer } from "./types";
import { styled } from "@mui/material/styles";
import { Card, Typography } from '@mui/material';
import { Modal } from './modal';

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
        alignItems: 'center',
        gap: 12
    },
    [`& .${classes.content}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'baseline',
        maxWidth: 300,
        textAlign: 'left'
    },
}));

export interface IQuestionProps {
    question: IQuestionDTO,
    questionAnswer: IAnswerDTO,
    rerenderSheema?: () => void,
    questions: IQuestionDTO[],
    answers: IAnswerDTO[],
    isRootQuestion?: boolean

    handleChangeCollapse?: () => void
}

export const Question = ({
    question,
    questionAnswer,
    rerenderSheema,
    questions,
    answers,
    isRootQuestion,

    handleChangeCollapse
}: IQuestionProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [openModal, setOpenModal] = useState(false);
    const activeTypeRef = useRef<ActionType>();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const createAnswer = (value: ICreateQuestionOrAnswer) => {
        questionAnswer.answer.push({
            name: value.description,
            question_next: ''
        })
        handleCloseMenu();
        rerenderSheema?.();
    }

    const editQuestion = (value: ICreateQuestionOrAnswer) => {
        question.name = value.title;
        question.descr = value.description;
        question.fields_shows = value.fieldsShowsIds || []; // todo check
        handleCloseMenu();
        rerenderSheema?.();
    }

    const deleteQuestion = () => {
        const tree = getTransformedRootQuestions(questions, answers, [question])
        deleteTreeNodes({
            questions: tree,
            commonQuestions: questions,
            commonAnswers: answers
        })
        handleCloseMenu();
        rerenderSheema?.();
    }

    const adaptOptions = !isRootQuestion ? [...optionsQuestion, { type: 'delete', value: 'Удалить' }] : optionsQuestion;

    return <Root variant="outlined">
        <div className={classes.rootContent}>
            <div className={classes.header}>
                <Typography fontWeight='700'>вопрос</Typography>
                <PopupMenu
                    options={adaptOptions as IOption[]}
                    open={open}
                    anchorEl={anchorEl}
                    handleOpenMenu={handleOpenMenu}
                    handleCloseMenu={handleCloseMenu}

                    activeTypeRef={activeTypeRef}
                    setOpenModal={setOpenModal}
                />
            </div>
            <div className={classes.content}>
                <Typography>{question.name}</Typography>
                <Typography>{question.descr}</Typography>
            </div>
            <button onClick={handleChangeCollapse}>collapse</button>
        </div>
        <Modal
            key={question.name + question.descr}
            open={openModal}
            handleClose={() => {
                setOpenModal(false)
                handleCloseMenu();
            }}

            handleCreate={createAnswer}
            handleEdit={editQuestion}
            handleDelete={deleteQuestion}
            actionType={activeTypeRef.current}

            question={question}
            componentType={'question'}
        />
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