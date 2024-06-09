import { FormControlLabel, Link, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import { Suspense, lazy, useState } from "react";
import { useLocation } from "react-router-dom";
import MyAds from "./MyAds";
const Comment = lazy(() => import('@/components/Comment'))

export default function Footer() {
    const [showComment, setShowComment] = useState(localStorage.getItem('showComment') === 'true');
    const location = useLocation()
    const excludePath = /(\/v?search|\/$)/

    return (
        <footer style={{marginBottom: '5rem'}}>
            {!excludePath.test(location.pathname) &&
                <Box marginTop={5} textAlign={"center"}>
                    { new Date().getDate() < 4 ?
                        <>
                            <Link href='https://jinshuju.net/f/hQVjL2'>✉️问题反馈</Link>
                            <Link href='/about'> 📩查看回复</Link>
                            <Link href='/donate'> ❤️捐赠支持</Link>
                            <br />
                        </> :''
                        // <MyAds />
                    }
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
