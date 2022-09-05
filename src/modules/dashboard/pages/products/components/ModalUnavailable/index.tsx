import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3
};



interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    action: ()=>void;
}
export default function ModalUnavailable(props: IProps){
    const { open, setOpen, action } = props;

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
                <Box sx={{ ...style, maxWidth: '100vw' }}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography component="div">
                            Com esta ação seus clientes não poderão ver este produto!
                        </Typography>
                        <Typography component="div" variant="h6" sx={{textAlign: 'center', margin:2}}>
                            Deseja Continuar?
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button
                            onClick={()=>{action(); setOpen(false)}}
                            color={'success'}
                            sx={{ margin: 1 }} variant="outlined"
                            
                        >
                            Sim
                        </Button>
                        <Button
                            onClick={() => setOpen(false)}
                            color={'error'}
                            sx={{ margin: 1 }} variant="outlined"
                        >
                            CANCELAR
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}