import React, {useRef} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useReactToPrint} from 'react-to-print';

import QRCode from '../QrCode';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3,
};

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    contentQrCode: string;
    tableName: string;
}

export default function ModalQrCode(props: IProps) {
    
    const { open, setOpen, contentQrCode, tableName } = props;
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const QrCode = () => (
        <div ref={componentRef} style={{width: 'max-content', margin: 40}}>
            <QRCode tableName={tableName} contentQrCode={contentQrCode}/>
        </div> 
    )
    

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, maxWidth: '100vw'}}>
                <QrCode />
                <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 2}}>
                    <Button
                        onClick={handlePrint}
                        color={'success'}
                        sx={{ margin: 1 }} variant="outlined"
                    >
                        IMPRIMIR
                    </Button>
                    <Button
                        onClick={() => handleClose()}
                        color={'error'}
                        sx={{ margin: 1 }} variant="outlined"
                    >
                        SAIR
                    </Button>
                </Box>
            </Box>
        </Modal>  
    );
}