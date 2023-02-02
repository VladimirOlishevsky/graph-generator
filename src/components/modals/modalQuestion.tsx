import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade, Chip } from "@mui/material";
import React, { useState, useContext } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { context } from "../context/context";
import { ActionType } from "../popupMenu/menuOptions";
import { ICreateEditQuestionAnswer, IQuestionDTO, IResponseFields } from "../types";
import { modalContentClasses, modalStyle, StyledModalContentComponent, StyledTextField } from "./constants";

export interface IModalQuestionProps {
    open: boolean,
    handleCloseModal: () => void,
    handleCreateAnswer?: (value: ICreateEditQuestionAnswer) => void
    question?: IQuestionDTO,
    handleEditQuestion?: (value: ICreateEditQuestionAnswer) => void,
    handleDeleteQuestion?: () => void,
    actionType?: ActionType,
}

export const ModalQuestion = ({
    open,
    handleCloseModal,
    handleCreateAnswer,
    handleEditQuestion,
    question,
    handleDeleteQuestion,
    actionType,
}: IModalQuestionProps) => {

    if (!open) return null

    const condition = actionType === 'add';
    const conditionWord = condition ? 'ответа' : 'вопроса';

    const [textFieldsState, setTextFieldsState] = useState({
        title: condition ? question?.descr : question?.name,
        description: condition ? '' : question?.descr
    })

    const { fieldsShows } = useContext(context);
    // todo - add in upper component
    const getFieldsShows = () => {
        return fieldsShows.filter(el => question?.fields_shows.some(value => value === el.code))
    }

    const [questionTags, setQuestionTags] = useState<IResponseFields[]>(actionType === 'add' ? [] : getFieldsShows());
    const handleChangeQuestionTags = (e: React.SyntheticEvent<Element, Event>, value: IResponseFields[]) => {
        e.preventDefault();
        setQuestionTags(value);
    };

    const deleteComponent = () => {
        return (
            <Box sx={modalStyle}>
                <StyledModalContentComponent>
                    <Typography>{`Вы действительно хотите удалить вопрос?`}</Typography>
                    <div className={modalContentClasses.buttonWrapper}>
                        <Button onClick={handleDeleteQuestion} variant="outlined">Да</Button>
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
                        disabled={condition}
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
                    {actionType === 'edit' && (
                        <div>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={fieldsShows}
                                value={questionTags}
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
                        </div>

                    )}
                    <Button
                        disabled={!textFieldsState.title || !textFieldsState.description}
                        onClick={() => {
                            (condition ? handleCreateAnswer : handleEditQuestion)?.(
                                {
                                    title: textFieldsState.title || '',
                                    description: textFieldsState.description || '',
                                    fieldsShowsIds: questionTags.map(el => el.code)
                                }
                            )
                            handleCloseModal();
                        }}
                        variant="outlined"
                    >
                        {condition ? 'Добавить' : 'Сохранить'}
                    </Button>
                    <Button
                        onClick={() => {
                            handleCloseModal();
                        }}
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