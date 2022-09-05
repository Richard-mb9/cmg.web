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
// import ModalUnavailable from '../ModalUnavailable';
import CardMedia from "@mui/material/CardMedia";
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";



import defaultImage from '../../../../../../static/images/semImagem.png';

const style = {
    maxWidth: 550 ,
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 1, 
    margin: 2, 
}

const styleImage = {
    '@media screen and (min-width: 900px)':{
        width: 151, maxHeight: 200,
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
    price: number;
    productName: string;
    productDescription: string;
    availableStore: boolean;
    availableDelivery: boolean;
}


export default function ProductCard(props: Iprops) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    // const [modalUnavailableOpen, setModalUnavailableOpen] = useState(false);
    const [showAllDescription, setShowAllDescription] = useState(false);
    const [productAvailableStore, setProductAvailableStore] = useState(props.availableStore);
    const [productAvailableDelivery, setProductAvailableDelivery] = useState(props.availableDelivery);

    const getBackgroundColor = ()=>{
        return productAvailableStore || productAvailableDelivery ? '#fff' : '#ccc'
    }

    const handleProductAvailableStore = ()=>{
        setProductAvailableStore(!productAvailableStore);
    }

    const handleProductAvailableDelivery = ()=>{
        setProductAvailableDelivery(!productAvailableDelivery);
    }

    const description = showAllDescription ? props.productDescription : props.productDescription.substring(0,80) + "...";

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
                    image={defaultImage}
                    alt="Live from space album cover"
                />
                
                <Typography sx={{marginTop:1}} component="div" variant="subtitle1">
                    {`R$ ${props.price.toFixed(2)}`}
                </Typography>
                
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 370 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        {props.productName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" whiteSpace={'normal'}>
                        <Tooltip title={props.productDescription}>
                            <span>{description}</span>
                        </Tooltip>
                    </Typography>
                    <Tooltip title={showAllDescription ? "Mostrar Menos" : "Mostrar Mais"}>
                        <IconButton 
                            sx={{width: "100%", borderRadius: 0, border: "solid 1px #eee"}}
                            onClick={()=>setShowAllDescription(!showAllDescription)}
                        >
                            {showAllDescription ? <ExpandLessIcon/> : <ExpandMoreIcon />}
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Box>
            <Box sx={styleActions}>
                <Box style={{display: "flex", flexDirection: "column"}}>
                    <FormControlLabel
                        control={<Switch checked={productAvailableStore} />}
                        label={"Disponivel na loja"}
                        onClick={handleProductAvailableStore}
                        //disabled={!hasRole("UPDATE_USERS")}
                    />
                    <FormControlLabel
                        control={<Switch checked={productAvailableDelivery} />}
                        label={"Disponivel para delivery"}
                        onClick={handleProductAvailableDelivery}
                        //disabled={!hasRole("UPDATE_USERS")}
                    />
                </Box>
                <Box>
                    <Button 
                        onClick={()=>setModalOpen(!modalOpen)}
                        sx={{margin: 1}} variant="outlined"
                    >
                        editar
                    </Button>
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
            <ModalDeleteProduct open={modalDeleteOpen} setOpen={setModalDeleteOpen}/>
            {/* <ModalUnavailable 
                open={modalUnavailableOpen} 
                setOpen={setModalUnavailableOpen} 
                action={handleProductAvailable}/> */}
        </Card>
    )
}