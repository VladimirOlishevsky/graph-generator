import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade, Chip } from "@mui/material";
import React, { useState, useContext } from "react";
import { ActionType } from "./popupMenu/menuOptions";
import { ICreateQuestionOrAnswer, IQuestionDTO, IInternalAnswerDTO, IFieldsShowsResponseItem } from "./types";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { context } from "./context/context";
import styled from "@emotion/styled";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const StyledTextField = styled(TextField)(() => ({
    "& .MuiFormLabel-asterisk": {
        color: "red"
    }
}));

export interface IModalAnswerProps {
    open: boolean,
    handleClose: () => void,
    // create
    handleCreate?: (value: ICreateQuestionOrAnswer) => void
    //editComponent
    question?: IQuestionDTO,
    answer?: IInternalAnswerDTO,
    handleEdit?: (value: ICreateQuestionOrAnswer) => void,
    //delete
    handleDelete?: () => void,
    actionType?: ActionType,
}

interface IModalAnswerState {
    title?: string,
    description?: string,
    fieldsShows?: IFieldsShowsResponseItem[]
}

export const ModalAnswer = ({
    open,
    handleClose,
    handleCreate,
    handleEdit,
    question,
    answer,
    handleDelete,
    actionType,
}: IModalAnswerProps) => {

    if (!open) return null

    const { fieldsShows } = useContext(context);

    const condition = actionType === 'add';
    const conditionWord = condition ? 'вопроса' : 'ответа';

    const [textFieldsState, setTextFieldsState] = useState<IModalAnswerState>({
        title: condition ? '' : question?.name,
        description: condition ? '' : answer?.name,
        fieldsShows: []
    })

    const handleChangeQuestionTags = (e: React.SyntheticEvent<Element, Event>, value: IFieldsShowsResponseItem[]) => {
        e.preventDefault();
        setTextFieldsState({ ...textFieldsState, fieldsShows: value });
    };

    const deleteComponent = () => {
        return (
            <Box sx={style}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>{`Вы действительно хотите удалить ответ?`}</Typography>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <Button onClick={handleDelete} variant="outlined">Да</Button>
                        <Button onClick={handleClose} variant="outlined">Нет</Button>
                    </div>
                </div>
            </Box>
        )
    }

    const addEditComponent = () => {
        return (
            <Box
                component="form"
                sx={style}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>{`${condition ? 'Добавление' : 'Редактирование'} ${conditionWord}`}</Typography>
                    <StyledTextField
                        disabled={actionType === 'edit'}
                        onChange={(e) => setTextFieldsState({ ...textFieldsState, title: e.target.value })}
                        label={`Название ${conditionWord}`}
                        variant="outlined"
                        value={textFieldsState.title || ''}
                        required
                    />
                    <StyledTextField
                        onChange={(e) => setTextFieldsState({ ...textFieldsState, description: e.target.value })}
                        label={`Текст ${conditionWord}`}
                        variant="outlined"
                        multiline={true}
                        rows={5}
                        value={textFieldsState.description || ''}
                        required
                    />
                    {actionType === 'add' && (
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={fieldsShows}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={handleChangeQuestionTags}
                            renderOption={(props, option, { selected, index }) => (
                                <li {...props} key={index}>
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Выберите теги" />
                            )}
                        />
                    )}
                    <Button
                        disabled={!textFieldsState.title || !textFieldsState.description}
                        onClick={() => {
                            (condition ? handleCreate : handleEdit)?.(
                                {
                                    title: textFieldsState.title || '',
                                    description: textFieldsState.description || '',
                                    fieldsShowsIds: textFieldsState.fieldsShows?.map(el => el.code)
                                }
                            )
                            handleClose();
                        }}
                        variant="outlined"
                    >
                        Добавить
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                        variant="outlined"
                    >
                        Отмена
                    </Button>
                </div>
            </Box>
        )
    }

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                {actionType === 'delete' ? deleteComponent() : addEditComponent()}
            </Fade>
        </ModalComponent>
    )
}