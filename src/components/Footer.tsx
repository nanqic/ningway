import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Suspense, lazy, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const Comment = lazy(() => import('@/components/Comment'))

export default function Footer() {
    const [showComment, setShowComment] = useState(false);

    return (
        <footer>
            {
                <Box marginTop={10}>
                    <Suspense fallback={"Loading ..."}>
                        {!showComment && <Button onClick={() => setShowComment(true)} startIcon={<MoreHorizIcon />}>点击加载评论</Button>}
                        {showComment && <Comment />}
                    </Suspense>
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
