import { useState, useContext } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { IAnswerDTO, IQuestionDTO } from "./types";
import { Answer } from "./answer";
import { Question } from "./question";
import { ContextProvider } from "./context/provider";
import { getFlatQuestionsAndAnswers } from "../utils/getFlatQuestionsAndAnswers";
import { getTransformedRootQuestions } from "../utils/questionUtils";
import { context } from "./context/context";
import { Loader } from "./loader";
import axios from "axios";
import { nanoid } from 'nanoid';
import { Button } from '@mui/material';


const SchemaTree = (): JSX.Element | null => {
    const {
        questions,
        answers,
        rootQuestion,
        answersAfterRootQuestion,
        urlSendScript,
        xmlId,
        isLoading,
        setIsLoading
    } = useContext(context);
    const [_, setState] = useState('');

    const rerenderSchema = () => {
        setState(`${Math.random()}`);
    }

    if (rootQuestion.code && (!answersAfterRootQuestion || !answersAfterRootQuestion[0]?.answer.length)) {
        console.log('связи не найдены')
    }

    const tree = getTransformedRootQuestions(questions, answers, [rootQuestion]);
    const result = getFlatQuestionsAndAnswers(tree);

    const sendScriptResult = async () => {
        setIsLoading(true);
        await axios<void>({
            method: 'post',
            url: urlSendScript,
            data: { json: [{ ...result }] },
        });
        setIsLoading(false);
    }

    const buttonStyle = {
        "&:focus": {
            outline: 'none',
        }
    };

    const click = () => {
        // rerenderSchema();
        console.log('flat tree', result)
    }

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: 20 }}>
            {rootQuestion.code && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                        <Button sx={buttonStyle} variant="contained" onClick={sendScriptResult}>Сохранить скрипт</Button>
                        <Button sx={buttonStyle} variant="contained" onClick={click}>Посмотреть дерево в консоли</Button>
                    </div>
                    {getQuestionAnswer({
                        questions,
                        answers,
                        question: rootQuestion,
                        rerenderSchema,
                        isRoot: true,
                        xmlId: xmlId
                    })}
                </>
            )}
            <Loader isShow={isLoading} />
        </div>
    )
}

interface IGetQuestionAnswer {
    questions: IQuestionDTO[],
    answers: IAnswerDTO[],
    question?: IQuestionDTO,
    rerenderSchema?: () => void,
    isRoot?: boolean,
    xmlId?: string
}

const getQuestionAnswer = ({
    questions,
    answers,
    question,
    rerenderSchema,
    isRoot,
    xmlId
}: IGetQuestionAnswer): React.ReactNode => {

    if (!question) return null;
    let questionAnswer: IAnswerDTO = answers
        .filter(x => x.question === question.code)[0]

    if (!questionAnswer) {
        questionAnswer = {
            answer: [],
            code: `${xmlId}-${nanoid(8)}`,
            name: question.name,
            question: question.code
        }
        answers.push(questionAnswer)
    }

    const questionComponent = <Question
        questionAnswer={questionAnswer}
        question={question}
        rerenderSheema={rerenderSchema}
        questions={questions}
        answers={answers}
    />
    const answerComponent = question.isCollapse ? null : questionAnswer?.answer.map((f, index) => {
        return <TreeNode key={index} label={
            <Answer
                questions={questions}
                answers={answers}
                answerVariant={f}
                rerenderSheema={rerenderSchema}
                questionAnswer={questionAnswer}
                index={index}
                questionBefore={question}
            />}>

            {!f.question_next ? null : (
                getQuestionAnswer({
                    questions,
                    answers,
                    question: questions.find(x => x.code === f.question_next),
                    rerenderSchema
                })
            )}
        </TreeNode>
    })

    return isRoot ? (
        <Tree
            lineHeight='20px'
            nodePadding='5px'
            lineWidth={'2px'}
            lineColor={'black'}
            lineBorderRadius={'10px'}
            label={(
                <Question
                    questionAnswer={questionAnswer}
                    question={question}
                    rerenderSheema={rerenderSchema}
                    questions={questions}
                    answers={answers}
                    isRootQuestion={true}
                />
            )}
        >
            {answerComponent}
        </Tree>
    ) : (
        <TreeNode label={questionComponent}>
            {answerComponent}
        </TreeNode>
    )
}


export const Graph = () => {
    return (
        <ContextProvider>
            <SchemaTree />
        </ContextProvider>
    );
}