import React from 'react';
import CardsInfo from './components/CardsInfo';
import CardOrders from './components/CardOrders';
import { Box } from '@mui/material';

export default function Orders() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeef' }}>
            <CardsInfo />
            <div >
                <div style={{ margin: 30, color: '#666' }}>
                    <h2>Ultimos Pedidos</h2>
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                    <CardOrders orderStatus='OPENED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='PAID' date='5 de janeiro de 2022' delivery/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                    <CardOrders orderStatus='CLOSED' date='5 de janeiro de 2022'/>
                </Box>
                
            </div>
        </div>

    )
}