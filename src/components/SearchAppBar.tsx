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
import { FormControl, Menu, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { findTitleByIds, getVsearchCount } from '@/utils/dbUtil';
import useLocalStorageState from 'use-local-storage-state';
import { useContext, useEffect } from 'react';
import { DbContext } from '@/App';


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
            width: '17ch',
            '&:focus': {
                width: '24ch'
            },
        },
        '::-webkit-input-placeholder': { fontSize: ' 13px' },
    },
}));


const YearOption = ({ year, setYear }: any) => {
    const menuItems = [];
    for (let i = 2012; i <= 2020; i++) {
        menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }

    const handleYearChange = (event: SelectChangeEvent<typeof year>) => {
        let {
            target: { value },
        } = event;
        value = value.filter(Boolean).sort()
        setYear(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl
            sx={{ mx: 1 }}
            variant="outlined"
            size="small">
            <Select
                sx={{
                    'fieldset': {
                        border: 'none'
                    }
                }}
                multiple
                value={year}
                onChange={handleYearChange}
                renderValue={(selected) => {
                    return ''
                }}
            >
                <Button color="inherit">选择年份</Button>
                {menuItems}
                <MenuItem key={2022} value={2022}>{2022}</MenuItem>
            </Select>
        </FormControl>
    );
}

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
        name: "标签",
        path: "/tag"
    },
    {
        name: "关于",
        path: "/about"
    }
];

export default function SearchAppBar() {
    const dbContext = useContext(DbContext);
    if (!dbContext) return <>数据加载失败！</>;

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const titleParam = searchParams.get('title')
    const queryParam = searchParams.get('query')
    const anchorRef: any = React.useRef()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [query, setQuery] = React.useState(queryParam || '')
    const [year, setYear] = useLocalStorageState<string[]>('year-options', {
        defaultValue: []
    })
    const regx = new RegExp("\/v?search(\/(?!player))?")

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const filterQuery = async () => {
        if (parseInt(query) > 10000 && findTitleByIds(await dbContext.fetchTitles(), [query]).length === 1)
            return navigate(`/video/ ${btoa('=' + query)}`)

        return query.length >= 1 && query.length <= 11
    }

    const doSearch = () => {
        const path = location.pathname === '/list' ? 'list' : 'search'
        navigate(`/${path}?query=${query}`)
    }

    const handleEnter = async (e: { key: string; }) => {
        if (await filterQuery() && !/(20\d{2}|-)/.test(query)) {
            if (e.key === 'Enter' && showSearchButton()) {
                return navigate(`/vsearch/${query}`)
            }
            doSearch()
        }
    }

    const showSearchButton = () => {
        return query.length >= 1 && !/(20\d{2}|-)/.test(query) && dbContext.enableSearch
    }

    // 切换页面时清空搜索参数
    useEffect(() => {
        if (query != '' && (!regx.test(location.pathname) || titleParam)) {
            setQuery('')
        } else {
            queryParam && setQuery(queryParam)
        }
    }, [location.pathname, queryParam])
    useEffect(() => {
        if (query != '' && regx.test(location.pathname)) {
            doSearch()
            if (year.length) {
                searchParams.set('year', year.map(y => (y + '').slice(2)).toString())
            } else {
                searchParams.delete('year')
            }
            setSearchParams(searchParams)
        }
    }, [year])

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
                {/^\/(?:list|search)/.test(location.pathname) && !query.includes('-') && !titleParam &&
                    <YearOption year={year} setYear={setYear} />}
                <Search
                    sx={{
                        mr: showSearchButton() ? 7 : 1.5
                    }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="日期/编号/标题"
                        type="search"
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyUp={handleEnter}
                        value={query}
                        onChange={e => setQuery(e.target.value?.trimStart())}
                    />
                    {showSearchButton() &&
                        <Button
                            variant="contained"
                            color="success"
                            onClick={async () => (await filterQuery()) && navigate(`/vsearch/${query} `)}
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

