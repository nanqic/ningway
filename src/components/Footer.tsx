import { FormControlLabel, Link, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Suspense, lazy, useState } from "react";
import { useLocation } from "react-router-dom";
const Comment = lazy(() => import('@/components/Comment'))

export default function Footer() {
    const [showComment, setShowComment] = useState(localStorage.getItem('showComment') === 'true');
    const location = useLocation()
    const excludePath = /(\/v?search|\/$)/

    return (
        <footer>
            {!excludePath.test(location.pathname) &&
                <Box marginTop={5} textAlign={"center"}>
                    <Link href='https://jinshuju.net/f/Vy3DGV'>📖宁路功能需求问卷（建议填写）</Link>
                    <Suspense fallback={"Loading ..."}>
                        <FormControlLabel
                            control={<Switch checked={showComment}
                                onChange={() => {
                                    localStorage.setItem('showComment', !showComment + '')
                                    setShowComment((prev) => !prev)
                                }} />}
                            label="显示留言"
                        />
                        {showComment && <Comment />}
                    </Suspense>
                    {/* <Box
                        sx={{ opacity: 0, cursor: "progress" }}
                        //@ts-ignore 2024/2/25/ 9:40 pm pv: 14188   uv: 5579
                        //@ts-ignore 2024/5/30/ 8：26 pm pv: 156352   uv: 51585
                        onDoubleClick={e => e.target.style.opacity = 1}
                    >
                        <Typography
                            color="textSecondary"
                            variant="caption"
                            marginBottom={3}
                        >
                            <span id="busuanzi_container_page_pv">
                                本页访问 <span id="busuanzi_value_page_pv" /> 次
                            </span>
                        </Typography>
                    </Box> */}
                </Box>}
        </footer >
    );
}
