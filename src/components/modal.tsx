import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade } from "@mui/material";
import React,{ useState } from "react";
import { ActionType, ComponentType } from "./popupMenu/menuOptions";
import { ICreateQuestionOrAnswer, IQuestionDTO, IInternalAnswerDTO } from "./types";

interface IModalWrapeprProps {
    open: boolean,
    handleClose: () => void,
    
    // create
    handleCreate?: (value: ICreateQuestionOrAnswer) => void

    //edit
    question?: IQuestionDTO,
    answer?: IInternalAnswerDTO,
    handleEdit?: (value: ICreateQuestionOrAnswer) => void,

    //delete
    handleDelete?: () => void,
    actionType?: ActionType,
    componentType?: ComponentType
}


export const Modal = ({
    open,
    handleClose,

    // create
    handleCreate,

    //edit
    handleEdit,
    question,
    answer,

    //delete
    handleDelete,
    actionType,
    componentType

}: IModalWrapeprProps) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const conditioAddWord = question ? 'ответа' : 'вопроса';
    const conditionEditWord = question ? 'вопроса' : 'ответа';


    const cond = actionType === 'add' 

    console.log('question', question)
    console.log('componentType', componentType)

    const [addState, setAddState] = useState({
        title: componentType === 'question' ? question?.name : '',
        description: ""
    });

    const [editState, setEditState] = useState({
        title: componentType === 'answer' ? question?.descr : question?.name,
        description: componentType === 'answer' ? answer?.name : question?.descr
    });

    const clearAddState = () => setAddState({ ...addState, description: '' })

    const deleteComponent = () => {
        return (
            <Box sx={style}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>{`Вы действительно хотите удалить?`}</Typography>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <Button onClick={handleDelete} variant="outlined">Да</Button>
                        <Button onClick={handleClose} variant="outlined">Нет</Button>
                    </div>
                </div>
            </Box>
        )
    }

    const add = () => {
        return (
        <Box
            component="form"
            sx={style}
            noValidate
            autoComplete="off"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Typography>{`Добавление ${conditioAddWord}`}</Typography>
                <TextField
                    disabled={componentType === 'question'}
                    onChange={(e) => setAddState({ ...addState, title: e.target.value })}
                    label={`Название ${conditioAddWord}`}
                    variant="outlined"
                    value={addState.title || ''}
                />
                <TextField
                    onChange={(e) => setAddState({ ...addState, description: e.target.value })}
                    label={`Текст ${conditionEditWord}`}
                    variant="outlined"
                    multiline={true}
                    rows={5}
                    value={addState.description || ''}
                />
                <Button
                    onClick={() => {
                        handleCreate?.({ title: addState.title || '', description: addState.description })
                        handleClose();
                        clearAddState()
                    }}
                    variant="outlined"
                >Добавить</Button>
                <Button
                    onClick={() => {
                        handleClose();
                        // clearState()
                    }}
                    variant="outlined"
                >Отмена</Button>
            </div>
        </Box>
    )}

    const edit = () => {
        return (
            <Box
                component="form"
                sx={style}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>{`Редактирование ${conditionEditWord}`}</Typography>
                    <TextField
                        onChange={(e) => setEditState({ ...editState, title: e.target.value })}
                        disabled={componentType === 'answer'}
                        label={`Название ${conditionEditWord}`}
                        variant="outlined"
                        value={editState.title}
                        required
                    />
                    <TextField
                        onChange={(e) => setEditState({ ...editState, description: e.target.value })}
                        label={`Текст ${conditionEditWord}`}
                        variant="outlined"
                        multiline={true}
                        rows={5}
                        value={editState.description}
                        required
                    />
                    <Button
                        onClick={() => {
                            handleEdit?.({ title: editState.title || '', description: editState.description || '' })
                            handleClose();
                        }}
                        variant="outlined"
                    >Сохранить</Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                    >Отмена</Button>
                </div>
            </Box>
        )
    }

    const currentComponent = () => {
        switch (actionType) {
            case 'add':
                return add()
            case 'delete':
                return deleteComponent()
            case 'edit':
                return edit()
            default:
                return <div></div>
        }
    }

    return (
        <ModalComponent
            // aria-labelledby="transition-modal-title"
            // aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                {currentComponent()}
            </Fade>
        </ModalComponent>
    )
}