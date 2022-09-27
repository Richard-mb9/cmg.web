import React, { useState, useEffect, useContext } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import PageLoading from '../../../../../../shared/components/PageLoading';
import { getEmailFromToken } from '../../../../../../utils/security';
import { DataContext } from '../../../../../../context/contextData';
import { PersonalDataIntegrationContext } from '../../../../../../context/integrationsContext/personalData';

export default function CardPersonalData(){
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialState, setInitialState] = useState({
        name: '',
        cnpj: '',
        corporateName: '',
    });
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [corporateName, setCorporateName] = useState('');
    const email = getEmailFromToken();

    const { 
        personalData, 
        setPersonalData,
    } = useContext(DataContext);

    const { createAndUpdatePersonalData } = useContext(PersonalDataIntegrationContext);

    const clear = ()=>{
        setName(initialState.name);
        setCorporateName(initialState.corporateName);
        setCnpj(initialState.cnpj);
        setIsEditing(false);
    }

    const saveChanges = async ()=> {
        setIsLoading(true);
        const newPersonalData = await createAndUpdatePersonalData({
            cnpj,
            corporateName,
            name
        })
        if(personalData && newPersonalData){
            setPersonalData({
                ...personalData,
                name,
                cnpj,
                corporate_name: corporateName
            })
        }
        setIsLoading(false);
    }

    useEffect(()=>{
        if(personalData){
            setName(personalData.name || '');
            setCnpj(personalData.cnpj || '');
            setCorporateName(personalData.corporate_name || '');
            setInitialState({
                name: personalData.name || '',
                cnpj: personalData.cnpj || '',
                corporateName: personalData.corporate_name || '',
            })
        }
        
    }, [personalData]);

    return isEditing ? (
        <>
            <PageLoading open={isLoading}/>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Dados Pessoais
                        </Typography>
                        <TextField
                            id="corporateName"
                            label="Razão Social"
                            value={corporateName}
                            fullWidth
                            onChange={(event)=>setCorporateName(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="name"
                            label="nome"
                            value={name}
                            fullWidth
                            onChange={(event)=>setName(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="cnpj"
                            label="CPF/CNPJ"
                            value={cnpj}
                            fullWidth
                            onChange={(event)=>setCnpj(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={email}
                            fullWidth
                            sx={{margin: "15px 0" }}
                            disabled
                        />
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"end" }}>
                        <Button 
                            variant="contained"
                            onClick={clear}
                            sx={{margin: "0 10px"}}
                        >
                            CANCELAR
                        </Button>
                        <Button 
                            variant="contained"
                            onClick={saveChanges}
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
            <PageLoading open={isLoading}/>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Dados Pessoais
                        </Typography>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                                Razão Social:
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {!corporateName && !isLoading ?  'Nenhuma Cadastrada' : (corporateName || '')}
                            </Typography>
                        </Card>
                        <Card sx={{padding: "10px", margin: "20px 0px" }}>
                            <Typography>
                                Nome:
                            </Typography>
                            <Typography 
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {!name && !isLoading ?  'Nenhum Cadastrado' : (name || '')}
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
                                {!cnpj && !isLoading ?  'Nenhum Cadastrado' : (cnpj || '')}
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
                                {email}
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