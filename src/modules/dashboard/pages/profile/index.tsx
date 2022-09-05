import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';


import defaultImage from "../../../../static/images/semImagem.png";

export default function Profile() {
    return (
        <div>
        
            <Card sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <CardMedia
                    component="img"
                    sx={{ width: 151}}
                    image={defaultImage}
                    alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                            Nome do Estabelecimento
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            Breve Descrição do Estabelecimento
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "end", pl: 1, pb: 1 }}>
                        <Button variant="contained">EDITAR</Button>
                    </Box>
                </Box>
            </Card>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Endereço
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            Rua Rei Pelé, Tri Campeão, Queimados - RJ
                        </Typography>
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
                        <Button variant="contained">EDITAR</Button>
                    </Box>
                </Box>
            </Card>
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
                                Retaurante do Dodô
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
                                restaurante@hotmail.com
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
                                123358478963
                            </Typography>
                        </Card>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                            Telefone: 
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                (21) 98745-3254
                            </Typography>
                        </Card>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                            Whatsapp: 
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                (21) 98745-3254
                            </Typography>
                        </Card>
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
                        <Button variant="contained">EDITAR</Button>
                    </Box>
                </Box>
            </Card>
        </div>
    );
}
