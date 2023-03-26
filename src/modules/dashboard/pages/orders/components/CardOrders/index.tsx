import React, {useState} from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableBarIcon from '@mui/icons-material/TableBar';
import HouseIcon from '@mui/icons-material/House';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalOrdersInfo from '../ModalOrdersInfo';
import CardOrdersDetails from './Components/CardOrdersDetails';


type OrderStatusType = 'OPENED' | 'CLOSED' | 'PAID';

interface IProps {
    orderStatus: OrderStatusType;
    date: string;
    delivery?: boolean;
}

export default function CardOrders(props: IProps) {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: 3,
            width: 'max-content'
        }}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {
                    props.delivery 
                        ? <HouseIcon color='primary' fontSize='large' sx={{ marginLeft: 2 }} />
                        : <TableBarIcon color='primary' fontSize='large' sx={{ marginLeft: 2 }} />
                }
                <div style={{padding: '0 15px', fontWeight: '100', fontSize: 18}}>
                    <p>{props.date}</p>
                </div>
            </Box>
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                margin: 3,
                alignItems: 'center',
            }}>
                <CardOrdersDetails orderStatus={props.orderStatus}/>
                <Box>
                    <Button 
                    sx={
                        {borderRadius: '30px'}
                    } 
                    variant="contained" 
                    color='primary' 
                    onClick={()=>setModalOpen(!modalOpen)}>
                        {'VER FATURA'}
                    </Button>
                </Box>
            </Box>
            <ModalOrdersInfo  open={modalOpen} setOpen={setModalOpen}/>
        </Card>
    )

    /* return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: 3,
        }}>
            <Box>
                <div style={{paddingLeft: 15, fontWeight: '100', fontSize: 18}}>
                    <p>5 de janeiro de 2022</p>
                </div>
                <Divider />
            </Box>
            <Box sx={{
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
                <Box>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            R$ 300,00
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <CardContent >
                        {statusButton()}
                    </CardContent>
                </Box>
            </Box>
            <ModalOrdersInfo  open={modalOpen} setOpen={setModalOpen}/>
        </Card>
    ) */

    
}