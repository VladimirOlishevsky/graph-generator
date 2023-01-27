import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade } from "@mui/material";
import { useState } from "react";
import { ActionType, ComponentType } from "./popupMenu/menuOptions";
import { ICreateQuestionOrAnswer, IQuestionDTO, IInternalAnswerDTO } from "./types";

interface IModalWrapeprProps {
    open: boolean,
    handleClose: () => void,
    handleSave?: (value: string) => void,
    
    // create
    handleCreate?: (value: ICreateQuestionOrAnswer) => void

    //edit
    question?: IQuestionDTO,
    answer?: IInternalAnswerDTO,
    
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
    handleSave,
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

    const conditionWord = question ? 'вопроса' : 'ответа';
    console.log(actionType)

    const [titleAddState, setTitleAddState] = useState(componentType === 'answer' ? '' : question?.name);
    const [descriptionAddState, setDescriptionAddState] = useState('');

    const [titleEditState, setTitleEditState] = useState(componentType === 'answer' ? question?.name : '');
    const [descriptionEditState, setDescriptionEditState] = useState(componentType === 'answer' ? answer?.name : question?.descr);

    const clearState = () => {
       setTitleAddState('')
       setDescriptionAddState('')
    //    setTitleEditState('')
    //    setDescriptionEditState('')
    }

    const deleteComponent = () => {
        return (
            <Box sx={style}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>Вы действительно хотите удалить?</Typography>
                    <div style={{ display: 'flex', gap: 10 }}>
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
                    <Typography>{`Добавление ${conditionWord}`}</Typography>
                    <TextField
                        onChange={(e) => setTitleAddState(e.target.value)}
                        label={`Название ${conditionWord}`}
                        variant="outlined"
                        value={titleAddState}
                    />
                    <TextField
                        onChange={(e) => setDescriptionAddState(e.target.value)}
                        label={`Текст ${conditionWord}`}
                        variant="outlined"
                        multiline={true}
                        rows={5}
                        value={descriptionAddState}
                    />
                    <Button
                        onClick={() => {
                            handleCreate?.({ title: titleAddState || '', description: descriptionAddState || '' })
                            handleClose();
                            clearState();
                        }}
                        variant="outlined"
                    >Добавить</Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                    >Отмена</Button>
                </div>
            </Box>
        )
    }

    const edit = () => {
        return (
            <Box
                component="form"
                sx={style}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>{`Добавление (редактирование) ${conditionWord}`}</Typography>
                    <TextField
                        onChange={(e) => setTitleEditState(e.target.value)}
                        disabled={componentType === 'answer'}
                        label={`Название ${conditionWord}`}
                        variant="outlined"
                        value={titleEditState}
                        required
                    />
                    <TextField
                        onChange={(e) => setDescriptionEditState(e.target.value)}
                        label={`Текст ${conditionWord}`}
                        variant="outlined"
                        multiline={true}
                        rows={5}
                        value={descriptionEditState}
                        required
                    />
                    <Button
                        onClick={() => {
                            handleSave?.(descriptionEditState || '')
                            handleClose();
                            // clearState(); - todo - ?????????
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
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
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