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
}


export default function (props: IProps) {
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
                <Box sx={{ ...style, maxWidth: '100vw' }}>
                    <Box>
                        <Typography component="div">
                            Tem certeza que deseja excluir este produto?
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button
                            onClick={() => { }}
                            color={'success'}
                            sx={{ margin: 1 }} variant="outlined"
                        >
                            TENHO CERTEZA
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