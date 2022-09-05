import React, {CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const linkStyle: CSSProperties = {
    textDecoration: 'none', 
    color: '#222'
}

interface ILinkMenuProps {
    text: string;
    to: string;
    icon: JSX.Element;
}

export default function (props: ILinkMenuProps){
    return (
        <Link to={props.to} style={linkStyle}>
            <ListItem key={props.text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.text} />
                </ListItemButton>
            </ListItem>
        </Link>
    )
}