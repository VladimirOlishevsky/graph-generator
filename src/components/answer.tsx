import React, { useState, useRef } from 'react'
import { feelTreeAnswers } from '../utils/answerUtils';
import { deleteTreeNodes } from '../utils/deleteTreeNodes';
import { ActionType, IOption, optionsAnswer } from './popupMenu/menuOptions';
import { PopupMenu } from './popupMenu/popupMenu';
import { IAnswerDTO, ICreateEditQuestionAnswer, IInternalAnswerDTO, IQuestionDTO } from "./types";
import { styled } from "@mui/material/styles";
import { Card, Typography } from '@mui/material';
import { ModalAnswer } from './modals/modalAnswer';

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
}

export const Answer = ({
    questions,
    answers,
    rerenderSheema,
    answerVariant,
    questionAnswer,
    index,
    questionBefore,
}: IAnswerProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const activeTypeRef = useRef<ActionType>();
    const [openModal, setOpenModal] = useState(false);
    
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

    const addQuestion = (value: ICreateEditQuestionAnswer) => {
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

    const handleAddQuestion = (value: ICreateEditQuestionAnswer) => {
        addQuestion(value);
        handleCloseMenu()
    };

    // edit
    const handleEditAnswer = (value: ICreateEditQuestionAnswer) => {
        questionAnswerVariant ? questionAnswerVariant.name = value.description : null
        handleCloseMenu()
    };

    //delete
    const handleDeleteAnswer = () => {
        deleteClick();
        handleCloseMenu()
    };
    const adaptOptions = [!rootQuestionAfterAnswer ? { type: 'add', value: 'Добавить вопрос' } : { type: 'empty', value: '' }, ...optionsAnswer]

    return (
        <Root variant="outlined">
            <div className={classes.rootContent}>
            <div className={classes.header}>
                <Typography fontWeight='700'>ответ</Typography>
                <PopupMenu
                    anchorEl={anchorEl}
                    handleOpenMenu={handleOpenMenu}
                    handleCloseMenu={handleCloseMenu}
                    open={open}
                    options={adaptOptions as IOption[]}

                    activeTypeRef={activeTypeRef}
                    setOpenModal={setOpenModal}
                />
            </div>
                <Typography align='left'>{answerVariant.name}</Typography>
                <ModalAnswer
                    open={openModal}
                    handleClose={() => {
                        setOpenModal(false)
                        handleCloseMenu();
                    }}
                    handleCreate={handleAddQuestion}
                    handleEdit={handleEditAnswer}
                    handleDelete={handleDeleteAnswer}
                    actionType={activeTypeRef.current}

                    question={questionBefore}
                    answer={questionAnswerVariant}
                />
            </div>
        </Root>
    )
}