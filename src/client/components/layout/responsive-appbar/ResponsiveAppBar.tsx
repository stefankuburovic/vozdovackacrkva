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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

function ResponsiveAppBar(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openMenuIndex, setOpenMenuIndex] = React.useState<number | null>(null);
    const drawerWidth = 320;
    const navItems = [
        {
            name: 'Почетна', url: '/', subitems: [
                {name: 'Парохија', url: '/#pretraga-parohija'},
                {name: 'О Храму', url: '/#o-hramu'},
                {name: 'Галерија', url: '/#galerija', subitems: []},
            ]
        },
        {name: 'Богослужења', url: '/#bogosluzenja', subitems: []},
        {name: 'Ризница', url: '/riznica', subitems: []},
        {name: 'Локација', url: '#lokacija', subitems: []},
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuIndex(index);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setOpenMenuIndex(null);
    };



    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                <a className="navbar-brand" href="/">
                    <img src="./assets/images/logo.webp" width="80" height="80" alt=""/>
                </a>
            </Typography>
            <Divider className="drawer-divider"/>
            <List>
                {navItems.map((item) => (
                    <React.Fragment key={item.name}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} className={'list-button'}>
                                <ListItemText>
                                    <NavLink to={item.url}>{item.name}</NavLink>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        {item.subitems.map((subitem) => (
                            <ListItem key={subitem.name} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center', paddingLeft: 4 }} className={'list-button'}>
                                    <ListItemText>
                                        <NavLink to={subitem.url}>{subitem.name}</NavLink>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar className="appbar"><Toolbar className="toolbar">
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    <a className="navbar-brand" href="/">
                        <img src="./assets/images/logo.webp" width="80" height="80" alt="" />
                    </a>
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    {navItems.map((item, index) => (
                        <React.Fragment key={item.name}>
                            <MenuItem
                                sx={{color: '#000', textTransform: 'capitalize'}}
                                disableRipple
                                disableTouchRipple
                                onMouseEnter={(event) => handleMouseEnter(event, index)}
                            >
                                <NavLink to={item.url}>{item.name}</NavLink>
                            </MenuItem>
                            {item.subitems.length > 0 && <Menu
                                id={`menu-${index}`}
                                anchorEl={anchorEl}
                                open={openMenuIndex === index}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                {item.subitems.map((subitem) => (
                                    <MenuItem key={subitem.name} className="subitems">
                                        <NavLink to={subitem.url}>{subitem.name}</NavLink>
                                    </MenuItem>
                                ))}
                            </Menu>}
                        </React.Fragment>
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
