import { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { IAnswerDTO, IQuestionDTO } from "./types";
import { mockAnswers, mockQuestions, newMock } from "./mock";
import { Answer } from "./answer";
import { Question } from "./question";
import { ContextProvider } from "./context/provider";
import { getFlatQuestionsAndAnswers } from "../utils/getFlatQuestionsAndAnswers";
import { getTransformedRootQuestions } from "../utils/questionUtils";


const SchemaTree = (props: { rootQuestion: IQuestionDTO, questions: IQuestionDTO[], answers: IAnswerDTO[] }): JSX.Element => {
    const { questions, answers, rootQuestion } = props;
    const [_, setState] = useState('');

    const rerenderSchema = () => {
        setState(`${Math.random()}`);
    }

    const tree = getTransformedRootQuestions(questions, answers, [rootQuestion]);
    console.log('tree', tree)
    const result = getFlatQuestionsAndAnswers(tree);
    return <div>

        <button onClick={() => console.log(result)}>Сохранить</button>
        {getQuestionAnswer({
        questions,
        answers,
        question: rootQuestion,
        rerenderSchema,
        isRoot: true,
    })}
    </div>
}

interface IGetQuestionAnswer {
    questions: IQuestionDTO[],
    answers: IAnswerDTO[],
    question?: IQuestionDTO,
    rerenderSchema?: () => void,
    isRoot?: boolean,
}

const getQuestionAnswer = ({
    questions,
    answers,
    question,
    rerenderSchema,
    isRoot,
}: IGetQuestionAnswer): React.ReactNode => {
    console.log('question', question?.code)
    console.log('answers', answers)

    if (!question) return null;
    // todo - check
    let questionAnswer: IAnswerDTO = answers
        .filter(x => x.question === question.code)[0]

    console.log('questionAnswer', questionAnswer)    

    // todo - check
    // const questionAnswer: IAnswerDTO = answers
    //     .filter(x => x.question == question.code)[0]

    if (!questionAnswer) {
        questionAnswer = {
            answer: [],
            code: String(Math.random()),
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

    const newMockQuest = newMock.question
    const newMockAnsw = newMock.answer

    const constQuestionsLinks: string[] = newMockAnsw.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)), []);
    const rootQuestion = newMockQuest.filter(f => !constQuestionsLinks.find(x => f.code == x))[0];


    // const constQuestionsLinks: string[] = mockAnswers.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)), []);
    // const rootQuestion = mockQuestions.filter(f => !constQuestionsLinks.find(x => f.code == x))[0];

    // rootQuestion - вопроса которого нет в question_next
    // return <SchemaTree questions={mockQuestions} answers={mockAnswers} rootQuestion={rootQuestion} />;

    
    return (
        <ContextProvider>
            <SchemaTree questions={newMockQuest} answers={newMockAnsw} rootQuestion={rootQuestion} />
        </ContextProvider>
    );
}