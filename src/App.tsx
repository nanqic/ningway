import { Outlet, Route, Routes } from 'react-router-dom'
import { Container, CssBaseline, Link, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { Suspense, lazy, useEffect, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { blue, green } from '@mui/material/colors';
import Home from '@/pages/Home';
import VboxSearch from './pages/TitleSearch';
import ProxySearch from './pages/ProxySearch'
import Footer from './pages/common/Footer';
import SearchAppBar from "@/pages/common/SearchAppBar";
import ScrollTop from "@/pages/common/ScrollTop";
import NotFound from './components/NotFound'
import UserStat from './components/UserStat'
import Donate from '@/components/Donate'
import Redirect from "@/components/Redirect"
import About from '@/components/About'
import VideoBox from "@/components/VideoBox"
import Player from './components/Player'

function App() {
    useEffect(() => {
        let timer = setTimeout(() => {
            if (!sessionStorage.getItem("isReload")) {
                // 每周跳转关于页一次
                if (document.cookie.replace(/(?:(?:^|.*;\s*)ToAbout0309\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
                    location.replace('/about')
                    document.cookie = "ToAbout0309=true; max-age="
                        + 60 * 60 * 24 * 7;
                }

                sessionStorage.setItem("isReload", "true")
                console.info("页面首次加载");
            }
        }, 1000 * 30)

        return () => clearTimeout(timer)
    }, [])

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
                                    // 全局去除 a链接下划线
                                    textDecoration: 'underline',
                                },
                            },
                        },
                    },
                }
            }),
        [prefersDarkMode],
    );

    const EmptyList = lazy(() => import("@/components/EmptyList"))
    const EmptyDetail = lazy(() => import("@/components/EmptyDetail"))
    const Meditation = lazy(() => import('@/components/Meditation'));
    const Step = lazy(() => import('./components/Step'));
    const ClassicNav = lazy(() => import('@/components/ClassicNav'));

    const routes = [
        { path: '/', Element: Home },
        { path: '/search/:keywords?', Element: VboxSearch },
        { path: '/vsearch/:keywords?', Element: ProxySearch },
        { path: '/donate', Element: Donate },
        { path: '/About', Element: About },
        { path: '/search/player', Element: Player },
        { path: '/video/:id', Element: VideoBox },
        { path: '/tag/:value?', Element: ClassicNav },
        { path: '/301/:code', Element: Redirect },
        { path: '/meditation/:value?', Element: Meditation },
        { path: '/emptiness', Element: EmptyList },
        { path: '/emptiness/:title?', Element: EmptyDetail },
        { path: '/step/:value?', Element: Step },
        { path: '/cc202cb962', Element: UserStat },
        { path: '*', Element: NotFound },
    ]
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary fallback={<>出错了，请<Link onClick={location.reload} >刷新</Link> 或返回<Link href="/">主页</Link> </>}>
                <CssBaseline />
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <SearchAppBar />
                </Container>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <Suspense fallback={'loading'}>
                        <Routes>
                            {
                                routes.map(({ path, Element }) => {
                                    return <Route key={path} path={path} element={<Element />} />
                                })
                            }
                        </Routes>
                    </Suspense>
                    <Outlet />
                </Container>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <Footer />
                    <ScrollTop />
                </Container>
            </ErrorBoundary>
        </ThemeProvider>
    )
}

export default App
