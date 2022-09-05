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
                            <p>Digite os nomes ou numeros das mesas separados por ponto e virgula - ;</p>
                            <p>Exemplos:</p>
                            <ul>
                                <li>1</li>
                                <li>mesa 1</li>
                                <li>1;2;3;4;5;6;7</li>
                                <li>mesa 1; mesa 2; mesa 3</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="nome"
                                label="Nome ou numero"
                                name="nome"
                                multiline
                                rows={5}
                                type="text"
                                
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