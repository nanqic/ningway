import { Outlet, Route, Routes } from 'react-router-dom'
import { Button, Container, CssBaseline, Link, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
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
import About from '@/components/About'
import VideoBox from "@/components/VideoBox"
import { postVisit } from './utils/requestUtil';
import ListTitle from './pages/ListTitle';

function App() {
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

    const EmptyList = lazy(() => import("@/components/EmptyList"))
    const EmptyDetail = lazy(() => import("@/components/EmptyDetail"))
    const Meditation = lazy(() => import('@/components/Meditation'));
    const Step = lazy(() => import('./components/Step'));
    const ClassicNav = lazy(() => import('@/components/ClassicNav'));

    const routes = [
        { path: '/', Element: Home },
        { path: '/search/:query?', Element: VboxSearch },
        { path: '/vsearch/:keywords?', Element: ProxySearch },
        { path: '/list', Element: ListTitle },
        { path: '/donate', Element: Donate },
        { path: '/About', Element: About },
        { path: '/video/:id', Element: VideoBox },
        { path: '/tag/:value?', Element: ClassicNav },
        { path: '/meditation/:value?', Element: Meditation },
        { path: '/emptiness', Element: EmptyList },
        { path: '/emptiness/:title?', Element: EmptyDetail },
        { path: '/step/:value?', Element: Step },
        { path: '/cc202cb962', Element: UserStat },
        { path: '*', Element: NotFound },
    ]
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary fallback={<>出错了，请 <Button startIcon={<RefreshIcon />} onClick={() => location.reload()} >刷新</Button> 或返回<Link href="/"> 主页</Link> </>}>
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
