import React, { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Home from './home';
import NavBar from '../components/navBar';
import Menu from '../components/menu';
import Products from './products';
import Tables from './tables';
import Orders from './orders';
import Profile from './profile';
import Settings from './settings';
import Workers from './workers';
import CreateProduct from './products/pages/create';
import UpdateProduct from './products/pages/update';
import ProductsCategories from './productsCategories';


export default function ResponsiveDrawer(props: any) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <Menu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, overflowX: 'hidden'}}
            >
                <Toolbar />
                <Routes>
                    <Route element={<Home/>} path='/'/>
                    <Route element={<Products/>} path={`/products`}/>
                    <Route element={<CreateProduct/>} path={`/products/create`}/>
                    <Route element={<UpdateProduct/>} path={`/products/:id`}/>
                    <Route element={<Orders/>} path='/orders'/>
                    <Route element={<Tables/>} path='/tables'/>
                    <Route element={<Profile/>} path='/profile'/>
                    <Route element={<Settings/>} path='/settings'/>
                    <Route element={<Workers/>} path='/workers'/>
                    <Route element={<ProductsCategories/>} path='/products-categories'/>
                </Routes>
                
            </Box>
        </Box>
    );
}