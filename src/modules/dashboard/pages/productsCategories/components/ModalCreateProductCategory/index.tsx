import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import useContextData from '../../../../../../context/hooks/useContextData';
import { useSnackbar } from '../../../../../../context/notification/useSnackbar';
import { useProductCategoriesApi } from '../../../../../../context/hooks/integrations';
import PageLoading from '../../../../../../shared/components/PageLoading';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3,
};

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ModalCreateProductCategory(props: IProps) {
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const { open, setOpen } = props;

    const { productCategories, setProductCategories, currentStoreId } = useContextData();
    const [ openSnackbar ] = useSnackbar();
    const { createProductCategory } = useProductCategoriesApi();


    const validateFields = ()=>{
        let isValid = true
        if (!!!name){
            setNameError(true);
            isValid = false;
        }
        else setNameError(false);
        return isValid
    }

    const handleListProductCategories = (productCategoryId: number)=>{
        if(currentStoreId){
            const newProductCategories = [...productCategories, {id: productCategoryId, name, storeId: currentStoreId}]
            setProductCategories(newProductCategories)
        }
        
    }

    const save = async ()=>{
        if(!validateFields()) return
        setIsLoading(true);
        if(currentStoreId){
            const response = await createProductCategory({
                storeId: currentStoreId,
                name,
            })
            if(response){
                handleListProductCategories(response.id);
                openSnackbar("produto salvo com sucesso", {color: 'success'});
                setName('');
            }
        }
        setIsLoading(false);
    }

    const handleClose = () => {
        setName('');
        setOpen(false);
    };

    useEffect(()=>{
        if(nameError) validateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]) 


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            ><>
                <Box sx={{ ...style, maxWidth:  'calc(100vw - 20px)'}}>
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Cadastrar nova categoria de produto
                        </Typography>
                        <Box sx={{ mt: 3 }} style={{width: '100%'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={nameError}
                                        fullWidth
                                        id="name"
                                        label="Nome da categoria"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(event)=>setName(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 2}}>
                        <Button
                            onClick={() => save()}
                            color={'success'}
                            sx={{ margin: 1 }} variant="outlined"
                        >
                            SALVAR
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
                <PageLoading open={isLoading}/>
            </></Modal>
            
        </div>
    );
}