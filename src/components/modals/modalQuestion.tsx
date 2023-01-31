import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade, Chip } from "@mui/material";
import React, { useState, useContext } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { context } from "../context/context";
import { ActionType } from "../popupMenu/menuOptions";
import { ICreateEditQuestionAnswer, IQuestionDTO, IFieldsShowsResponseItem } from "../types";
import { modalStyle, StyledTextField } from "./constants";

export interface IModalQuestionProps {
    open: boolean,
    handleClose: () => void,
    // create
    handleCreate?: (value: ICreateEditQuestionAnswer) => void
    //editComponent
    question?: IQuestionDTO,
    handleEdit?: (value: ICreateEditQuestionAnswer) => void,
    //delete
    handleDelete?: () => void,
    actionType?: ActionType,
}

export const ModalQuestion = ({
    open,
    handleClose,
    handleCreate,
    handleEdit,
    question,
    handleDelete,
    actionType,
}: IModalQuestionProps) => {

    if(!open) return null

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

    const [questionTags, setQuestionTags] = useState<IFieldsShowsResponseItem[]>(actionType === 'add' ? [] : getFieldsShows());
    const handleChangeQuestionTags = (e: React.SyntheticEvent<Element, Event>, value: IFieldsShowsResponseItem[]) => {
        e.preventDefault();
        setQuestionTags(value);
    };

    const deleteComponent = () => {
        return (
            <div>
                <Box sx={modalStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <Typography>{`Вы действительно хотите удалить вопрос?`}</Typography>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <Button onClick={handleDelete} variant="outlined">Да</Button>
                            <Button onClick={handleClose} variant="outlined">Нет</Button>
                        </div>
                    </div>
                </Box>
            </div>

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Typography>{`${condition ? 'Добавление' : 'Редактирование'} ${conditionWord}`}</Typography>
                    <StyledTextField
                        disabled={condition}
                        onChange={(e) => setTextFieldsState({ ...textFieldsState, title: e.target.value})}
                        label={`Название ${conditionWord}`}
                        variant="outlined"
                        value={textFieldsState.title || ''}
                        required
                    />
                    <StyledTextField
                        onChange={(e) => setTextFieldsState({ ...textFieldsState, description: e.target.value})}
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
                            (condition ? handleCreate : handleEdit)?.(
                                {
                                    title: textFieldsState.title || '',
                                    description: textFieldsState.description || '',
                                    fieldsShowsIds: questionTags.map(el => el.code)
                                }
                            )
                            handleClose();
                        }}
                        variant="outlined"
                    >
                        {condition ? 'Добавить' : 'Сохранить'}
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