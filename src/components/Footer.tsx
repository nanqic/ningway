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
                    <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center">
                        <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                        </Typography>
                    </Box>
                </Container>}
        </footer>
    );
}
