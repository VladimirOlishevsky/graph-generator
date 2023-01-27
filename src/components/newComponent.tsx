import { FC, useRef, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { deleteTreeNodes } from "../utils/deleteTreeNodes";
import { IAnswer, IAnswerDTO, ICreateQuestionOrAnswer, IInternalAnswerDTO, IQuestion, IQuestionDTO } from "./types";
import { mockAnswers, mockQuestions } from "./mock";
import { getTransformedRootQuestions } from "../utils/questionUtils";
import { feelTreeAnswers } from "../utils/answerUtils";
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem, Backdrop, Box, Modal, Fade, TextField, Typography, Button } from '@mui/material'
import { IOption, ActionType, ComponentType } from "./popupMenu/menuOptions";
import { Answer } from "./answer";
import { Question } from "./question";


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
    if (!question) return null
    const questionAnswer: IAnswerDTO = answers
        .filter(x => x.question == question.code)[0]

    const quest = <Question
        questionAnswer={questionAnswer}
        question={question}
        rerenderSheema={rerendeSchema}
        questions={questions}
        answers={answers}
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
            {!f.question_next ? null : getQuestionAnswer(questions, answers, questions.find(x => x.code == f.question_next), rerendeSchema)}
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

// interface IModalWrapeprProps {
//     open: boolean,
//     handleClose: () => void,
//     handleSave?: (value: string) => void,
    
//     // create
//     handleCreate?: (value: ICreateQuestionOrAnswer) => void

//     //edit
//     question?: IQuestionDTO,
//     answer?: IInternalAnswerDTO,
    
//     //delete
//     handleDelete?: () => void,
//     actionType?: ActionType,
//     componentType?: ComponentType
// }

// export const ModalWrapper = ({
//     open,
//     handleClose,

//     // create
//     handleCreate,

//     //edit
//     handleSave,
//     question,
//     answer,

//     //delete
//     handleDelete,
//     actionType,
//     componentType

// }: IModalWrapeprProps) => {
//     const style = {
//         position: 'absolute' as 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     const conditionWord = question ? 'вопроса' : 'ответа';
//     console.log(actionType)

//     const [titleAddState, setTitleAddState] = useState(componentType === 'answer' ? '' : question?.name);
//     const [descriptionAddState, setDescriptionAddState] = useState('');

//     const [titleEditState, setTitleEditState] = useState(componentType === 'answer' ? question?.name : '');
//     const [descriptionEditState, setDescriptionEditState] = useState(componentType === 'answer' ? answer?.name : question?.descr);

//     const clearState = () => {
//        setTitleAddState('')
//        setDescriptionAddState('')
//     //    setTitleEditState('')
//     //    setDescriptionEditState('')
//     }

//     const deleteComponent = () => {
//         return (
//             <Box sx={style}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <Typography>Вы действительно хотите удалить?</Typography>
//                     <div style={{ display: 'flex', gap: 10 }}>
//                         <Button onClick={handleDelete} variant="outlined">Да</Button>
//                         <Button onClick={handleClose} variant="outlined">Нет</Button>
//                     </div>
//                 </div>
//             </Box>
//         )
//     }

//     const add = () => {
//         return (
//             <Box
//                 component="form"
//                 sx={style}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <Typography>{`Добавление ${conditionWord}`}</Typography>
//                     <TextField
//                         onChange={(e) => setTitleAddState(e.target.value)}
//                         label={`Название ${conditionWord}`}
//                         variant="outlined"
//                         value={titleAddState}
//                     />
//                     <TextField
//                         onChange={(e) => setDescriptionAddState(e.target.value)}
//                         label={`Текст ${conditionWord}`}
//                         variant="outlined"
//                         multiline={true}
//                         rows={5}
//                         value={descriptionAddState}
//                     />
//                     <Button
//                         onClick={() => {
//                             handleCreate?.({ title: titleAddState || '', description: descriptionAddState || '' })
//                             handleClose();
//                             clearState();
//                         }}
//                         variant="outlined"
//                     >Добавить</Button>
//                     <Button
//                         onClick={handleClose}
//                         variant="outlined"
//                     >Отмена</Button>
//                 </div>
//             </Box>
//         )
//     }

//     const edit = () => {
//         return (
//             <Box
//                 component="form"
//                 sx={style}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <Typography>{`Добавление (редактирование) ${conditionWord}`}</Typography>
//                     <TextField
//                         onChange={(e) => setTitleEditState(e.target.value)}
//                         disabled={componentType === 'answer'}
//                         label={`Название ${conditionWord}`}
//                         variant="outlined"
//                         value={titleEditState}
//                         required
//                     />
//                     <TextField
//                         onChange={(e) => setDescriptionEditState(e.target.value)}
//                         label={`Текст ${conditionWord}`}
//                         variant="outlined"
//                         multiline={true}
//                         rows={5}
//                         value={descriptionEditState}
//                         required
//                     />
//                     <Button
//                         onClick={() => {
//                             handleSave?.(descriptionEditState || '')
//                             handleClose();
//                             // clearState(); - todo - ?????????
//                         }}
//                         variant="outlined"
//                     >Сохранить</Button>
//                     <Button
//                         onClick={handleClose}
//                         variant="outlined"
//                     >Отмена</Button>
//                 </div>
//             </Box>
//         )
//     }

//     const currentComponent = () => {
//         switch (actionType) {
//             case 'add':
//                 return add()
//             case 'delete':
//                 return deleteComponent()
//             case 'edit':
//                 return edit()
//             default:
//                 return <div></div>
//         }
//     }

//     return (
//         <Modal
//             aria-labelledby="transition-modal-title"
//             aria-describedby="transition-modal-description"
//             open={open}
//             onClose={handleClose}
//             closeAfterTransition
//         >
//             <Fade in={open}>
//                 {currentComponent()}
//             </Fade>
//         </Modal>
//     )
// }