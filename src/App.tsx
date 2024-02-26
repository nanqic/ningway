import { Outlet, Route, Routes } from 'react-router-dom'
import SearchAppBar from "@/components/SearchAppBar";
import { Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import ScrollTop from "@/components/ScrollTop";
import { lazy, Suspense, useEffect, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Home from '@/pages/home/Home';
import VboxSearch from './pages/search/VboxSearch';
import { blue, green } from '@mui/material/colors';
import Footer from './components/Footer';

const Redirect = lazy(() => import("@/pages/home/Redirect"));
const VideoBox = lazy(() => import("@/pages/home/VideoBox"));
const EmptyList = lazy(() => import("@/pages/Emptiness/EmptyList"));
const EmptyDetail = lazy(() => import("@/pages/Emptiness/EmptyDetail"));
const Meditation = lazy(() => import('@/pages/home/Meditation'));
const Help = lazy(() => import('@/pages/home/Help'));
const Step = lazy(() => import('./pages/home/Step'));
const ProxySearch = lazy(() => import('./pages/search/ProxySearch'));
const About = lazy(() => import('@/pages/home/About'));

function App() {
    useEffect(() => {
        if (location.hostname === 'ningway.pages.dev') { location.replace('https://m.ningway.com' + location.pathname) }

        // let timer = setTimeout(() => {
        //     const readme = localStorage.getItem(import.meta.env.VITE_README)
        //     if (readme == undefined) location.replace('/about')
        //     localStorage.setItem(import.meta.env.VITE_README, 'true')
        // }, 1000 * 3)

        // return () => clearTimeout(timer)
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
                        <Route path='/video/:id' element={<Suspense fallback={'loading'}><VideoBox /></Suspense>} />
                        <Route path='/301/:code' element={<Redirect />} />
                        <Route path='/step/:value?' element={<Suspense fallback={'loading'}><Step /></Suspense>} />
                        <Route path='/emptiness' element={<Suspense fallback={'loading'}><EmptyList /></Suspense>} />
                        <Route path='/emptiness/:title?' element={<Suspense fallback={'loading'}><EmptyDetail /></Suspense>} />
                        <Route path='/search/:query?' element={<Suspense fallback={'loading'}><VboxSearch /></Suspense>} />
                        <Route path='/vsearch/:keywords' element={<Suspense fallback={'loading'}><ProxySearch /></Suspense>} />
                        <Route path='/meditation/:value?' element={<Suspense fallback={'loading'}><Meditation /></Suspense>} />
                        <Route path='/help' element={<Suspense fallback={'loading'}><Help /></Suspense>} />
                        <Route path='/about' element={<Suspense fallback={'loading'}><About /></Suspense>} />
                    </Routes>
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
