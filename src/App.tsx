import { Outlet, Route, Routes } from 'react-router-dom'
import { Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { Suspense, createContext, useEffect, useMemo, useRef, useState } from 'react';
import { blue, green } from '@mui/material/colors';
import Home from '@/pages/Home';
import ProxySearch from './pages/ProxySearch'
import NotFound from './components/NotFound'
import Donate from '@/components/Donate'
import About from '@/pages/About'
import VideoBox from "@/components/VideoBox"
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
import ErrorPage from './components/ErrorPage';
import { ErrorBoundary } from "react-error-boundary";
import QRcodBaseUA from './components/QRcodBaseUA';
import YearList from './pages/YearList';
import WeiboList from './pages/WeiboList';
import WeiboDetail from './pages/WeiboDetail';
import Reading from './pages/Reading';
import Post from './pages/Post';
import BottomNav from './components/BottomNav';
import Favorite from './pages/Favorite';
import Recent from './pages/Recent';
import { getAuthKey } from './utils/requestUtil';
import AuRegister from './pages/AuRegister';
import { usePlayerStore, useVideoStore } from './store/Index';
import VideoPlayer from './components/VideoPlayer';

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
        { path: '/video/:id?', Element: VideoBox },
        { path: '/tag/:value?', Element: HotTag },
        { path: '/yearlist', Element: YearList },
        { path: '/recents', Element: Recent },
        { path: '/favorites', Element: Favorite },
        { path: '/meditation/:value?', Element: Meditation },
        { path: '/emptiness', Element: EmptyList },
        { path: '/emptiness/:title?', Element: EmptyDetail },
        { path: '/step/:value?', Element: Step },
        { path: '/post', Element: Reading },
        { path: '/post/:id', Element: Post },
        { path: '/weibo', Element: WeiboList },
        { path: '/weibo/:id', Element: WeiboDetail },
        { path: '/au-register', Element: AuRegister },
        { path: '*', Element: NotFound },
    ]

    const videoRef = useRef(null);
    const [titles, setTitles] = useState<string[]>()
    const setVideoRef = usePlayerStore(state => state.setVideoRef)
    const setPaused = useVideoStore(state => state.setPaused)

    useEffect(() => {
        setVideoRef(videoRef)

        if (!sessionStorage.getItem("isReload")) {
            getAuthKey().then(res => {
                sessionStorage.setItem("date_auth", res)
            })
            sessionStorage.setItem("isReload", "true")
            setPaused(true) // 调整播放状态
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
        let userEmailRexg = /^([\w_\.\-]+@ningway\.com|1425122306@qq.com|ningway@foxmail.com)$/
        let email = JSON.parse(localStorage.getItem('WALINE_USER') || '{}')?.email

        const emailValid = userEmailRexg.test(email)
        console.log('EnableSearch');

        return emailValid
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
                        <VideoPlayer />
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
                    <BottomNav />
                    <ScrollTop />
                </Container>
            </ErrorBoundary>
        </ThemeProvider>
    )
}

export default App
