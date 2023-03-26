import React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


type OrderStatusType = 'OPENED' | 'CLOSED' | 'PAID';

interface IProps {
    orderStatus: OrderStatusType;
}

export default function CardOrdersDetails(props: IProps){
    const textStatus = {
        'OPENED': 'ABERTO',
        'CLOSED': 'FECHADO',
        'PAID': 'PAGO',
    }

    const getColorForStatus = ()=> {
        if (props.orderStatus === 'CLOSED') return 'orange';
        else if(props.orderStatus === 'OPENED') return 'blue';
        else return 'green';
    }

    return (
        <Box>
            <CardContent>
                <span style={{
                    color: getColorForStatus(), 
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    fontSize: '20px'
                }}>
                    {textStatus[props.orderStatus]}
                </span>
                <Typography component="div" variant="h5">
                    Mesa 8
                </Typography>
                <Typography component="div" >
                    R$ 300,00
                </Typography>
            </CardContent>
        </Box>
    )
}