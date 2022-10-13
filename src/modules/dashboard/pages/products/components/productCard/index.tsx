import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Modal from '../modalEditProduct';
import ModalDeleteProduct from '../ModalDeleteProduct';
import CardMedia from "@mui/material/CardMedia";
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Link } from 'react-router-dom';


import defaultImage from '../../../../../../static/images/semImagem.png';
import { IProduct } from '../../../../../../utils/interfaces';
import { useProductsApi } from '../../../../../../context/hooks/integrations';
import { useSnackbar } from '../../../../../../context/notification/useSnackbar';
import useContextData from '../../../../../../context/hooks/useContextData';
import PageLoading from '../../../../../../shared/components/PageLoading';

const style = {
    maxWidth: 550 ,
    minWidth: 300,
    display: 'flex', 
    padding: 1, 
    margin: 2,
    '@media screen and (min-width: 900px)':{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
    },
    '@media screen and (max-width: 899px)':{
        flexDirection: 'column', 
    }
}

const styleImage = {
    '@media screen and (min-width: 900px)':{
        maxWidth: '150px', 
        maxHeight: '110px',
    },
    '@media screen and (max-width: 899px)':{
        maxWidth: '150px', 
        maxHeight: '150px',
        margin: 'auto',
    }
}

const styleActions = {
    '@media screen and (min-width: 750px)':{
        width: '100%',
        display: "flex", 
        justifyContent: "space-between"
    },
    '@media screen and (max-width: 749px)':{
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}


interface Iprops {
    product: IProduct;
}


export default function ProductCard(props: Iprops) {
    const { product } = props;

    const { id, availableDelivery, availableStore,price, name } = product;
    const { deleteProduct } = useProductsApi();
    const [ openSnackbar ] = useSnackbar();
    const { 
        products: productsFromContext, 
        setProducts: setProductsFromContext
    } = useContextData();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [showAllDescription, setShowAllDescription] = useState(false);
    const [productAvailableStore, setProductAvailableStore] = useState(availableStore);
    const [productAvailableDelivery, setProductAvailableDelivery] = useState(availableDelivery);
    const [isLoading, setIsLoading] = useState(false);
    
    const getBackgroundColor = ()=>{
        return productAvailableStore || productAvailableDelivery ? '#fff' : '#ccc'
    }

    const handleProductAvailableStore = ()=>{
        setProductAvailableStore(!productAvailableStore);
    }

    const handleProductAvailableDelivery = ()=>{
        setProductAvailableDelivery(!productAvailableDelivery);
    }

    const handleDeleteProduct = async ()=>{
        setIsLoading(true);
        setModalDeleteOpen(false);
        const response = await deleteProduct(product.id);
        if(response){
            openSnackbar("produto excluido", {color: 'success'})
            const newProducts = productsFromContext.filter((p)=>p.id !== product.id);
            setProductsFromContext(newProducts);
        }
        setIsLoading(false);
    }


    const description = showAllDescription 
        ? (product.description || '') 
        : (product.description || '').length >= 80 
            ? (product.description || '').substring(0,80) + "..."
            : (product.description || '');

    return (
        <Card sx={{ 
            ...style,
            backgroundColor: getBackgroundColor()
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                    component="img"
                    className='productImageCard'
                    sx={{ ...styleImage}}
                    src={product.imageUrl || defaultImage}
                    alt="Live from space album cover"
                />
                
                <Typography sx={{marginTop:1, textAlign: 'center'}} component="div" variant="subtitle1">
                    {`R$ ${price.toFixed(2)}`}
                </Typography>
                
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 370 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        {name}
                    </Typography>
                    {product.description && (<>
                    <Typography variant="subtitle1" color="text.secondary" component="div" whiteSpace={'normal'}>
                        <Tooltip title={product.description || ''}>
                            <span>{description}</span>
                        </Tooltip>
                    </Typography>
                    {(product.description || '').length >= 80 && (<><Tooltip title={showAllDescription ? "Mostrar Menos" : "Mostrar Mais"}>
                        <IconButton 
                            sx={{width: "100%", borderRadius: 0, border: "solid 1px #eee"}}
                            onClick={()=>setShowAllDescription(!showAllDescription)}
                        >
                            {showAllDescription ? <ExpandLessIcon/> : <ExpandMoreIcon />}
                        </IconButton>
                    </Tooltip></>)}
                    </>)}
                </CardContent>
            </Box>
            <Box sx={styleActions}>
                <Box style={{display: "flex", flexDirection: "column"}}>
                    <FormControlLabel
                        control={<Switch checked={productAvailableStore} />}
                        label={"Disponivel na loja"}
                        disabled={true}
                        onClick={handleProductAvailableStore}
                    />
                    <FormControlLabel
                        control={<Switch checked={productAvailableDelivery} />}
                        label={"Disponivel para delivery"}
                        disabled={true}
                        onClick={handleProductAvailableDelivery}
                    />
                </Box>
                <Box>
                    <Link to={`/products/${id}` }
                        style={{
                            textDecoration: 'none', 
                        }} 
                    >
                        <Button 
                            sx={{margin: 1}} variant="outlined"
                        >
                            editar
                        </Button>
                    </Link>
                    <Button 
                        onClick={()=>setModalDeleteOpen(!modalDeleteOpen)}
                        sx={{margin: 1}} variant="outlined"
                        color='error'
                    >
                        EXCLUIR
                    </Button>
                </Box>
            </Box>
            <Modal open={modalOpen} setOpen={setModalOpen}/>
            <ModalDeleteProduct 
                open={modalDeleteOpen} 
                setOpen={setModalDeleteOpen}
                action={handleDeleteProduct}
            />
            <PageLoading open={isLoading}/>
        </Card>
    )
}