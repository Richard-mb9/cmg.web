import React, {useRef} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import QRCODE from '../QrCode';
import {useReactToPrint} from 'react-to-print';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'calc(100vw - 50px)',
    maxHeight: 'calc(100vh - 100px)',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3,
};

interface IQrCode {
    tableName: string;
    contentQrCode: string;
}

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    qrCodes: IQrCode[];
}

export default function ModalPrintAllQrCodes(props: IProps) {
    const { open, setOpen, qrCodes } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const ListQrCodes = () =>  {
        const styles = {
            minWidth: 250,
            margin: 40
        }

        const content =  !!qrCodes.length ? qrCodes.map(item=>{
            return <QRCODE tableName={item.tableName} contentQrCode={item.contentQrCode}/>
        }) : <h1>Nenhuma mesa cadastrada</h1>

        return(
            <div ref={componentRef} style={{...styles, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {content}
            </div> 
        )
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style}}>
                    <Box style={{height: 500,overflowY: 'scroll'}}>
                        <ListQrCodes />
                    </Box>
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
        </div>
    );
}