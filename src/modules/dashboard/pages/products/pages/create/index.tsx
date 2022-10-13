import React, {useState, useEffect, ChangeEvent} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from "@mui/material/CardMedia";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import {useNavigate} from 'react-router-dom';


import defaultImage from '../../../../../../static/images/semImagem.png';
import { Divider } from '@mui/material';
import CheckboxListProductCategories from '../../../../../../shared/components/ListProductCategoriesWithCheckBox';
import { useProductsApi } from '../../../../../../context/hooks/integrations';
import PageLoading from '../../../../../../shared/components/PageLoading';
import useContextData from '../../../../../../context/hooks/useContextData';
import { useSnackbar } from '../../../../../../context/notification/useSnackbar';

const stylesCard = {
    padding: 2,
    '@media screen and (min-width: 750px)':{
        maxWidth: 'max-content'
    },
    '@media screen and (max-width: 749px)':{
        maxWidth: '100%'
    }
}

const styles = {
    display: 'flex',
    '@media screen and (min-width: 750px)':{
        flexDirection: 'row',
        alignItems: 'start',
    },
    '@media screen and (max-width: 749px)':{
        flexDirection: "column",
        alignItems: 'center',
    }
}

type AlertType = 'error' | 'warning' | 'info' | 'success';
type displayAlertType = 'none' | 'flex';

interface IProductErrors {
    name?: boolean;
    productCategories?: boolean;
    price?: boolean;
}

export default function CreateProduct() {

    const { createProduct } = useProductsApi();
    const { currentStoreId, 
        products: productsFromContext,
        setProducts: setProductsFromContext, 
        productCategories: productCategoriesFromContext,
    } = useContextData();
    const [openSnackbar] = useSnackbar();

    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0.0);
    const [valueProductPrice, setValueProductPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string | undefined>();
    const [productAvailableStore, setProductAvailableStore] = useState(true);
    const [productAvailableDelivery, setProductAvailableDelivery] = useState(true);
    const [productCategories, setProductCategories] = useState<number[]>([])
    const [inputPriceIsFocused, setInputPriceIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState<IProductErrors>({});
    const [textAlert, setTextAlert] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertType>('error')
    const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')

    const renderAlert = (type: AlertType, text: string) => {
        setTextAlert(text);
        setAlertType(type);
        setDisplayAlert('flex');
      }

    const navigate = useNavigate();

    const handleProductAvailableStore = ()=>{
        setProductAvailableStore(!productAvailableStore);
    }

    const handleProductAvailableDelivery = ()=>{
        setProductAvailableDelivery(!productAvailableDelivery);
    }

    const onSelectedFiles = (event: ChangeEvent<HTMLInputElement>) =>{
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(event.target.files[0])
    }

    const validate = ()=> {
        if(!productName){
            setErrors({name: true});
            renderAlert('error', 'Preencha um nome valido');
            return false;
        }
        else setErrors({name: false});
        if(!productPrice){
            setErrors({price: true});
            renderAlert('error', 'Digite um Preço valido');
            return false;
        }
        else setErrors({price: false});
        if(!productCategories.length){
            setErrors({productCategories: true});
            renderAlert('error', 'O Produto deve possuir pelo menos uma categoria');
            return false;
        }
        else setErrors({productCategories: false});
        setDisplayAlert('none');
        return true;
    }

    const save = async () => {
        if(!validate()) return
        setIsLoading(true);
        if(currentStoreId){
            const data = {
                storeId: currentStoreId,
                name: productName,
                description: description,
                price: productPrice,
                categoriesIds: productCategories,
                availableDelivery: productAvailableDelivery,
                availableStore: productAvailableStore,
                image: selectedFile
            }
            const response = await createProduct(data);
            if(response){
                openSnackbar("Produto salvo", {color: 'success'});

                const newProducts = productsFromContext;
                newProducts.push({
                    id: response.id,
                    storeId: data.storeId,
                    name: productName,
                    description: description,
                    price: productPrice,
                    categories: productCategoriesFromContext.filter((c)=> productCategories.includes(c.id)),
                    availableDelivery: productAvailableDelivery,
                    availableStore: productAvailableStore,
                    imageUrl: preview,
                })
                setProductsFromContext(newProducts);
            }
        }
        setIsLoading(false);
        

    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

    }, [selectedFile]);

    useEffect(()=>{
        if(parseFloat(valueProductPrice).toString() !== 'NaN'){
            const value = parseFloat(valueProductPrice).toFixed(2)
            setProductPrice(parseFloat(value));
        }
        else {
            setProductPrice(0.00);
        }
    }, [valueProductPrice]);

    useEffect(()=>{
        if(errors.name || errors.price || errors.productCategories){
            validate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productName, productPrice, productCategories, errors])


    return (<>
        <PageLoading open={isLoading}/>
        <Card sx={stylesCard}>
            <Typography 
                component="div"
                variant="h5" 
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '10px'
                }}
            >
                Novo Produto
            </Typography>
            <Box >
                <Alert sx={{display: displayAlert }} severity={alertType}>{textAlert}</Alert>
            </Box>
            <Divider />
            <Box sx={styles}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    margin: '10px', 
                    alignItems: 'center',
                    width: 200,
                }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151, margin: "auto"}}
                        src={preview || defaultImage}
                        alt="ProductImage"
                    />
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="contained-button-file"
                        type="file"
                        onChange={onSelectedFiles}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" sx={{margin: 2}}>
                        Upload
                        </Button>
                    </label>
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    margin: '10px',
                    width: '100%'
                }}>
                    <TextField
                        id="productName"
                        label="Nome do produto"
                        value={productName}
                        fullWidth
                        onChange={(event)=>setProductName(event.target.value)}
                        sx={{margin: "15px 0" }}
                        error={errors.name}
                    />
                    <TextField
                        id="productPrice"
                        label="Valor"
                        value={!inputPriceIsFocused ? productPrice.toFixed(2) : valueProductPrice}
                        type="number"
                        fullWidth
                        onChange={(event)=>setValueProductPrice(event.target.value)}
                        onFocus={()=>setInputPriceIsFocused(true)}
                        onBlur={()=>setInputPriceIsFocused(false)}
                        sx={{margin: "15px 0" }}
                        error={errors.price}
                    />
                    <TextField
                        id="productDescription"
                        label="Descrição"
                        value={description}
                        fullWidth
                        multiline
                        minRows={3}
                        onChange={(event)=>setDescription(event.target.value)}
                        sx={{margin: "15px 0" }}
                    />
                </Box>
            </Box>
            <Box sx={{marginBottom: '10px'}}>
                <CheckboxListProductCategories 
                    selectedIdProductCategories={productCategories}
                    setSelectedProductCategories={(value: number[])=>setProductCategories(value)}
                    error={errors.productCategories}
                />
            </Box>
            <Box style={{display: "flex", flexDirection: "column"}}>
                <FormControlLabel
                    control={<Switch checked={productAvailableStore} />}
                    label={"Disponivel na loja"}
                    onClick={handleProductAvailableStore}
                />
                <FormControlLabel
                    control={<Switch checked={productAvailableDelivery} />}
                    label={"Disponivel para delivery"}
                    onClick={handleProductAvailableDelivery}                    />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Button 
                    onClick={()=>save()}
                    sx={{margin: 1}} variant="outlined"
                >
                    SALVAR
                </Button>
                <Button 
                    onClick={()=>navigate(-1)}
                    sx={{margin: 1}} variant="outlined"
                    color='error'
                >
                    CANCELAR
                </Button>
            </Box>
        </Card>
    </>)
}