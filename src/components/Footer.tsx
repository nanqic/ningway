import { FormControlLabel, Link, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import { Suspense, lazy, useState } from "react";
import { useLocation } from "react-router-dom";
const Comment = lazy(() => import('@/components/Comment'))

export default function Footer() {
    const [showComment, setShowComment] = useState(localStorage.getItem('showComment') === 'true');
    const location = useLocation()
    const excludePath = /(\/v?search|\/$)/

    return (
        <Box component={'footer'} sx={{ marginBottom: { xs: '4rem', md: 2 } }}>
            {!excludePath.test(location.pathname) &&
                <Box marginTop={5} textAlign={"center"}>
                    {new Date().getDate() < 4 ?
                        <>
                            <Link href='https://jinshuju.net/f/hQVjL2'>✉️问题反馈</Link>
                            <Link href='/about'> 📩查看回复</Link>
                            <Link href='/donate'> ❤️捐赠支持</Link>
                            <br />
                        </> :
                        ''
                    }
                    <br />
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
        </Box>
    );
}
