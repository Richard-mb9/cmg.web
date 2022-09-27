import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OrdersItems from '../OrdersItems';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3,
    //maxHeight: '100vh',
    //overflowY: 'scroll'
};

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Mod(props: IProps) {
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, maxWidth: '100vw'}}>
                    <Box sx={{marginBottom: 5}}>
                        <Typography sx={{ textAlign: 'center' }} variant='h6'>
                            PEDIDO DA MESA 5
                        </Typography>
                    </Box>
                    <Box style={{height: 400, overflowY: 'scroll'}}>
                        <OrdersItems />
                    </Box>
                    <Box sx={{margin: 3}}>
                        <Typography sx={{ textAlign: 'right' }} variant='h6'>
                            Total R$ {'1085,00'}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 2}}>
                        <Button
                            onClick={() => { }}
                            color={'success'}
                            sx={{ margin: 1 }} variant="outlined"
                        >
                            MARCAR COMO PAGO
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