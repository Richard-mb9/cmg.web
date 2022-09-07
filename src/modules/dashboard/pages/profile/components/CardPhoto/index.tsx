import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import defaultImage from "../../../../../../static/images/semImagem.png";


interface IProps {
    storeName: string;
    storeDescription: string;
    imagePathUrl?: string;
}

const styleCardContentEdit = {
    display: "flex",
    flexDirection: "column",
    '@media screen and (min-width: 800px)':{
        flex: "2",
    }
}

export default function CardPhoto(props: IProps){
    const [isEditing, setIsEditing] = useState(false);

    return isEditing ? (
        <>
            <Card sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ width: 150, display: "flex"}}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151, margin: "auto"}}
                        image={defaultImage}
                        alt="storeImage"
                    />
                </Box>
                <Box sx={styleCardContentEdit}>
                    <CardContent >
                        <TextField
                            id="storeName"
                            label="Nome do Estabelecimento"
                            defaultValue={props.storeName}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="storeDescription"
                            label="Breve Descrição do estabelecimento"
                            defaultValue={props.storeDescription}
                            fullWidth
                            sx={{margin: "15px 0"}}
                        />
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "end", pl: 1, pb: 1 }}>
                        <Button 
                            variant="contained"
                            onClick={()=>setIsEditing(false)}
                            sx={{margin: "0 10px"}}
                        >
                            CANCELAR
                        </Button>
                        <Button 
                            variant="contained"
                            onClick={()=>setIsEditing(false)}
                            sx={{margin: "0 10px"}}
                        >
                            SALVAR
                        </Button>
                    </Box>
                </Box>
                
            </Card>
        </>
    ) : (
        <>
            <Card sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <CardMedia
                    component="img"
                    sx={{ width: 151}}
                    image={defaultImage}
                    alt="storeImage"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                            {props.storeName}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            {props.storeDescription}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "end", pl: 1, pb: 1 }}>
                        <Button variant="contained" onClick={()=> setIsEditing(true)}>EDITAR</Button>
                    </Box>
                </Box>
            </Card>
        </>
    )
}