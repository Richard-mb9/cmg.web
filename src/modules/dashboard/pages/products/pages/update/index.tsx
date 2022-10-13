import React, {useState, useEffect, ChangeEvent, useContext, useCallback} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from "@mui/material/CardMedia";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from '@mui/material/TextField';

import {useNavigate, useParams} from 'react-router-dom';


import defaultImage from '../../../../../../static/images/semImagem.png';
import { DataContext } from '../../../../../../context/contextData';
import { IProduct, IProductCategories } from '../../../../../../utils/interfaces';
import CheckboxListProductCategories from '../../../../../../shared/components/ListProductCategoriesWithCheckBox';
import { useProductsApi } from '../../../../../../context/hooks/integrations';
import PageLoading from '../../../../../../shared/components/PageLoading';
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

interface IHandlerSetProduct {
    imageUrl?: string;
    name?: string;
    price?: number;
    description?: string;
    availableDelivery?: boolean;
    availableStore?: boolean;
    categories?: IProductCategories[];
}

export default function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ openSnackbar ] = useSnackbar();

    const { updateProduct } = useProductsApi();
    const { 
        products: productFromContext, 
        productCategories: productCategoriesFromContext,
        setProducts: setProductsFromContext
    
    } = useContext(DataContext);

    const getCurrentProduct = useCallback(()=> productFromContext.find((product)=> product.id.toString() === id), [productFromContext, id])

    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string | undefined>();
    const [product, setProduct] = useState<IProduct | undefined>(getCurrentProduct());
    const [isLoading, setIsLoading] = useState(false);
    const [inputPriceIsFocused, setInputPriceIsFocused] = useState(false);
    const [valueProductPrice, setValueProductPrice] = useState(product?.price.toString() || '');

    const handleSetProduct = (data: IHandlerSetProduct) => {
        if(product){
            setProduct({...product, ...data})
        }
    }

    const handleSetProductCategories = (value: number[])=>{
        const productCategories = productCategoriesFromContext.filter(
            (productCategory)=> value.includes(productCategory.id)
        );
        handleSetProduct({categories: productCategories});
    }

    const onSelectedFiles = (event: ChangeEvent<HTMLInputElement>) =>{
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(event.target.files[0])
    }

    const saveChanges = async ()=>{
        setIsLoading(true);
        if(product && id){
            const response =  await updateProduct(parseInt(id), {
                name: product.name,
                description: product.description,
                price: product.price,
                availableStore: product.availableStore,
                availableDelivery: product.availableDelivery,
                image: selectedFile,
                categoriesIds: product.categories.map((item)=>item.id)
            });
            if(response){
                const newProductsFromContext = productFromContext.map((item)=>{
                    if(product.id === item.id) return {...product, imageUrl:( preview || product.imageUrl)};
                    return item;
                });
                setProductsFromContext(newProductsFromContext);
                openSnackbar("Dados Salvos", {color: 'success'})
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

    }, [selectedFile])

    useEffect(()=>{
        if(productFromContext){
            setProduct(getCurrentProduct());
        }
    }, [productFromContext, getCurrentProduct]);

    useEffect(()=>{
        if(product){
            if(parseFloat(valueProductPrice).toString() !== 'NaN'){
                const value = parseFloat(valueProductPrice).toFixed(2)
                setProduct({...product, price: parseFloat(value)});
            }
            else {
                setProduct({...product, price: 0.0});
            }
        }
        
    }, [valueProductPrice, product]);

    return (<>
        <PageLoading open={isLoading}/>
        <Card sx={stylesCard}>
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
                        src={preview || (product?.imageUrl || defaultImage)}
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
                        value={product?.name || ''}
                        fullWidth
                        onChange={(event)=>handleSetProduct({name: event.target.value})}
                        sx={{margin: "15px 0" }}
                    />
                    <TextField
                        id="productPrice"
                        label="Valor"
                        value={product ? (!inputPriceIsFocused ? product.price.toFixed(2) : valueProductPrice) : 0}
                        type="number"
                        fullWidth
                        onChange={(event)=>setValueProductPrice(event.target.value)}
                        onFocus={()=>setInputPriceIsFocused(true)}
                        onBlur={()=>setInputPriceIsFocused(false)}
                        sx={{margin: "15px 0" }}
                    />
                    <TextField
                        id="productDescription"
                        label="Descrição"
                        value={product?.description || ''}
                        fullWidth
                        multiline
                        minRows={3}
                        onChange={(event)=>handleSetProduct({description: event.target.value})}
                        sx={{margin: "15px 0" }}
                    />
                    
                </Box>
            </Box>
            <Box sx={{margin: '10px 0'}}>
                <CheckboxListProductCategories 
                    selectedIdProductCategories={(product?.categories || []).map((p)=>p.id)}
                    setSelectedProductCategories={handleSetProductCategories}
                />
            </Box>
            <Box style={{display: "flex", flexDirection: "column"}}>
                <FormControlLabel
                    control={<Switch checked={product ? product.availableStore : false} />}
                    label={"Disponivel na loja"}
                    disabled={!!!product}
                    onClick={()=>handleSetProduct({availableStore: product ? !product.availableStore : false})}
                />
                <FormControlLabel
                    control={<Switch checked={product ? product.availableDelivery : false} />}
                    label={"Disponivel para delivery"}
                    disabled={!!!product}
                    onClick={()=>handleSetProduct({availableDelivery: product ? !product.availableDelivery : false})}                 />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Button 
                    onClick={()=>saveChanges()}
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