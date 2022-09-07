import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



interface IProps {
    storeName: string;
    email: string;
    cnpj: string;
}

export default function CardPersonalData(props: IProps){
    const [isEditing, setIsEditing] = useState(false);

    return isEditing ? (
        <>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Dados Pessoais
                        </Typography>
                        <TextField
                            id="corporateName"
                            label="Razão Social"
                            defaultValue={props.storeName}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            defaultValue={props.email}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="cnpj"
                            label="CPF/CNPJ"
                            defaultValue={props.cnpj}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
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
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Dados Pessoais
                        </Typography>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                                Nome:
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.storeName}
                            </Typography>
                        </Card>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                                Email:
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.email}
                            </Typography>
                        </Card>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                                CPF/CNPJ:
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.cnpj}
                            </Typography>
                        </Card>
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
                        <Button variant="contained" onClick={()=> setIsEditing(true)}>EDITAR</Button>
                    </Box>
                </Box>
            </Card>
        </>
    )
}