import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Button from '@mui/material/Button';

import ModalQrCode from '../ModalQrCode';

interface IProps {
    contentQrCode: string;
    tableName: string;
}


export default function ButtonOpenQrCode(props: IProps){
    const [modalQrCodeOpen, setModalQrCodeOpen] = useState(false);

    const { contentQrCode, tableName} = props;

    const widthScreen = window.screen.width;

    const ButtonOpen = () => widthScreen > 400 ? (
        <Button variant="contained" onClick={()=>setModalQrCodeOpen(!modalQrCodeOpen)}>
            {"Obter QR code"}
        </Button>
    ) : (
        <IconButton onClick={() => setModalQrCodeOpen(true)}>
            <QrCode2Icon color="primary" />
        </IconButton>
    )

    return (
        <>
            <ButtonOpen />
            <ModalQrCode  
                open={modalQrCodeOpen} 
                setOpen={setModalQrCodeOpen}
                contentQrCode={contentQrCode}
                tableName={tableName}
            />
        </>
    )
}