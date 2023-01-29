import { IOption, ActionType } from "./menuOptions"
import React from 'react'
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IPopupMenu {
    options: IOption[],
    open: boolean,
    anchorEl: null | HTMLElement
    handleOpenMenu?: (event: React.MouseEvent<HTMLElement>) => void
    handleCloseMenu: () => void
    activeTypeRef: React.MutableRefObject<ActionType | undefined>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}


export const PopupMenu = ({
    options,
    open,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,

    activeTypeRef,
    setOpenModal
}: IPopupMenu) => {

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
                onClick={handleOpenMenu}
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
                onClose={handleCloseMenu}
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
        </>
    );
}
