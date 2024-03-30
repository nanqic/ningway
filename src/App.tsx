import { Outlet, Route, Routes } from 'react-router-dom'
import { Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { Suspense, createContext, useEffect, useMemo, useState } from 'react';
import { blue, green } from '@mui/material/colors';
import Home from '@/pages/Home';
import ProxySearch from './pages/ProxySearch'
import NotFound from './components/NotFound'
import Donate from '@/components/Donate'
import About from '@/components/About'
import VideoBox from "@/components/VideoBox"
import { postVisit } from './utils/requestUtil';
import HotTag from './components/HotTag';
import Meditation from './pages/Meditation';
import EmptyList from './pages/EmptyList';
import EmptyDetail from './components/EmptyDetail';
import Step from './pages/Step';
import SearchView from './pages/SearchView';
import SearchAppBar from './components/SearchAppBar';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import { getTitleList } from './utils/dbUtil';

interface Db {
    titles?: string[]
    fetchTitles: () => Promise<string[]>
}
export const DbContext = createContext<Db | undefined>(undefined);
function App() {
    const routes = [
        { path: '/', Element: Home },
        { path: '/search/:query?', Element: SearchView },
        { path: '/vsearch/:keywords?', Element: ProxySearch },
        { path: '/donate', Element: Donate },
        { path: '/About', Element: About },
        { path: '/video/:id', Element: VideoBox },
        { path: '/tag/:value?', Element: HotTag },
        { path: '/meditation/:value?', Element: Meditation },
        { path: '/emptiness', Element: EmptyList },
        { path: '/emptiness/:title?', Element: EmptyDetail },
        { path: '/step/:value?', Element: Step },
        { path: '*', Element: NotFound },
    ]

    const [titles, setTitles] = useState<string[]>()
    useEffect(() => {
        if (!sessionStorage.getItem("isReload")) {
            // 跳转关于页
            if (document.cookie.replace(/(?:(?:^|.*;\s*)to_about\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
                location.replace('/about')
                document.cookie = `to_about=true; max-age=`
                    + 60 * 60 * 24 * 14;
            }
            if (localStorage.getItem('visit_date') != new Date().getDate().toString()) {
                localStorage.setItem('visit_date', new Date().getDate().toString())
                postVisit()
            }

            sessionStorage.setItem("isReload", "true")
            console.info("页面首次加载");
        }
    }, [])

    const fetchTitles = async () => {
        if (titles)
            return titles

        console.log('读取localStorage');
        let data = await getTitleList()
        setTitles(data)
        return data
    }

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        main: blue[300],
                    },
                    secondary: {
                        main: green[500],
                    },
                },
                components: {
                    MuiLink: {
                        styleOverrides: {
                            root: {
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        },
                    },
                    MuiMenuItem: {
                        styleOverrides: {
                            root: {
                                '&.Mui-selected': {
                                    backgroundColor: blue[100],
                                },
                            },
                        },
                    },
                }
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DbContext.Provider value={{ titles, fetchTitles }}>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <SearchAppBar />
                </Container>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <Suspense fallback={'loading'}>
                        <Routes>
                            {routes.map(({ path, Element }) => {
                                return <Route key={path} path={path} element={<Element />} />
                            })}
                        </Routes>
                    </Suspense>
                    <Outlet />
                </Container>
            </DbContext.Provider>
            <Container maxWidth="md" sx={{ p: 0 }}>
                <Footer />
                <ScrollTop />
            </Container>
        </ThemeProvider>
    )
}

export default App
