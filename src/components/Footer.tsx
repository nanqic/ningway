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
                    <Link href='https://jinshuju.net/f/Vy3DGV'>📖宁路功能需求问卷</Link>
                    <Link href='/about'> 📩查看回复</Link>
                    <br/>
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
                </Box>}
        </footer >
    );
}
