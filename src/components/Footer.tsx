import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Waline from "./Waline";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    return (
        <footer>
            {
                <Box marginTop={10}>
                    <Waline />
                    <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center"
                        sx={{ opacity: 0 }}
                        //@ts-ignore 2024/2/25/ 9:40 pm pv: 14188   uv: 5579
                        onDoubleClick={e => e.target.style.opacity = 1}
                    >
                        <Typography color="textSecondary"
                            variant="caption"
                            marginBottom={3}
                        >
                            <span id="busuanzi_container_page_pv">
                                本页访问 <span id="busuanzi_value_page_pv" /> 次
                            </span>
                        </Typography>
                    </Box>
                </Box>}
        </footer>
    );
}
