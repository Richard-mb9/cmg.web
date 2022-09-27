import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import defaultImage from "../../../../../../static/images/semImagem.png";
import PageLoading from '../../../../../../shared/components/PageLoading';
import { DataContext } from '../../../../../../context/contextData';
import { usePersonalDataApi } from '../../../../../../context/hooks/integrations';


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
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string | undefined>();
    const [description, setDescription] = useState('');
    const [changeDescription, setChangeDescription] = useState(false);

    const {personalData, setPersonalData} = useContext(DataContext);
    const { updateImageStore, createAndUpdatePersonalData } = usePersonalDataApi();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

    }, [selectedFile])

    const onSelectedFiles = (event: ChangeEvent<HTMLInputElement>) =>{
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(event.target.files[0])
    }


    const saveChanges = async ()=>{
        setIsLoading(true);
        console.log(personalData)
        if(selectedFile && personalData?.id){
            const response = await updateImageStore(personalData.id, selectedFile);
            if(response && personalData){
                setPersonalData({...personalData, image_url: preview});
            }
        }
        if(changeDescription && personalData){
            const personalData = await createAndUpdatePersonalData({description});
            if(personalData){
                setPersonalData({...personalData, description});
            }
            setChangeDescription(false);
            
        }
        setIsLoading(false);
        setIsEditing(false);
    }

    const clear = ()=>{
        if(personalData){
            setSelectedFile(undefined);
            setPreview(personalData.image_url);
            setDescription(personalData.description || '')
        }
        setIsEditing(false)
    }

    useEffect(()=>{
        if(personalData?.description && !!!description ){
            setDescription(personalData.description);
        }
    }, [personalData, description])

    return isEditing ? (
        <>
            <PageLoading open={isLoading}/>
            <Card sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ width: 150, display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151, margin: "auto"}}
                        src={(preview || personalData?.image_url) || defaultImage}
                        alt="storeImage"
                    />
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="contained-button-file"
                        type="file"
                        onChange={onSelectedFiles}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                        Upload
                        </Button>
                    </label>
                </Box>
                <Box sx={styleCardContentEdit}>
                    <CardContent >
                        <Typography component="div">
                            {personalData?.name || 'Cadastre o nome nos dados pessoais'}
                        </Typography>
                        <TextField
                            id="storeDescription"
                            label="Breve Descrição do estabelecimento"
                            fullWidth
                            value={description}
                            onChange={(event)=>{setDescription(event.target.value); setChangeDescription(true);}}
                            sx={{margin: "15px 0"}}
                        />
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "end", pl: 1, pb: 1 }}>
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
            <Card sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <CardMedia
                    component="img"
                    sx={{ width: 151}}
                    src={personalData?.image_url || defaultImage}
                    alt="storeImage"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                            {personalData?.name || 'Nome ainda não cadastrado'}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            {personalData?.description || 'Cadastre uma breve descrição'}
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