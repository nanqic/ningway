import { Container, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GitHub } from "@mui/icons-material";
import Countdown, { CountdownRenderProps } from "react-countdown";


export default function Footer() {
    const renderer = ({days, hours, minutes}:CountdownRenderProps) => { 
        return <Typography variant="overline">距离本站关闭有 <i>{days}天{hours}小时 {minutes}分</i></Typography>
    }
    return (
        <footer>
            <Container maxWidth="md" sx={{ textAlign: 'center' ,mt:'135px'}}>
                <Box display="flex"  flexWrap="wrap" alignItems="center" justifyContent="center">
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                    © ningway.eu.org 2023 &nbsp;
                    </Typography>
                    <Box>
                        <Tooltip title="Open source">
                        <GitHub fontSize={'small'} onClick={() => window.open("https://github.com/nanqic/ningway.git")}/>
                        </Tooltip>
                    </Box>
                </Box>
                <Countdown renderer={renderer} date={"2024-03-09"}/>
            </Container>
        </footer>
    );
}
