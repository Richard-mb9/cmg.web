import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



interface IProps {
    telefones: string[];
}

export default function CardTelephones(props: IProps){
    const [isEditing, setIsEditing] = useState(false);
    const { telefones } = props;

    return isEditing ? (
        <>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Telefones
                        </Typography>
                        {telefones.map((telefone)=>(<TextField
                            id="telephone"
                            label="Telefone"
                            defaultValue={telefone}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />))}
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
                            Telefones
                        </Typography>
                        {telefones.map((telefone)=>(
                            <Card sx={{padding: "10px", margin: "20px 0px" }}>
                                <Typography>
                                Telefone: 
                                </Typography>
                                <Typography 
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    {telefone}
                                </Typography>
                            </Card>
                        ))}
 
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
                        <Button variant="contained" onClick={()=> setIsEditing(true)}>EDITAR</Button>
                    </Box>
                </Box>
            </Card>
        </>
    )
}