import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
<script type="module">
    import init from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
</script>
export default function Footer() {

    return (
        <footer>
            {
                <Box id="waline" marginTop={10}>
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
