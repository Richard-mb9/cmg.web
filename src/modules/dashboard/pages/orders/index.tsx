import React from 'react';
import CardsInfo from './components/CardsInfo';
import CardOrders from './components/CardOrders';

export default function () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeef' }}>
            <CardsInfo />
            <div>
                <div style={{ margin: 30, color: '#666' }}>
                    <h2>Ultimos Pedidos</h2>
                </div>
                <CardOrders orderStatus='OPENED'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='PAID'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='CLOSED'/>
                <CardOrders orderStatus='CLOSED'/>
            </div>
        </div>

    )
}