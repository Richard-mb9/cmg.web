import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableBarIcon from '@mui/icons-material/TableBar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalDelete from '../../../../../../shared/components/ModalDelete';
import ModalQrCode from '../ModalQrCode';



export default function () {
    const [modalQrCodeOpen, setModalQrCodeOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

    return (
        <Card sx={{
            display: 'flex',
            padding: 1,
            margin: 3,
            alignItems: 'center'
        }}>
            <Box>
                <TableBarIcon color='success' fontSize='large' sx={{ marginLeft: 2 }} />
            </Box>
            <Box>
                <CardContent>
                    <Typography component="div" variant="h5">
                        Mesa 8
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                <CardContent >
                    <Button variant="contained" onClick={()=>setModalQrCodeOpen(!modalQrCodeOpen)}>
                        {"Obter QR code"}
                        <MoreVertIcon />
                    </Button>
                    <IconButton
                        onClick={()=>setModalDeleteOpen(!modalDeleteOpen)}
                        style={{marginLeft: 10}}
                    >
                        <DeleteForeverIcon color='info' fontSize='large'/>
                    </IconButton>
                </CardContent>
            </Box>
            <ModalQrCode  open={modalQrCodeOpen} setOpen={setModalQrCodeOpen}/>
            <ModalDelete 
                open={modalDeleteOpen} 
                setOpen={setModalDeleteOpen}
                message="Tem certeza que deseja excluir esta mesa?"
            />
        </Card>
    )
}