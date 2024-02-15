import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function Footer() {
    return (
        <footer>
            <Container maxWidth="md" sx={{ textAlign: 'center', mt: '135px' }}>
                <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center">
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                    </Typography>
                </Box>
            </Container>
        </footer>
    );
}
