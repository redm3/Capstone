import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { IconButton, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return (

        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>
                                Home
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton onCLick = {() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>

        </React.Fragment>

    )
}

export default DrawerComponent