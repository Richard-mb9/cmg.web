import React, { 
    useState,
    useEffect,
    ChangeEvent,
    useCallback,
    useContext 
} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import PageLoading from '../../../../../../shared/components/PageLoading';

import { DataContext } from '../../../../../../context/contextData';
import { getIdFromToken } from '../../../../../../utils/security';
import { states } from '../../../../../../shared/enums/states';
import { useAddressApi } from '../../../../../../context/hooks/integrations';


interface IErrors {
    street?: boolean;
    number?: boolean;
    complement?: boolean;
    district?: boolean;
    city?: boolean;
    state?: boolean;
    cep?: boolean;
}


export default function CardAddress(){
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialState, setInitialState] = useState({
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        country: '',
        cep: '',
    })
    const [errors, setErros] = useState<IErrors>({});
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cep, setCep] = useState('');
    const [country, setCountry] = useState('BRASIL');
    const [addressId, setAddressId] = useState<number | undefined>(undefined)
    const [textAdress, setTextAddress] = useState('');

    const {address, setAddress} = useContext(DataContext);
    const { createAdress, updateAddress } = useAddressApi();

    const validate = useCallback(()=>{
        setErros({
            street: !!!street,
            district: !!!district,
            city: !!!city,
            state: !!!state,
            cep: !!!cep,
        })
        if(!!!street || !!!city || !!!district || !!!state || !!!cep){
            return false
        }
        return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [street, district, city, state, cep, errors])

    const handleSetCep = (event: ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value;
        if(Number(value).toString() !== 'NaN' && value.length <= 8){
            setCep(value);
        }
    }

    const saveChanges = async ()=>{
        if(!validate()) return
        setIsLoading(true);
        const data = {
            street,
            number: `${number}`,
            complement,
            district,
            city,
            state,
            country,
            cep
        }
        if(!addressId){
            const response = await createAdress(data)
            if(response){
                const id = response.id;
                setInitialState(data)
                setAddress({
                    id,
                    user_id: getIdFromToken(),
                    ...data
                })
                setAddressId(id)
                setIsEditing(false);
            }
        }
        else {
            const response = await updateAddress(addressId, data);
            if(response){
                setInitialState(data)
                setAddress({
                    id: addressId,
                    user_id: getIdFromToken(),
                    ...data
                })
                setAddressId(response.id)
                setIsEditing(false);
            }
        }
        setIsLoading(false);
    }

    useEffect(()=>{
        if(address){
            setStreet(address.street);
            setNumber(address.number || '');
            setComplement(address.complement || '');
            setDistrict(address.district || '');
            setCity(address.city);
            setState(address.state);
            setCep(address.cep);
            setCountry(address.country);
            setAddressId(address.id);
            setInitialState({
                cep: address.cep,
                street: address.street,
                number: address.number || '',
                complement: address.complement || '',
                district: address.district,
                city: address.city,
                state: address.state,
                country: address.country,
            })
        }
    }, [address])

    useEffect(()=>{
        let verifyErrors = false;
        const keysErrors = Object.keys(errors) as (keyof IErrors)[];
        keysErrors.forEach((key)=>{
            if(errors[key]) verifyErrors = true;
        })
        if(verifyErrors){
            validate();
        }
        if(!!!street || !!!city || !!!district || !!!state){
            setTextAddress('Termine o cadastro do seu endereço')
        }
        else {
            setTextAddress(`Rua ${street}${number ? (` ${number}`) : ''}, ${district}, ${city} - ${state}${cep ? ` - ${cep}`: ''}`)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [street, city, district, state, number, cep, country, complement])

    const clear = ()=>{
        setCep(initialState.cep);
        setCity(initialState.city);
        setState(initialState.state);
        setDistrict(initialState.district);
        setNumber(initialState.number);
        setComplement(initialState.complement);
        setStreet(initialState.street);
        setCountry(initialState.country);
        setIsEditing(false);
    }
   

    return isEditing ? (
        <>
            <PageLoading open={isLoading}/>
            <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "500px", padding: "10px", margin: "20px 10px"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5" sx={{display: "flex"}}>
                            Endereço
                        </Typography>
                        <TextField
                            id="street"
                            label="Rua"
                            value={street || ''}
                            fullWidth
                            error={errors.street}
                            onChange={(event)=>setStreet(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="number"
                            label="Numero"
                            value={number || ''}
                            type="number"
                            fullWidth
                            error={errors.number}
                            onChange={(event)=>setNumber(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="complement"
                            label="Complemento"
                            value={complement || ''}
                            fullWidth
                            error={errors.complement}
                            onChange={(event)=>setComplement(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="district"
                            label="Bairro"
                            value={district || ''}
                            fullWidth
                            error={errors.district}
                            onChange={(event)=>setDistrict(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <TextField
                            id="city"
                            label="Cidade"
                            value={city || ''}
                            fullWidth
                            error={errors.city}
                            onChange={(event)=>setCity(event.target.value)}
                            sx={{margin: "15px 0" }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-estado">Estado</InputLabel>
                            <Select
                            labelId="label-estado"
                            id="estado-select"
                            value={state}
                            label="Estado"
                            error={errors.state}
                            onChange={(event)=>setState(event.target.value)}
                            >
                            {states.map((item)=>(<MenuItem key={item} value={item}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="cep"
                            label="CEP"
                            value={cep || ''}
                            fullWidth
                            error={errors.cep}
                            onChange={handleSetCep}
                            sx={{margin: "15px 0" }}
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
                            Endereço
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            {isLoading ? '' : textAdress}
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