import { Outlet, Route, Routes } from 'react-router-dom'
import SearchAppBar from "@/components/SearchAppBar";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import ScrollTop from "@/components/ScrollTop";
import { theme } from "@/utils/configUtil";
import EmptyList from "@/pages/Emptiness/EmptyList";
import EmptyDetail from "@/pages/Emptiness/EmptyDetail";
import VboxSearch from '@/pages/search/VboxSearch';
import Meditation from '@/pages/zen/Meditation';
import Home from '@/pages/home/Home';
import Help from '@/pages/help/Help';
import Step from './pages/step/Step';
import About from './pages/home/About';
import ProxySearch from './pages/search/ProxySearch';


function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ p: 0 }}>
                <CssBaseline />
                <SearchAppBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/step' element={<Step />} />
                    <Route path='/step/:value' element={<Step />} />
                    <Route path='/emptiness' element={<EmptyList />} />
                    <Route path='/emptiness/:title' element={<EmptyDetail />} />
                    <Route path='/search/' element={<VboxSearch />} />
                    <Route path='/vsearch/' element={<ProxySearch />} />
                    <Route path='/vsearch/:keywords' element={<ProxySearch />} />
                    <Route path='/meditation' element={<Meditation />} />
                    <Route path='/meditation/:value' element={<Meditation />} />
                    <Route path='/help' element={<Help />} />
                    <Route path='/about' element={<About />} />
                </Routes>
                <Outlet />
                <ScrollTop />
            </Container>
        </ThemeProvider>
    )
}

export default App
