import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Waline from "./Waline";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    return (
        <footer>
            {!location.pathname.includes('/vsearch') &&
                <Container maxWidth="md" sx={{ textAlign: 'center', mt: '135px' }}>
                    <Waline />
                    <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center"
                        sx={{ opacity: 0 }}
                        //@ts-ignore 2024/2/24/ 9:20 pm
                        onDoubleClick={e => e.target.style.opacity = 1}
                    >
                        <Typography color="textSecondary"
                            variant="caption"
                        >
                            <span id="busuanzi_container_page_pv">
                                本文总阅读量<span id="busuanzi_value_page_pv"></span>次
                            </span>
                        </Typography>
                    </Box>
                </Container>}
        </footer>
    );
}
