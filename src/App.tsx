import { Outlet, Route, Routes } from 'react-router-dom'
import SearchAppBar from "@/components/SearchAppBar";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import ScrollTop from "@/components/ScrollTop";
import { theme } from "@/utils/configUtil";
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Home from '@/pages/home/Home';

const EmptyList = lazy(() => import("@/pages/Emptiness/EmptyList"));
const EmptyDetail = lazy(() => import("@/pages/Emptiness/EmptyDetail"));
const VboxSearch = lazy(() => import('@/pages/search/VboxSearch'));
const Meditation = lazy(() => import('@/pages/home/Meditation'));
const Help = lazy(() => import('@/pages/home/Help'));
const Step = lazy(() => import('./pages/home/Step'));
const ProxySearch = lazy(() => import('./pages/search/ProxySearch'));
const About = lazy(() => import('@/pages/home/About'));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ p: 0 }}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <CssBaseline />
                    <SearchAppBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/step' element={<Suspense fallback={'loading'}><Step /></Suspense>} />
                        <Route path='/step/:value' element={<Suspense fallback={'loading'}><Step /></Suspense>} />
                        <Route path='/emptiness' element={<Suspense fallback={'loading'}><EmptyList /></Suspense>} />
                        <Route path='/emptiness/:title' element={<Suspense fallback={'loading'}><EmptyDetail /></Suspense>} />
                        <Route path='/search/' element={<Suspense fallback={'loading'}><VboxSearch /></Suspense>} />
                        <Route path='/vsearch/' element={<Suspense fallback={'loading'}><ProxySearch /></Suspense>} />
                        <Route path='/vsearch/:keywords' element={<Suspense fallback={'loading'}><ProxySearch /></Suspense>} />
                        <Route path='/meditation' element={<Suspense fallback={'loading'}><Meditation /></Suspense>} />
                        <Route path='/meditation/:value' element={<Suspense fallback={'loading'}><Meditation /></Suspense>} />
                        <Route path='/help' element={<Suspense fallback={'loading'}><Help /></Suspense>} />
                        <Route path='/about' element={<Suspense fallback={'loading'}><About /></Suspense>} />
                    </Routes>
                    <Outlet />
                    <ScrollTop />
                </ErrorBoundary>
            </Container>
        </ThemeProvider>
    )
}

export default App
