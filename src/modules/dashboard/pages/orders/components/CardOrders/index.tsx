import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableBarIcon from '@mui/icons-material/TableBar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalOrdersInfo from '../ModalOrdersInfo';


type OrderStatusType = 'OPENED' | 'CLOSED' | 'PAID';

interface IProps {
    orderStatus: OrderStatusType;
}

export default function (props: IProps) {
    const [modalOpen, setModalOpen] = useState(false)

    const statusButton = () => {
        const textStatus = {
            'OPENED': 'ABERTO',
            'CLOSED': 'FECHADO',
            'PAID': 'PAGO',
        }

        const getColorForStatus = ()=> {
            if (props.orderStatus === 'CLOSED') return 'warning';
            else if(props.orderStatus === 'OPENED') return 'info';
            else return 'success';
        }

        return (
            <Button variant="contained" color={getColorForStatus()} onClick={()=>setModalOpen(!modalOpen)}>
                {textStatus[props.orderStatus]}
                <MoreVertIcon />
            </Button>
        )
    }

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
            <ModalOrdersInfo  open={modalOpen} setOpen={setModalOpen}/>
        </Card>
    )
}