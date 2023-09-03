import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GitHub } from "@mui/icons-material";


export default function Footer() {
    return (
        <footer>
            <Container maxWidth="md" sx={{ textAlign: 'center', mt: '135px' }}>
                <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center">
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                        © ningway.eu.org 2023 &nbsp;
                    </Typography>
                    <Box>
                        <GitHub fontSize={'small'} onClick={() => window.open("https://github.com/nanqic/ningway.git")} />
                    </Box>
                </Box>
            </Container>
        </footer>
    );
}
