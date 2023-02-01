import React, { useState, useRef, useContext } from 'react'
import { deleteTreeNodes } from "../utils/deleteTreeNodes";
import { getTransformedRootQuestions } from "../utils/questionUtils";
import { ActionType, IOption, optionsQuestion } from './popupMenu/menuOptions';
import { PopupMenu } from "./popupMenu/popupMenu";
import { IQuestionDTO, IAnswerDTO, ICreateEditQuestionAnswer } from "./types";
import { styled } from "@mui/material/styles";
import { Card, Chip, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import { ModalQuestion } from './modals/modalQuestion';
import { context } from './context/context';
import { getFlatQuestionsAndAnswers } from '../utils/getFlatQuestionsAndAnswers';

const prefix = 'Question';

const classes = {
    rootContent: `${prefix}-rootContent`,
    header: `${prefix}-header`,
    content: `${prefix}-content`,
    expandIconWrapper: `${prefix}-expandIconWrapper`,
    expand: `${prefix}-expand`,
    expandOpen: `${prefix}-expandOpen`,

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

    [`& .${classes.expandIconWrapper}`]: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },

    [`& .${classes.expand}`]: {
        transform: "rotate(0deg)",
        transition: "transform 0.15s ease-in",
        "&:focus": {
            outline: 'none',
        }
    },

    [`& .${classes.expandOpen}`]: {
        transform: "rotate(180deg)"
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
    isRootQuestion,
}: IQuestionProps) => {
    const { fieldsShows } = useContext(context);

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

    const createAnswer = (value: ICreateEditQuestionAnswer) => {
        questionAnswer.answer.push({
            name: value.description,
            question_next: ''
        })
        handleCloseMenu();
        rerenderSheema?.();
    }

    const editQuestion = (value: ICreateEditQuestionAnswer) => {
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

    const setIsCollapse = () => {
        question.isCollapse = !question.isCollapse;
        rerenderSheema?.();
    }

    const adaptOptions = !isRootQuestion ? [...optionsQuestion, { type: 'delete', value: 'Удалить' }] : optionsQuestion;

    const getQuestionTags = () => {
        return fieldsShows.filter(el => question?.fields_shows.some(value => value === el.code))
    }

    // todo - delete
    // const click = () => {
    //     const tree = getTransformedRootQuestions(questions, answers, [question])
    //     const result = getFlatQuestionsAndAnswers(tree);
    //     console.log('question', result)
    // }

    return <Root variant="outlined">
        <div className={classes.rootContent}>
            <div className={classes.header}>
            {/* <button onClick={click}>get tree</button> */}
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
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {getQuestionTags().map(el => <Chip key={el.code} label={el.name} />)}
                </div>
                {Boolean(questionAnswer.answer.length) ? (
                    <div className={classes.expandIconWrapper}>
                        <IconButton
                            className={clsx(classes.expand, question.isCollapse ? classes.expandOpen : undefined)}
                            onClick={setIsCollapse}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </div>
                ) : null}
            </div>
        </div>
        <ModalQuestion
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
        />
    </Root>
}