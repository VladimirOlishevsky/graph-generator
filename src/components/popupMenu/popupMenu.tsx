import { ICreateQuestionOrAnswer, IInternalAnswerDTO, IQuestionDTO } from "../types"
import { IOption, ActionType, ComponentType } from "./menuOptions"
import React, { useState, useRef } from 'react'
import { IconButton, Menu, MenuItem } from "@mui/material";
// import { styled } from "@mui/material/styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal } from "../modal";


// const IconButtonStyled = styled(IconButton)(() => ({
//     padding: 0,
//     "&:focus": {
//         outline: 'none',
//     }
// }));

interface ILongMenu {
    options: IOption[],
    open: boolean,
    anchorEl: null | HTMLElement
    handleClick?: (event: React.MouseEvent<HTMLElement>) => void
    handleClose: () => void

    handleAdd?: () => void
    handleDelete?: () => void

    // create
    handleCreateQuestion?: (value: ICreateQuestionOrAnswer) => void
    createAnswer?: (value: ICreateQuestionOrAnswer) => void

    // edit
    question?: IQuestionDTO,
    answer?: IInternalAnswerDTO,
    editQuestion?: (value: ICreateQuestionOrAnswer) => void,
    handleEditAnswer?: (value: ICreateQuestionOrAnswer) => void,

    // delete
    deleteQuestion?: () => void,
    deleteAnswer?: () => void,

    componentType: ComponentType
}


export const PopupMenu = ({
    options,
    open,
    anchorEl,
    handleClick,
    handleClose,

    handleAdd,
    handleDelete,

    // create
    handleCreateQuestion,
    createAnswer,

    // edit
    question,
    answer,
    editQuestion,
    handleEditAnswer,

    // delete - ok?
    deleteQuestion,
    deleteAnswer,

    componentType

}: ILongMenu) => {

    const [openModal, setOpenModal] = useState(false);
    const activeTypeRef = useRef<ActionType>()

    const buttonStyle = {
        padding: 0,
        "&:focus": {
            outline: 'none',
        }
    };

    return (
        <>
            <IconButton
                sx={buttonStyle}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    option.type !== 'empty' && <MenuItem key={option.type}
                        onClick={() => {
                            activeTypeRef.current = option.type;
                            setOpenModal(true);
                        }}>
                        {option.value}
                    </MenuItem>
                ))}
            </Menu>
            <Modal
                open={openModal}
                handleClose={() => {
                    setOpenModal(false)
                    handleClose();
                }}
                handleCreate={handleCreateQuestion ?? createAnswer}
                handleSave={editQuestion ?? handleEditAnswer}
                handleDelete={deleteAnswer ?? deleteQuestion}
                actionType={activeTypeRef.current}

                question={question}
                answer={answer}
                componentType={componentType}
            />
        </>
    );
}
