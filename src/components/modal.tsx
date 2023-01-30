import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade, Chip } from "@mui/material";
import React, { useState, useContext } from "react";
import { ActionType, ComponentType } from "./popupMenu/menuOptions";
import { ICreateQuestionOrAnswer, IQuestionDTO, IInternalAnswerDTO, IFieldsShowsResponseItem } from "./types";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { context } from "./context/context";


export interface IModalWrapeprProps {
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

    const { fieldsShows } = useContext(context);

    const getFieldsShowsId = () => {
        return fieldsShows.filter(el => question?.fields_shows.some(value => value === el.code))
    }

    const [questionTags, setQuestionTags] = useState<IFieldsShowsResponseItem[]>(getFieldsShowsId());
    const handleChangeQuestionTags = (e: React.SyntheticEvent<Element, Event>, value: IFieldsShowsResponseItem[]) => {
        e.preventDefault();
        setQuestionTags(value);
    };

    const conditioAddWord = question ? 'ответа' : 'вопроса';
    const conditionEditWord = question ? 'вопроса' : 'ответа';

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

    const addingTags = questionTags.map(el => el.code)

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
                    {componentType === 'answer' && (
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={fieldsShows}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={handleChangeQuestionTags}
                            renderOption={(props, option, { selected }) => (
                                <li key={option.code} {...props}>
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
                        onClick={() => {
                            handleCreate?.({
                                title: addState.title || '',
                                description: addState.description,
                                fieldsShowsIds: addingTags
                            })
                            handleClose();
                            clearAddState()
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
                    {componentType === 'question' && (
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={fieldsShows}
                            value={questionTags}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={handleChangeQuestionTags}
                            renderOption={(props, option, { selected }) => (
                                <li key={option.code} {...props}>
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
                        onClick={() => {
                            handleEdit?.({
                                title: editState.title || '',
                                description: editState.description || '',
                                fieldsShowsIds: questionTags.map(el => el.code)
                            })
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

{/* <Select<string[]>
                        labelId="demo-mutiple-chip-checkbox-label"
                        id="demo-mutiple-chip-checkbox"
                        multiple
                        value={questionTags}
                        onChange={handleChangeQuestionTags}
                        IconComponent={KeyboardArrowDownIcon}
                        renderValue={(selected) => (
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                            }}>
                                {selected.map((value) => (
                                    <Chip
                                        sx={chipStyles}
                                        key={value}
                                        label={value}
                                        clickable
                                        deleteIcon={
                                            <CloseIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                        style={{
                                            margin: 2,
                                            backgroundColor: "lightGray",
                                            // color: '#fff'
                                        }}
                                        onDelete={(e) => handleDeleteChip(e, value)}
                                    // onMouseDown={(event) => event.stopPropagation()}
                                    />
                                ))}
                            </div>
                        )}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name} onClick={() => console.log('here')}>
                                <Checkbox checked={questionTags.includes(name)} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}

                    </Select> */}