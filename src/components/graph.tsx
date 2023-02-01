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


const SchemaTree = (): JSX.Element => {
    const { questions, answers, rootQuestion, answersAfterRootQuestion, scriptUrl, xmlId } = useContext(context);
    const [_, setState] = useState('');

    const rerenderSchema = () => {
        setState(`${Math.random()}`);
    }

    if (rootQuestion.code && (!answersAfterRootQuestion || !answersAfterRootQuestion[0]?.answer.length)) {
        console.log('связи не найдены')
    }

    // const tree = getTransformedRootQuestions(questions, answers, [rootQuestion]);
    // const result = getFlatQuestionsAndAnswers(tree);

    // const obj = {
    //     json: result
    // }

    // const sendScriptResult = async () => {
    //     const res = await axios<void>({
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         url: scriptUrl,
    //         data: JSON.stringify(obj),
    //     });
    //     console.log('res', res)
    // }

    // console.log('result', result)

    return rootQuestion.code ? (
        <div>
            {/* <button onClick={sendScriptResult}>Сохранить</button> */}
            <button onClick={() => console.log('result')}>Сохранить</button>
            {getQuestionAnswer({
                questions,
                answers,
                question: rootQuestion,
                rerenderSchema,
                isRoot: true,
                xmlId: xmlId
            })}
        </div>
    ) : <Loader isShow={!rootQuestion.code} />
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

    // const queryString = window.location.search;
    // console.log('queryString', queryString);
    // const urlParams = new URLSearchParams(queryString);
    // console.log('urlParams', urlParams);
    // console.log('urlParams.getscript', urlParams.get('script'));

    // const newMockQuest = newMock.question
    // const newMockAnsw = newMock.answer

    // const constQuestionsLinks: string[] = newMockAnsw.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)), []);
    // const rootQuestion = newMockQuest.filter(f => !constQuestionsLinks.find(x => f.code == x))[0];


    // const constQuestionsLinks: string[] = mockAnswers.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)), []);
    // const rootQuestion = mockQuestions.filter(f => !constQuestionsLinks.find(x => f.code == x))[0];

    // rootQuestion - вопроса которого нет в question_next
    // return <SchemaTree questions={mockQuestions} answers={mockAnswers} rootQuestion={rootQuestion} />;


    return (
        <ContextProvider>
            <SchemaTree />
        </ContextProvider>
    );
}