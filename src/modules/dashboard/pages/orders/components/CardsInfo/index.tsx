import React from 'react';
import Box from '@mui/material/Box';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import Card from '../../../../components/customCardDashBoard';
export default function (){
    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
            <Card title='Total de Pedidos Abertos' value={'110'} icon={<ShoppingCartCheckoutIcon color='warning' fontSize='large' />} />
            <Card title='Total de pedidos de hoje' value={'1200'} icon={<ShoppingBasketIcon color='error' fontSize='large' />} />
            <Card title='Total de Pedidos nos ultimos 7 dias' value={'20.000'} icon={<ShoppingCartCheckoutIcon color='success' fontSize='large' />} />
            <Card title='Total de Pedidos Este Mes' value={'20.000'} icon={<ShoppingCartCheckoutIcon color='success' fontSize='large' />} />
        </Box>
    )
}