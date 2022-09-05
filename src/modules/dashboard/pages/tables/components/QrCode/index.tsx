import React, {useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QRCode from "react-qr-code";
import {useReactToPrint} from 'react-to-print';

interface IPropsQRCODE {
    tableName: string;
    contentQrCode: string;
}


export default function QRCODE(props: IPropsQRCODE){
    const {tableName, contentQrCode} = props;
    const QrCode = () => <QRCode value={contentQrCode}/>;

    return (
        <div style={{border: 'solid 1px black', padding: 10, margin: 10}}>
            <Box sx={{marginBottom: 5}}>
                <Typography sx={{ textAlign: 'center' }} variant='h4'>
                    {tableName}
                </Typography>
            </Box>
            <Box style={{padding: 10}}>
                <QrCode />
            </Box>
        </div>
    )
}