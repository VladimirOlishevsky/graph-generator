import { FC, useRef, useState, useMemo } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { IAnswer, IAnswerDTO, ICreateQuestionOrAnswer, IInternalAnswerDTO, IQuestion, IQuestionDTO } from "./types";
import { mockAnswers, mockQuestions } from "./mock";
import { Answer } from "./answer";
import { Question } from "./question";
import Collapse from "@mui/material/Collapse/Collapse";


const SchemaTree = (props: { rootQuestion: IQuestionDTO, questions: IQuestionDTO[], answers: IAnswerDTO[] }): JSX.Element => {
    const { questions, answers, rootQuestion } = props;
    const [_, setState] = useState('');

    const rerenderSheema = () => {
        setState(`${Math.random()}`);
    }

    console.log('questions', questions)
    console.log('answers', answers)

    return <div>{getQuestionAnswer(questions, answers, rootQuestion, rerenderSheema, true)}</div>
}


const getQuestionAnswer = (questions: IQuestionDTO[], answers: IAnswerDTO[], question?: IQuestionDTO, rerendeSchema?: () => void, isRoot?: boolean): React.ReactNode => {

    //     const [checked, setChecked] = useState(true);

    //   const handleChangeCollapse = () => {
    //     setChecked((prev) => !prev);
    //   };

    //   console.log('checked', checked)

    if (!question) return null

    const questionAnswer: IAnswerDTO = answers
        .filter(x => x.question == question.code)[0]

    const quest = <Question
        questionAnswer={questionAnswer}
        question={question}
        rerenderSheema={rerendeSchema}
        questions={questions}
        answers={answers}
    // handleChangeCollapse={handleChangeCollapse}
    />
    const answ = questionAnswer?.answer.map((f, index) => {
        return <TreeNode key={index} label={
            <Answer
                questions={questions}
                answers={answers}
                answerVariant={f}
                rerenderSheema={rerendeSchema}
                questionAnswer={questionAnswer}
                index={index}
                questionBefore={question}
            />}>

            {!f.question_next ? null : (
                getQuestionAnswer(questions, answers, questions.find(x => x.code == f.question_next), rerendeSchema)
            )}

        </TreeNode>
    })

    return isRoot ? (
        <Tree
            lineHeight='20px'
            nodePadding='5px'
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<Question
                questionAnswer={questionAnswer}
                question={question}
                rerenderSheema={rerendeSchema}
                questions={questions}
                answers={answers}
                isRootQuestion={true}
            />}
        >
            {answ}
        </Tree>
    ) : (
        // <TreeNode label={quest}>
        //     {!checked ? <Collapse in={checked}>
        //         {answ}
        //     </Collapse> : answ}
        // </TreeNode>

        <TreeNode label={quest}>
            {answ}
        </TreeNode>
    )
}


export const Demo = () => {
    const constQuestionsLinks: string[] = mockAnswers.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)), []);
    const rootQuestion = mockQuestions.filter(f => !constQuestionsLinks.find(x => f.code == x))[0];

    return <SchemaTree questions={mockQuestions} answers={mockAnswers} rootQuestion={rootQuestion} />;
}