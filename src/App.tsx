import { Outlet, Route, Routes } from 'react-router-dom'
import { Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { Suspense, createContext, useEffect, useMemo, useState } from 'react';
import { blue, green } from '@mui/material/colors';
import Home from '@/pages/Home';
import ProxySearch from './pages/ProxySearch'
import NotFound from './components/NotFound'
import Donate from '@/components/Donate'
import About from '@/pages/About'
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
import { getTitleList, getVsearchCount } from './utils/dbUtil';
import ErrorPage from './components/ErrorPage';
import { ErrorBoundary } from "react-error-boundary";
import QRcodBaseUA from './components/QRcodBaseUA';

interface Db {
    titles?: string[]
    fetchTitles: () => Promise<string[]>
    enableSearch: boolean
}
export const DbContext = createContext<Db | undefined>(undefined);
function App() {
    const routes = [
        { path: '/', Element: Home },
        { path: '/search/:query?', Element: SearchView },
        { path: '/vsearch/:keywords?', Element: ProxySearch },
        { path: '/donate', Element: Donate },
        { path: '/donate/ua', Element: QRcodBaseUA },
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

    const visitHook = async () => {
        const res: any = await postVisit()
        localStorage.setItem('ip_city', res?.city)
    }

    useEffect(() => {
        if (!sessionStorage.getItem("isReload")) {
            let visitDay = localStorage.getItem('visit_date')
            if (visitDay != new Date().getDate().toString()) {
                localStorage.setItem('visit_date', new Date().getDate().toString())
                visitHook()

                // if (!visitDay) setTimeout(() => location.replace('/about'), 5000)
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

    const isEnableSearch = () => {
        const cityValid = !/(珠海市|Zhuhai)/.test(localStorage.getItem('ip_city') || '')
        const total: number = (getVsearchCount()?.total) || 0
        const stat = localStorage.getItem('playstat')?.length || 0
        console.log('EnableSearch');

        return cityValid && (stat > 100 || total > 1)
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
            <ErrorBoundary fallback={<ErrorPage />}>
                <DbContext.Provider value={{ titles, fetchTitles, enableSearch: isEnableSearch() }}>
                    <Container maxWidth="md" sx={{ p: 0 }}>
                        <SearchAppBar />
                    </Container>
                    <Container maxWidth="md" sx={{ p: 0 }}>
                        <Suspense fallback={'loading'} >
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
            </ErrorBoundary>
        </ThemeProvider>
    )
}

export default App
