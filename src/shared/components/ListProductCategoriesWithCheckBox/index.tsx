import React, { useState, useEffect, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DataContext } from '../../../context/contextData';
import { IProductCategories } from '../../../utils/interfaces';


interface IProps {
  selectedIdProductCategories: number[];
  setSelectedProductCategories: (values: number[]) => void;
  error?: boolean;
}

export default function CheckboxListProductCategories(props: IProps) {
  const { selectedIdProductCategories, setSelectedProductCategories , error} = props;

  const { productCategories:  allProductCategoriesFromContext } = useContext(DataContext);


  const [checked, setChecked] = useState(selectedIdProductCategories);
  const [allProductCategories, setAllProductCategories] = useState<IProductCategories[]>(allProductCategoriesFromContext)

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setSelectedProductCategories(newChecked);
  };


  useEffect(()=>{
    setChecked(selectedIdProductCategories)
  }, [selectedIdProductCategories]);


  useEffect(()=> {
    if(allProductCategoriesFromContext.length > 0 && allProductCategories.length === 0){
      setAllProductCategories(allProductCategoriesFromContext)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProductCategoriesFromContext]);

  const borderColor = error ? 'red' :'#ccc'

  return (
    <Box
      sx={{
        
      }}
    >
      <Typography variant="subtitle1" color="text.secondary" component="div" whiteSpace={'normal'}>
        Categorias
      </Typography>
      <List sx={{ 
        width: '100%', 
        bgcolor: 'background.paper', 
        maxHeight: 300,overflowY: 'scroll' ,
        border: `solid 1px ${borderColor}`,
        borderRadius: 2,
      }}>
      {allProductCategories.map((productCategory) => {
        const labelId = `checkbox-list-label-${productCategory.id}`;

        return (
          <ListItem
            key={productCategory.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(productCategory.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(productCategory.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${productCategory.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </Box>
    
  );
}
