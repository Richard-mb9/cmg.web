import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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
                <Box sx={{ ...style, width: 400 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ width: '200px', height: '200px', backgroundColor: 'pink', margin: 'auto' }}></div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="nome"
                                label="Nome"
                                name="nome"
                                autoComplete="nome"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="description"
                                label="Descrição"
                                multiline
                                minRows={5}
                                type="text"
                                id="description"
                                autoComplete="description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="price"
                                label="Preço"
                                type="number"
                                id="price"
                            />
                        </Grid>
                    </Grid>
                    <div style={{width: '100%', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                    <Button
                        onClick={() => {}}
                        color={'success'}
                        sx={{ margin: 1 }} variant="outlined"
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        color={'error'}
                        sx={{ margin: 1 }} variant="outlined"
                    >
                        Fechar
                    </Button>
                    </div>
                    
                </Box>
            </Modal>
        </div>
    );
}