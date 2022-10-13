import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import ModalDelete from '../ModalDelete';


interface IProps {
    action: () => Promise<void>;
    message: string;
}

export default function IconButtonModalDelete(props: IProps){
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const { action, message } = props;


    return (
        <>
            <IconButton onClick={() => setOpenModalDelete(true)}>
                <DeleteForeverIcon color="primary" />
            </IconButton>
            <ModalDelete 
                open={openModalDelete}
                setOpen={setOpenModalDelete}
                action={action}
                message={message}
            />
        </>
    )
}