import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

import InputSearch from '../../components/inputSearch';


interface IProps {
    drawerWidth: number;
    handleDrawerToggle: ()=>void;
}


export default function NavBar(props: IProps){
    const {drawerWidth, handleDrawerToggle} = props;

    return (
        <AppBar
                color='default'
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        CMG
                    </Typography>
                    <InputSearch 
                        value=''
                    />
                </Toolbar>
            </AppBar>
    )
}