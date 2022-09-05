import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

interface IProps {
    image: string;
    categoryName: string;
}

export default function (props: IProps){
    return (
        <Card sx={{
            display: 'flex',
            padding: 2,
            minWidth: 200,
            maxWidth: 300,
            height: 70,
            margin: 1,
            alignItems: 'center',
            cursor: 'pointer',
            ":hover": {
                backgroundColor: '#eee'
            }
        }}>
            <CardMedia
                component="img"
                sx={{ maxWidth: 60, maxHeight: 60 }}
                src={props.image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div">
                        {props.categoryName}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}
