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
import { IProductCategories } from '../../../../../../utils/interfaces';

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
    productCategory: IProductCategories;
}

export default function ModalEditProductCategory(props: IProps) {
    const { open, setOpen, productCategory } = props;

    const [name, setName] = useState(productCategory.name)
    const [nameError, setNameError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    const { productCategories, setProductCategories } = useContextData();
    const [ openSnackbar ] = useSnackbar();
    const { updateProductCategory } = useProductCategoriesApi();

    const validateFields = ()=>{
        let isValid = true
        if (!!!name){
            setNameError(true);
            isValid = false;
        }
        else setNameError(false);
        return isValid
    }

    const handleUpdateListProductCategories = ()=>{
        const newProductCategories = productCategories.map((category)=>{
            if(category.id !== productCategory.id) return category;
            return {...category, name}
        })
        setProductCategories(newProductCategories);
    }

    const save = async ()=>{
        if(!validateFields()) return
        setIsLoading(true);
        const response = await updateProductCategory({
            id: productCategory.id,
            name,
        })
        if(response){
            openSnackbar("alterações salvas com sucesso", {color: 'success'});
            handleUpdateListProductCategories();
        }
        setIsLoading(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if(nameError) validateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    useEffect(()=>{
        if(!!!name) setName(productCategory.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productCategory]) 


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            ><>
                <Box sx={{ ...style, maxWidth:  'calc(100vw - 20px)'}}>
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Atualizar Categoria
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