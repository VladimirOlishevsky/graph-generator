// import { Box, Typography, Button, TextField, Modal as ModalComponent, Fade, Chip } from "@mui/material";
// import React, { useState, useContext } from "react";
// import { ActionType, ComponentType } from "./popupMenu/menuOptions";
// import { ICreateQuestionOrAnswer, IQuestionDTO, IInternalAnswerDTO, IFieldsShowsResponseItem } from "./types";
// import Checkbox from "@mui/material/Checkbox/Checkbox";
// import Autocomplete from '@mui/material/Autocomplete';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { context } from "./context/context";
// import styled from "@emotion/styled";

// const StyledTextField = styled(TextField)(() => ({
//     "& .MuiFormLabel-asterisk": {
//       color: "red"
//     }
//   }));

// export interface IModalWrapeprProps {
//     open: boolean,
//     handleClose: () => void,

//     // create
//     handleCreate?: (value: ICreateQuestionOrAnswer) => void

//     //editComponent
//     question?: IQuestionDTO,
//     answer?: IInternalAnswerDTO,
//     handleEdit?: (value: ICreateQuestionOrAnswer) => void,

//     //delete
//     handleDelete?: () => void,
//     actionType?: ActionType,
//     componentType?: ComponentType
// }


// export const Modal = ({
//     open,
//     handleClose,

//     // create
//     handleCreate,

//     //editComponent
//     handleEdit,
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
//         borderRadius: 3,
//         boxShadow: 24,
//         p: 4,
//     };

//     const { fieldsShows } = useContext(context);

//     console.log('question', question)
//     console.log("actionType === 'add' && componentType === 'answer", actionType === 'add' && componentType === 'answer')

//     const getFieldsShowsId = () => {
//         return fieldsShows.filter(el => question?.fields_shows.some(value => value === el.code))
//     }

//     const [questionTags, setQuestionTags] = useState<IFieldsShowsResponseItem[]>(actionType === 'add' && componentType === 'answer' ? [] : getFieldsShowsId());
//     const handleChangeQuestionTags = (e: React.SyntheticEvent<Element, Event>, value: IFieldsShowsResponseItem[]) => {
//         e.preventDefault();
//         setQuestionTags(value);
//     };

//     const conditioAddWord = actionType === 'add' && componentType === 'answer' ? 'вопроса' : 'ответа';
//     const conditionEditWord = question ? 'вопроса' : 'ответа';

//     const [addState, setAddState] = useState({
//         title: componentType === 'question' ? question?.name : '',
//         description: ""
//     });

//     const [editState, setEditState] = useState({
//         title: componentType === 'answer' ? question?.descr : question?.name,
//         description: componentType === 'answer' ? answer?.name : question?.descr
//     });

//     const clearAddState = () => {
//         setAddState({ ...addState, description: '' });
//         setQuestionTags([])
//     }


//     const deleteComponent = () => {
//         return (
//             <Box sx={style}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <Typography>{`Вы действительно хотите удалить?`}</Typography>
//                     <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//                         <Button onClick={handleDelete} variant="outlined">Да</Button>
//                         <Button onClick={handleClose} variant="outlined">Нет</Button>
//                     </div>
//                 </div>
//             </Box>
//         )
//     }

//     const addingTags = getFieldsShowsId().map(el => el.code);

