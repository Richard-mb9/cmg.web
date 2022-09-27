import React, { useState, useEffect, useContext } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import PageLoading from '../../../../../../shared/components/PageLoading';
import { useSnackbar } from '../../../../../../context/notification/useSnackbar';
import { DataContext } from '../../../../../../context/contextData';
import { useTelephoneApi } from '../../../../../../context/hooks/integrations';
import { ICreateTelephone } from '../../../../../../context/integrationsContext/telephones';
import { TelephoneType } from '../../../../../../utils/interfaces';



export default function CardTelephones(){
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialStateTelephonesData, setInitalStateTelephonesData] = useState<TelephoneType[]>([])
    const [telephonesToUpdate, setTelephonesToUpdate] = useState<TelephoneType[]>([]);
    const [telephonesToCreate, setTelephonesToCreate] = useState<ICreateTelephone[]>([]);
    const [telephonesToDelete, setTelephonesToDelete] = useState<number[]>([])

    const { 
        telephones: telephonesData, 
        setTelephones:setTelephonesData
    } = useContext(DataContext);

    const {
        createTelephone,
        batchDeleteTelephone,
        updateTelephone
    } = useTelephoneApi();

    const [openSnackbar] = useSnackbar();


    const handleTelephonesDelete = (telephoneId: number)=>{
        const telInTelephonesToDelete = telephonesToDelete.find((id)=> id === telephoneId);
        if(!telInTelephonesToDelete){
            setTelephonesToDelete([...telephonesToDelete, telephoneId])
        }
        const newTelephonesData = telephonesData.filter((tel)=> tel.id !== telephoneId);
        setTelephonesData(newTelephonesData);
    }

    const handleUpdateTelephones = (telephone: TelephoneType)=>{
        const isTelephoneValid = (
            (Number(telephone.ddd).toString() !== 'NaN' && Number(telephone.number).toString() !== 'NaN')
        )   && (telephone.ddd.length <= 2 && telephone.number.length <= 9)
        if(isTelephoneValid){
            const newTelephonesData = telephonesData.map((tel)=>{
                if(tel.id === telephone.id){
                    return telephone;
                }
                return tel;
            })
            setTelephonesData(newTelephonesData);

            const telephoneUpdated = telephonesToUpdate.find((tel)=>tel.id === telephone.id);
            if(telephonesToUpdate.length === 0 || !telephoneUpdated){
                setTelephonesToUpdate([...telephonesToUpdate, telephone])
            }
            else if(telephoneUpdated){
                const newTelephonesToUpdate = telephonesToUpdate.map((tel)=>{
                    if(tel.id === telephone.id){
                        return telephone;
                    }
                    return tel;
                })
                setTelephonesToUpdate(newTelephonesToUpdate)
            }
        }
    }

    const handleAddTelephone = ()=>{
        setIsEditing(true);
        setTelephonesToCreate([...telephonesToCreate, {ddd: '', number: ''}])
    }

    const handleCreateTelephone = (telephone: {ddd: string, number: string, index: number}, removeTelephone?: boolean)=>{
        if(removeTelephone){
            const newTelsToCreate = telephonesToCreate.filter((tel, index)=> index!== telephone.index);
            setTelephonesToCreate(newTelsToCreate);
            return; 
        }

        const isTelephoneValid = (
            (Number(telephone.ddd).toString() !== 'NaN' && Number(telephone.number).toString() !== 'NaN')
        )   && (telephone.ddd.length <= 2 && telephone.number.length <= 9)
        if(isTelephoneValid){
            const newTelephonesToCreate = telephonesToCreate.map((tel, index)=>{
                if(index === telephone.index){
                    return { ddd: telephone.ddd, number: telephone.number };
                }
                return tel;
            })
            setTelephonesToCreate(newTelephonesToCreate);
        }
    }

    const clearAllChanges = ()=>{
        setTelephonesData(initialStateTelephonesData);
        setTelephonesToCreate([]);
        setTelephonesToDelete([]);
        setTelephonesToUpdate([]);
        setIsEditing(false);
    }

    useEffect(()=>{
        if(initialStateTelephonesData.length === 0){
            setInitalStateTelephonesData(telephonesData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [telephonesData]);


    const getInvalidTelephones = ()=>{
        const invalidTelephonesToCreate =  telephonesToCreate.filter((telephone)=>(
            !(Number(telephone.ddd).toString() === 'NaN' && Number(telephone.number).toString() === 'NaN')
            && !(telephone.ddd.length === 2 && telephone.number.length <= 9 && telephone.number.length >= 8)
        ));
        
        const invalidTelephonesToUpdate = telephonesToUpdate.filter((telephone)=>(
            !(Number(telephone.ddd).toString() === 'NaN' && Number(telephone.number).toString() === 'NaN')
            && !(telephone.ddd.length === 2 && telephone.number.length <= 9 && telephone.number.length >= 8)
        ));
        

        return (invalidTelephonesToCreate.length + invalidTelephonesToUpdate.length)
    }

    const saveChanges = async () => {
        setIsLoading(true);
        const invalidtelephones = getInvalidTelephones();
        if(invalidtelephones > 0){
            openSnackbar(`Há ${invalidtelephones} telefones invalidos, por favor verifique-os!`);
            setIsLoading(false);
            return;
        }

        let newTelephonesData: TelephoneType[] = telephonesData;

        await Promise.all(telephonesToCreate.map( async (telephone)=>{
            const tel = await createTelephone(telephone);
            if(tel){
                newTelephonesData.push({...telephone, id: tel.id});
            }
        }))

        await Promise.all(telephonesToUpdate.map(async (telephone)=>{
            const telephoneUpdated = await updateTelephone(telephone);
            if(telephoneUpdated){
                newTelephonesData = newTelephonesData.map((tel)=>{
                    if(tel.id === telephone.id){
                        return telephone;
                    }
                    return tel;
                });
            }
        }))

        if(telephonesToDelete.length > 0){
            const response = await batchDeleteTelephone(telephonesToDelete);
            if(response){
                newTelephonesData = newTelephonesData.filter((tel)=>!telephonesToDelete.includes(tel.id));
            }
        }
        setTelephonesData(newTelephonesData);
        setInitalStateTelephonesData(newTelephonesData);
        setTelephonesToCreate([]);
        setTelephonesToDelete([]);
        setTelephonesToUpdate([]);
        setIsEditing(false);
        setIsLoading(false);

    }

    return isEditing ? (
        <>
            <PageLoading open={isLoading}/>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Telefones
                        </Typography>
                        {
                            telephonesData.map((telefone)=>(
                                <div key={telefone.id} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <TextField
                                        id={`ddd-${telefone.id}`}
                                        label="DDD"
                                        value={telefone.ddd}
                                        onChange={(event)=> handleUpdateTelephones({
                                            id: telefone.id,
                                            ddd: event.target.value,
                                            number: telefone.number
                                        })}
                                        sx={{margin: "10px 5px", flex: "1", minWidth: '60px' }}
                                    />
                                    <TextField
                                        id={`telephhone-${telefone.id}`}
                                        label="Telefone"
                                        value={telefone.number}
                                        onChange={(event)=> handleUpdateTelephones({
                                            id: telefone.id,
                                            ddd: telefone.ddd,
                                            number: event.target.value
                                        })}
                                        sx={{margin: "10px 5px", flex: "4", minWidth: '120px'  }}
                                    />
                                    <Box>
                                        <IconButton onClick={()=>handleTelephonesDelete(telefone.id)}>
                                            <DeleteForeverIcon color='primary' fontSize='large'/>
                                        </IconButton>
                                    </Box>
                                </div>
                            ))
                        }
                        {
                            telephonesToCreate.map((telefone, index)=>(
                                <div key={index} style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
                                    <TextField
                                    id={`ddd-${index}`}
                                    label="DDD"
                                    value={telefone.ddd || ''}
                                    onChange={(event)=> handleCreateTelephone({
                                        index,
                                        ddd: event.target.value,
                                        number: telefone.number
                                    })}
                                    sx={{margin: "10px 5px", flex: "1", minWidth: '60px' }}
                                />
                                    <TextField
                                        id={`telephhone-${index}`}
                                        label="Telefone"
                                        value={telefone.number || ''}
                                        onChange={(event)=> handleCreateTelephone({
                                            index,
                                            ddd: telefone.ddd,
                                            number: event.target.value
                                        })}
                                        sx={{margin: "10px 5px", flex: "4", minWidth: '120px'  }}
                                    />
                                    <Box>
                                        <IconButton onClick={()=>handleCreateTelephone({index, ddd: telefone.ddd, number: telefone.number}, true)}>
                                            <DeleteForeverIcon color='primary' fontSize='large'/>
                                        </IconButton>
                                    </Box>
                                </div>
                            ))
                        }
                    </CardContent>
                    <Box sx={{display: "flex", width: "100%", justifyContent:"space-between", alignItems: "center" }}>
                        <Box>
                            <IconButton onClick={handleAddTelephone}>
                                <AddCircleIcon color='primary' fontSize='large'/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: "flex", justifyContent:"end" }}>
                            <Button 
                                variant="contained"
                                onClick={clearAllChanges}
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
                            Telefones
                        </Typography>
                        {telephonesData.length >= 1 ? (telephonesData.map((telefone)=>(
                            <Card key={telefone.id} sx={{padding: "10px", margin: "20px 0px" }}>
                                <Typography>
                                Telefone: 
                                </Typography>
                                <Typography 
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    {`(${telefone.ddd}) ${telefone.number}`}
                                </Typography>
                            </Card>
                        ))) : (
                            <Card sx={{padding: "10px", margin: "20px 0px" }}>
                                { !isLoading && (
                                    <>
                                        <Typography>
                                        Telefone: 
                                        </Typography>
                                        <Typography 
                                            variant="subtitle1"
                                            color="text.secondary"
                                            component="div"
                                        >
                                            {'Nenhum telefone cadastrado'}
                                        </Typography>
                                    </>
                                )}
                            </Card>
                        )}
 
                    </CardContent>
                    <Box  sx={{display: "flex" , justifyContent: "space-between", alignItems: 'center'}}>
                        <IconButton onClick={handleAddTelephone}>
                            <AddCircleIcon color='primary' fontSize='large'/>
                        </IconButton>
                        <Button variant="contained" onClick={()=> setIsEditing(true)}>EDITAR</Button>
                    </Box>
                </Box>
            </Card>
        </>
    )
}