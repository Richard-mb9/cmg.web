import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface IProps {
    title: string,
    value: string | number,
    icon?: any
}

export default function (props: IProps) {
    const {icon} = props;
    return (
        <Card sx={{ display: 'flex', padding: 2, maxWidth: 300, margin:1}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.value}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" whiteSpace={'normal'}>
                        {props.title}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                {icon}
            </Box>
        </Card>
    )
}