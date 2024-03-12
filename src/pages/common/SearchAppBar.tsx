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
import { findTitleByIds } from '@/utils/dbUtil';


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
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
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
    {
        name: "空性",
        path: "/emptiness"
    },
    {
        name: "标签",
        path: "/tag"
    },
    {
        name: "关于",
        path: "/about"
    }
];

const regx = new RegExp("\/v?search\/(?!player)")
const getQuery = () => regx.test(location.pathname) && location.pathname.split(regx).pop()

export default function SearchAppBar() {
    const navigate = useNavigate()
    const [searchParams, _] = useSearchParams()
    const listParam = searchParams.get('list')
    // searchBar 不在route中，只能用这种方式了
    const q = getQuery()
    const anchorRef: any = React.useRef()

    const queryParam = (q && decodeURI(q) || searchParams.get('query'))?.trim().replace(/(?:\/)/g, '') || ''

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const filterQuery = () => {
        if (parseInt(query) > 10000 && findTitleByIds([query]).length === 1)
            return navigate(`/video/${btoa('=' + query)}`)
        return query.length >= 1 && query.length <= 11
    }
    const [query, setQuery] = React.useState<string>(queryParam)

    const handleEnter = (e: { key: string; }) => {
        if (filterQuery()) {
            if (e.key === 'Enter') {
                return navigate(`/vsearch/${query}`)
            }
            navigate(`/search/${query}`)
        }
    }

    // 切换页面时清空搜索参数
    React.useEffect(() => {
        if (query != '' && !regx.test(location.pathname) || listParam == 'true') {
            setQuery('')
        }
    }, [location.pathname, searchParams])

    return (
        <AppBar id="back-to-top-anchor"
            ref={anchorRef}
            position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href='/'
                    title='主页'
                    sx={{
                        cursor: "pointer",
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none"
                    }}
                    onClick={(e) => { e.preventDefault(); navigate('/') }}
                >
                    NING
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={{
                            pl: 0,
                            "&:hover:after": {
                                content: '"菜单"',
                                fontSize: 10,
                                position: "absolute",
                                bottom: ".3em"
                            }
                        }}
                        onClick={handleOpenNavMenu}
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
                            <MenuItem key={page.path}
                                sx={{ px: 1.5 }}
                                onClick={handleCloseNavMenu}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                        navigate(page.path)
                                        document.title = '宁路 | ' + page.name
                                    }}>{page.name}</Button>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    title='主页'
                    onClick={() => navigate('/')}
                    sx={{
                        minWidth: 50,
                        cursor: "pointer",
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
                        mr: query.length >= 1 ? 7 : 1.5
                    }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder=" 编号/标题/关键字"
                        type="search"
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyUp={handleEnter}
                        value={query}
                        onChange={e => setQuery(e.target.value?.trimStart().replace(/\//g, ''))}
                    />
                    {query.length >= 1 &&
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => filterQuery() && navigate(`/vsearch/${query}`)}
                            style={{
                                position: 'absolute',
                                right: -67,
                            }}
                        >搜索</Button>}
                </Search>

            </Toolbar>
        </AppBar>
    );
};

