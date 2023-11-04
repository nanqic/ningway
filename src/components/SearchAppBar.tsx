import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 11,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
        '::-webkit-input-placeholder': { fontSize: ' 13px' },
    },
}));


const pages = [
    {
        name: "次第",
        path: "/step"
    },
    {
        name: "静坐",
        path: "/meditation"
    },
    /** {
        name: "帮助",
        path: "/help"
    },*/
    {
        name: "关于",
        path: "/about"
    }
];


export default function SearchAppBar() {
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [query, setQuery] = React.useState('')


    const handleEnter = (e: { target: { value: any; }; key: string; }) => {
        const { value } = e.target
        if (value.trim() != '') {
            if (e.key === 'Enter') {
                navigate(`/vsearch/${value}`)
                
            } else if (value.length >= 2) {
                navigate(`/search?query=${value}`)
            }
        }
    }

    const anchorRef: any = React.useRef()

    return (
        <AppBar id="back-to-top-anchor"
            ref={anchorRef}
            position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                        onClick={() => navigate('/')}
                    >
                        NING
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"
                                        onClick={() => navigate(page.path)}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            minWidth: 50,
                            mr: 1,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        NING
                    </Typography>
                    <Box sx={{
                        flexGrow: 1, display: { xs: "none", md: "flex" },
                        '& button': { my: 2, color: "white", display: "block" }
                    }}>
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(page.path)
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder=" 编号/标题/关键字"
                            inputProps={{ 'aria-label': 'search' }}
                            // @ts-ignore
                            onKeyUp={handleEnter}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />

                        <Box sx={{
                            opacity: query != '' ? 1 : 0,
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: .5
                        }}
                            onClick={() => setQuery('')}
                        >
                            <ClearIcon />
                        </Box>

                    </Search>
                </Toolbar>
            </Container>

        </AppBar>
    );
};

