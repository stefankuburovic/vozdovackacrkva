import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import './ResponsiveAppBar.scss';
import {
    Box, CssBaseline,
    Divider, Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

function ResponsiveAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 320;
    const navItems = ['Почетна', 'Парохија', 'О Храму', 'Галерија', 'Богослужења', 'Локација'];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{my: 2}}>
                <a className="navbar-brand" href="#">
                    <img src="./assets/images/logo.webp" width="80" height="80" alt=""/>
                </a>
            </Typography>
            <Divider className="drawer-divider" />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} className={'list-button'}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar className="appbar">
                <Toolbar className="toolbar">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                        <a className="navbar-brand" href="#">
                            <img src="./assets/images/logo.webp" width="80" height="80" alt="" />
                        </a>
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{color: '#000', textTransform: 'capitalize'}} disableRipple disableTouchRipple>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    anchor={'left'}
                    container={container}
                    className={'drawer'}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
}

export default ResponsiveAppBar;
