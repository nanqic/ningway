import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const [searchParams, _] = useSearchParams()
    const q = location.pathname.includes('/search/') && location.pathname.split('/search/').pop()
    const anchorRef: any = React.useRef()

    const queryParam = (q && decodeURI(q) || searchParams.get('query'))?.trim().replace(/\//g, '').toUpperCase() || ''

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [query, setQuery] = React.useState(queryParam)

    const handleEnter = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            navigate(`/vsearch/${query}`)
        } else if (query.length >= 2) {
            navigate(`/search/${query}`)
        }
    }

    // 切换页面时清空搜索参数
    React.useEffect(() => {
        if (query != '' && !location.pathname.includes('/search')) {
            setQuery('')
        }
    }, [location.pathname])

    return (
        <AppBar id="back-to-top-anchor"
            ref={anchorRef}
            position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        mr: 1,
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
                                    onClick={() => {
                                        navigate(page.path)
                                        document.title = '宁路 | ' + page.name
                                    }}>{page.name}</Typography>
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
                                document.title = '宁路 | ' + page.name
                            }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Box>

                <Search
                    sx={{
                        mr: query && 3
                    }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder=" 编号/标题/关键字"
                        inputProps={{ 'aria-label': 'search' }}
                        // @ts-ignore
                        onKeyUp={handleEnter}
                        value={query}
                        onChange={e => setQuery(e.target.value?.trimStart().replace(/\//g, ''))}
                    />
                    {query && <>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: .5,
                        }}
                            onClick={() => setQuery('')}
                        >
                            <ClearIcon />
                        </Box>
                        <button
                            onClick={() => query != '' && navigate(`/vsearch/${query}`)}
                            style={{
                                position: 'absolute',
                                right: -37,
                                color: 'gold',
                                padding: -3,
                                background: 'none',
                                border: 'none'
                            }}
                        >搜索</button>
                    </>}
                </Search>

            </Toolbar>
        </AppBar>
    );
};

