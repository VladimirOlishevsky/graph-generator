import React, { useState, useRef, useContext } from 'react'
import { feelTreeAnswers } from '../utils/answerUtils';
import { deleteTreeNodes } from '../utils/deleteTreeNodes';
import { ActionType, IOption, optionsAnswer } from './popupMenu/menuOptions';
import { PopupMenu } from './popupMenu/popupMenu';
import { IAnswerDTO, ICreateQuestionOrAnswer, IInternalAnswerDTO, IQuestionDTO } from "./types";
import { styled } from "@mui/material/styles";
import { Card } from '@mui/material';
import { Modal } from './modal';

const prefix = 'Answer';

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

export interface IAnswerProps {
    questions: IQuestionDTO[],
    answers: IAnswerDTO[],
    answerVariant: IInternalAnswerDTO,
    rerenderSheema?: () => void,
    questionAnswer: IAnswerDTO,
    index: number
    questionBefore: IQuestionDTO,

    // handleChangeCollapse?: () => void 
}

export const Answer = ({
    questions,
    answers,
    rerenderSheema,
    answerVariant,
    questionAnswer,
    index,
    questionBefore,

    // handleChangeCollapse
}: IAnswerProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const activeTypeRef = useRef<ActionType>();
    const [openModal, setOpenModal] = useState(false);

    const questionAnswerVariant = questionAnswer.answer.find(el => el.name === answerVariant.name);
    const rootQuestionAfterAnswer = questionAnswerVariant?.question_next && feelTreeAnswers({
        questions,
        answers,
        answer: questionAnswer,
        answerVariant: questionAnswerVariant
    });

    const deleteClick = () => {
        if (questionAnswerVariant) {
            rootQuestionAfterAnswer && deleteTreeNodes({
                questions: [rootQuestionAfterAnswer],
                commonQuestions: questions,
                commonAnswers: answers,
            })
            questionAnswer.answer.splice(index, 1);
        }
        rerenderSheema?.();
    }

    const addQuestion = (value: ICreateQuestionOrAnswer) => {
        const questionCode = `${Math.random()}`;
        const question: IQuestionDTO = {
            code: questionCode,
            name: value.title,
            descr: value.description,
            fields_shows: value.fieldsShowsIds || []
        }
        questions.push(question);

        const answerCode = `${Math.random()}`;
        const answer: IAnswerDTO = {
            answer: [],
            name: value.title,
            code: answerCode,
            question: questionCode
        }
        answers.push(answer);

        answerVariant.question_next = questionCode;
        rerenderSheema?.();
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAdd = (value: ICreateQuestionOrAnswer) => {
        addQuestion(value);
        handleCloseMenu()
    };

    // edit
    const handleEditAnswer = (value: ICreateQuestionOrAnswer) => {
        questionAnswerVariant ? questionAnswerVariant.name = value.description : null
        handleCloseMenu()
    };

    //delete
    const handleDeleteAnswer = () => {
        deleteClick();
        handleCloseMenu()
    };
    // const isNoQuestion = !answerVariant.question_next;
    const adaptOptions = [!rootQuestionAfterAnswer ? { type: 'add', value: 'Добавить вопрос' } : { type: 'empty', value: '' }, ...optionsAnswer]

    return (
        <Root variant="outlined">
            <div className={classes.rootContent}>
                <div>{answerVariant.name}</div>
                <PopupMenu
                    anchorEl={anchorEl}
                    handleOpenMenu={handleOpenMenu}
                    handleCloseMenu={handleCloseMenu}
                    open={open}
                    options={adaptOptions as IOption[]}

                    activeTypeRef={activeTypeRef}
                    setOpenModal={setOpenModal}
                />
                <Modal
                    key={questionBefore.name + questionBefore.descr}
                    open={openModal}
                    handleClose={() => {
                        setOpenModal(false)
                        handleCloseMenu();
                    }}

                    handleCreate={handleAdd}
                    handleEdit={handleEditAnswer}
                    handleDelete={handleDeleteAnswer}
                    actionType={activeTypeRef.current}

                    question={questionBefore}
                    answer={questionAnswerVariant}
                    componentType={'answer'}
                />
            </div>
        </Root>
    )
}