//     const addComponent = () => {
//         return (
//             <Box
//                 component="form"
//                 sx={style}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <Typography>{`Добавление ${conditioAddWord}`}</Typography>
//                     <StyledTextField
//                         disabled={componentType === 'question'}
//                         onChange={(e) => setAddState({ ...addState, title: e.target.value })}
//                         label={`Название ${conditioAddWord}`}
//                         variant="outlined"
//                         value={addState.title || ''}
//                         required
//                     />
//                     <StyledTextField
//                         onChange={(e) => setAddState({ ...addState, description: e.target.value })}
//                         label={`Текст ${conditioAddWord}`}
//                         variant="outlined"
//                         multiline={true}
//                         rows={5}
//                         value={addState.description || ''}
//                         required
//                     />
//                     {componentType === 'answer' && (
//                         <Autocomplete
//                             multiple
//                             id="checkboxes-tags-demo"
//                             options={fieldsShows}
//                             disableCloseOnSelect
//                             getOptionLabel={(option) => option.name}
//                             onChange={handleChangeQuestionTags}
//                             renderOption={(props, option, { selected, index }) => (
//                                 <li {...props} key={index}>
//                                     <Checkbox
//                                         icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
//                                         checkedIcon={<CheckBoxIcon fontSize="small" />}
//                                         style={{ marginRight: 8 }}
//                                         checked={selected}
//                                     />
//                                     {option.name}
//                                 </li>
//                             )}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Выберите теги" />
//                             )}
//                         />
//                     )}
//                     <Button
//                         disabled={!addState.title || !addState.description}
//                         onClick={() => {
//                             console.log('here', questionTags)
//                             handleCreate?.({
//                                 title: addState.title || '',
//                                 description: addState.description,
//                                 fieldsShowsIds: questionTags.map(el => el.code)
//                             })
//                             handleClose();
//                             clearAddState()
//                         }}
//                         variant="outlined"
//                     >
//                         Добавить
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             handleClose();
//                         }}
//                         variant="outlined"
//                     >
//                         Отмена
//                     </Button>
//                 </div>
//             </Box>
//         )
//     }

//     const editComponent = () => {
//         return (
//             <Box
//                 component="form"
//                 sx={style}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <Typography>{`Редактирование ${conditionEditWord}`}</Typography>
//                     <StyledTextField
//                         onChange={(e) => setEditState({ ...editState, title: e.target.value })}
//                         disabled={componentType === 'answer'}
//                         label={`Название ${conditionEditWord}`}
//                         variant="outlined"
//                         value={editState.title}
//                         required
//                     />
//                     <StyledTextField
//                         onChange={(e) => setEditState({ ...editState, description: e.target.value })}
//                         label={`Текст ${conditionEditWord}`}
//                         variant="outlined"
//                         multiline={true}
//                         rows={5}
//                         value={editState.description}
//                         required
//                     />
//                     {componentType === 'question' && (
//                         <Autocomplete
//                             multiple
//                             id="checkboxes-tags-demo"
//                             options={fieldsShows}
//                             value={questionTags}
//                             disableCloseOnSelect
//                             getOptionLabel={(option) => option.name}
//                             onChange={handleChangeQuestionTags}
//                             renderOption={(props, option, { selected, index }) => (
//                                 <li {...props} key={index}>
//                                     <Checkbox
//                                         icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
//                                         checkedIcon={<CheckBoxIcon fontSize="small" />}
//                                         style={{ marginRight: 8 }}
//                                         checked={selected}
//                                     />
//                                     {option.name}
//                                 </li>
//                             )}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Выберите теги" />
//                             )}
//                         />
//                     )}
//                     <Button
//                         disabled={!editState.title || !editState.description}
//                         onClick={() => {
//                             handleEdit?.({
//                                 title: editState.title || '',
//                                 description: editState.description || '',
//                                 fieldsShowsIds: questionTags.map(el => el.code)
//                             })
//                             handleClose();
//                         }}
//                         variant="outlined"
//                     >
//                         Сохранить
//                     </Button>
//                     <Button
//                         onClick={handleClose}
//                         variant="outlined"
//                     >
//                         Отмена
//                     </Button>
//                 </div>
//             </Box>
//         )
//     }

//     const currentComponent = () => {
//         switch (actionType) {
//             case 'add':
//                 return addComponent()
//             case 'delete':
//                 return deleteComponent()
//             case 'edit':
//                 return editComponent()
//             default:
//                 return <div></div>
//         }
//     }

//     return (
//         <ModalComponent
//             open={open}
//             onClose={handleClose}
//             closeAfterTransition
//         >
//             <Fade in={open}>
//                 {currentComponent()}
//             </Fade>
//         </ModalComponent>
//     )
// }