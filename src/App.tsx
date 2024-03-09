import { Outlet, Route, Routes } from 'react-router-dom'
import SearchAppBar from "@/components/SearchAppBar";
import { Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import ScrollTop from "@/components/ScrollTop";
import { Suspense, useEffect, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Home from '@/pages/home/Home';
import Donate from '@/components/Donate';
import VboxSearch from './pages/search/VboxSearch';
import { blue, green } from '@mui/material/colors';
import Footer from './components/Footer';
import Redirect from "@/pages/home/Redirect"
import EmptyList from "@/pages/Emptiness/EmptyList"
import EmptyDetail from "@/pages/Emptiness/EmptyDetail"
import Help from '@/pages/home/Help'
import ProxySearch from './pages/search/ProxySearch'
import CacheList from './pages/search/CacheList';
import Cache from './pages/search/Cache';
import NotFound from './components/NotFound';
import { getCachedSearch } from './utils/dbUtil';
import UserStat from './components/UserStat';
import Meditation from '@/pages/home/Meditation';
import Step from './pages/home/Step';
import Tool from '@/pages/tool/Index';
import About from '@/pages/home/About'
import VideoBox from "@/pages/home/VideoBox"

function App() {
    useEffect(() => {
        if (location.hostname === 'ningway.pages.dev') { location.replace('https://m.ningway.com' + location.pathname) }

        let timer = setTimeout(() => {
            // 每周跳转关于页一次
            if (document.cookie.replace(/(?:(?:^|.*;\s*)ToAbout0309\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
                location.replace('/about')
                document.cookie = "ToAbout0309=true; max-age="
                    + 60 * 60 * 24 * 7;
            }

            if (!sessionStorage.getItem("isReload")) {
                sessionStorage.setItem("isReload", "true")
                getCachedSearch()
                console.info("页面首次加载，同步缓存数据");
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
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary fallback={<>出错了，返回<a href="/">主页</a> </>}>
                <CssBaseline />
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <SearchAppBar />
                </Container>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/donate' element={<Donate />} />
                        <Route path='/suixi' element={<Donate />} />
                        <Route path='/video/:id' element={<Suspense fallback={'loading'}><VideoBox /></Suspense>} />
                        <Route path='/tool/:value?' element={<Suspense fallback={'loading'}><Tool /></Suspense>} />
                        <Route path='/301/:code' element={<Redirect />} />
                        <Route path='/step/:value?' element={<Suspense fallback={'loading'}><Step /></Suspense>} />
                        <Route path='/emptiness' element={<Suspense fallback={'loading'}><EmptyList /></Suspense>} />
                        <Route path='/emptiness/:title?' element={<Suspense fallback={'loading'}><EmptyDetail /></Suspense>} />
                        <Route path='/search/:query?' element={<Suspense fallback={'loading'}><VboxSearch /></Suspense>} />
                        <Route path='/vsearch/:keywords?' element={<Suspense fallback={'loading'}><ProxySearch /></Suspense>} />
                        <Route path='/cache/:keywords' element={<Suspense fallback={'loading'}><Cache /></Suspense>} />
                        <Route path='/caches/:keywords' element={<Suspense fallback={'loading'}><CacheList /></Suspense>} />
                        <Route path='/meditation/:value?' element={<Suspense fallback={'loading'}><Meditation /></Suspense>} />
                        <Route path='/help' element={<Suspense fallback={'loading'}><Help /></Suspense>} />
                        <Route path='/about' element={<Suspense fallback={'loading'}><About /></Suspense>} />
                        <Route path="/202cb962" element={<UserStat />} />
                        <Route path="/cc202cb962" element={<UserStat />} />
                        <Route path="*" element={<NotFound />} /> {/* 所有未匹配路由都重定向到404页面 */}
                    </Routes>
                    <Outlet />
                </Container>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    {/* <Footer /> */}
                    <ScrollTop />
                </Container>
            </ErrorBoundary>
        </ThemeProvider>
    )
}

export default App
