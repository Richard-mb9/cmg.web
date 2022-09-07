import React from 'react';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CardMedia from "@mui/material/CardMedia";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import TableBarIcon from '@mui/icons-material/TableBar';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useRedirect} from '../../../../context/redirect/useRedirect';


import LinkDashboardMenu from '../linkDashboardMenu';

import defaultImage from '../../../../static/images/semImagem.png';

interface Props {
    window?: () => Window;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

export default function Menu(props: Props) {
    const { window, mobileOpen, handleDrawerToggle, drawerWidth } = props;

    const [ redirect ] = useRedirect();

    const container = window !== undefined ? () => window().document.body : undefined;

    const logOut = ()=>{
        localStorage.clear()
        redirect('/login')
    }

    const menu = (
        <div>
            <CardMedia
                    component="img"
                    className='productImageCard'
                    image={defaultImage}
                    alt="Live from space album cover"
                />
            <Divider />
            <List>
                <LinkDashboardMenu to='/' text='Home' icon={<HomeIcon/>} />
                <LinkDashboardMenu to='/products' text='Produtos' icon={<CategoryIcon/>} />
                <LinkDashboardMenu to='/orders' text='Pedidos' icon={<DescriptionIcon/>} />
                <LinkDashboardMenu to='/tables' text='Mesas' icon={<TableBarIcon/>} />
                <LinkDashboardMenu to='/workers' text='Funcionarios' icon={<GroupIcon/>} />
            </List>
            <Divider />
            <List>
                <LinkDashboardMenu to='/profile' text='Perfil' icon={<AccountCircleIcon/>} />
                <LinkDashboardMenu to='/settings' text='Configurações' icon={<SettingsIcon/>} />
                <Divider />
                <LinkDashboardMenu to='' onClick={()=>logOut()} isButton text='Sair' icon={<LogoutIcon/>} />
            </List>
        </div>
    )

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {menu}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {menu}
            </Drawer>
        </Box>
    )
}