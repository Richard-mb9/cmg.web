import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputMask from 'react-input-mask';




interface IProps {
    street?: string;
    number?: number;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    cep?: string;
} 

export default function CardAddress(props: IProps){
    const [isEditing, setIsEditing] = useState(false);

    const textAdress = !!!props.street || !!!props.city || !!!props.district || !!!props.state
    ?  'Termine o cadastro do seu endereço'
    : `Rua ${props.street}${props.number ? (` ${props.number}`) : ''}, ${props.district}, ${props.city} - ${props.state}${props.cep ? ` - ${props.cep}`: ''}`

    return isEditing ? (
        <>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Endereço
                        </Typography>
                        <TextField
                            id="street"
                            label="Rua"
                            defaultValue={props.street || ''}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="number"
                            label="Numero"
                            defaultValue={props.number || ''}
                            type="number"
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="complement"
                            label="Complemento"
                            defaultValue={props.complement || ''}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="district"
                            label="Bairro"
                            defaultValue={props.district || ''}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="city"
                            label="Cidade"
                            defaultValue={props.city || ''}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="state"
                            label="Estado"
                            defaultValue={props.state || ''}
                            fullWidth
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="cep"
                            label="CEP"
                            defaultValue={props.cep || ''}
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
                            Endereço
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            {textAdress}
                        </Typography>
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
                        <Button variant="contained" onClick={()=> setIsEditing(true)}>EDITAR</Button>
                    </Box>
                </Box>
            </Card>
        </>
    )
}