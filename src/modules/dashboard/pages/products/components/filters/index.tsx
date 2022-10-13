import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import useContextData from '../../../../../../context/hooks/useContextData';

interface IProps {
  onSelect: (value: string)=>void;
}

export default function TemporaryDrawer(props: IProps) {
  const [open, setOpen] = useState(false);

  const { productCategories } = useContextData();

  const { onSelect } = props;

  const handleOnselect = (value: string) => {
    onSelect(value);
    setOpen(false);
  }

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <div>
        <Button onClick={toggleDrawer(true)}>{'Categorias'}<FilterAltOutlinedIcon/></Button>
        <Drawer
        anchor='right'
        open={open}
        onClose={toggleDrawer(false)}
        >
          <List>
          {['Listar Todas'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>handleOnselect('all')}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {productCategories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton onClick={()=>handleOnselect(category.name)}>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer>
    </div>
  );
}
