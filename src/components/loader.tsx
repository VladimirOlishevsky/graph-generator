import { Backdrop, CircularProgress } from "@mui/material";

interface ILoaderProps {
    isShow: boolean
}

export const Loader = ({
    isShow
}: ILoaderProps) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isShow}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}