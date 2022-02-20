import {useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
// MUI Components
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
}from '@mui/material'
import Details from '../Details';
import FormModal from '../Modal';
import { useEffect } from 'react';
import { storeData } from '../../store/actions';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [itemsList, setItemsList] = useState([])
    const [selected, setSelected] = useState(1)
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const fetchItems = async () => {
        const {data} = await axios.get(`/api/v1/items/all/${page}`)
        console.log(data);
        if(data.length){
            setItemsList(data)
            dispatch(storeData(data))
        }
  }
  useEffect(()=> {
      fetchItems()
    }, [])
    const { items } = useSelector((state) => state);
  const drawerList = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {itemsList?.map((item, index) => (
          <ListItem button key={item.name} onClick={() => setSelected(item)}>
            <ListItemText primary={item.name} secondary={item.description?.slice(0, 15)}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{
            display: 'dlex',
            justifyContent: 'space-around'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {
                selected.name || 'Items Drawer'
            }
          </Typography>
        <IconButton
            color="inherit"
            edge="end"
            sx={{
                position: 'absolute',
                right: '30px'
            }}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerList}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerList}
        </Drawer>
      </Box>
      <FormModal open={open} setOpen={setOpen} />
      <Details itemId={selected.id || 1} />
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;