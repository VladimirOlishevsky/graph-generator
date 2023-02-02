import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade } from "@mui/material";
import React, { useState, useContext } from "react";
import { ActionType } from "../popupMenu/menuOptions";
import { ICreateEditQuestionAnswer, IQuestionDTO, IInternalAnswerDTO, IResponseFields } from "../types";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { context } from "../context/context";
import { modalContentClasses, modalStyle, StyledModalContentComponent, StyledTextField } from "./constants";

export interface IModalAnswerProps {
    open: boolean,
    handleCloseModal: () => void,
    handleCreateQuestion: (value: ICreateEditQuestionAnswer) => void
    question?: IQuestionDTO,
    answer?: IInternalAnswerDTO,
    handleEditAnswer?: (value: ICreateEditQuestionAnswer) => void,
    handleDeleteAnswer?: () => void,
    actionType?: ActionType,
}

interface IModalAnswerState {
    title?: string,
    description?: string,
    fieldsShows?: IResponseFields[]
}

export const ModalAnswer = ({
    open,
    handleCloseModal,
    handleCreateQuestion,
    handleEditAnswer,
    question,
    answer,
    handleDeleteAnswer,
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

    const handleChangeQuestionTags = (e: React.SyntheticEvent<Element, Event>, value: IResponseFields[]) => {
        e.preventDefault();
        setTextFieldsState({ ...textFieldsState, fieldsShows: value });
    };

    const deleteComponent = () => {
        return (
            <Box sx={modalStyle}>
                <StyledModalContentComponent>
                    <Typography>{`Вы действительно хотите удалить ответ?`}</Typography>
                    <div className={modalContentClasses.buttonWrapper}>
                        <Button onClick={handleDeleteAnswer} variant="outlined">Да</Button>
                        <Button onClick={handleCloseModal} variant="outlined">Нет</Button>
                    </div>
                </StyledModalContentComponent>
            </Box>
        )
    }

    const addEditComponent = () => {
        return (
            <Box
                component="form"
                sx={modalStyle}
                noValidate
                autoComplete="off"
            >
                <StyledModalContentComponent>
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
                            (condition ? handleCreateQuestion : handleEditAnswer)?.(
                                {
                                    title: textFieldsState.title || '',
                                    description: textFieldsState.description || '',
                                    fieldsShowsIds: textFieldsState.fieldsShows?.map(el => el.code)
                                }
                            )
                            handleCloseModal();
                        }}
                        variant="outlined"
                    >
                       {condition ? 'Добавить' : 'Сохранить'}
                    </Button>
                    <Button
                        onClick={handleCloseModal}
                        variant="outlined"
                    >
                        Отмена
                    </Button>
                </StyledModalContentComponent>
            </Box>
        )
    }

    return (
        <ModalComponent
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <Fade in={open}>
                {actionType === 'delete' ? deleteComponent() : addEditComponent()}
            </Fade>
        </ModalComponent>
    )
}