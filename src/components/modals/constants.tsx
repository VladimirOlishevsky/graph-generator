import { TextField } from "@mui/material";
import styled from "@emotion/styled";

export const modalStyle = {
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

export const StyledTextField = styled(TextField)(() => ({
    "& .MuiFormLabel-asterisk": {
        color: "red"
    }
}));

const prefix = 'ModalContent';
export const modalContentClasses = {
    buttonWrapper: `${prefix}-rootContent`,
};

export const StyledModalContentComponent = styled('div')(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    gap: 20,

    [`& .${modalContentClasses.buttonWrapper}`]: {
        display: 'flex', 
        justifyContent: 'flex-end',
        gap: 10, 
    },
}));