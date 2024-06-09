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
    const adList = [
        { text: '今生修行的重点与归宿', url: 'https://box.hdcxb.net/其他资料/a/sound/前行/今生修行的重點和歸宿' },
        { text: '正法念处经', url: 'https://box.hdcxb.net/其他资料/a/sound/前行/《正法念處經》' },
        { text: '了凡四训', url: 'https://box.hdcxb.net/其他资料/a/sound/了凡四訓' },
        { text: '思维无常 公案', url: 'https://box.hdcxb.net/其他资料/a/sound/前行/思维无常-公案' },
        { text: '有声书App', url: 'https://a.hdcxb.net/login2' },
    ]
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
                        </> :
                        <MyAds ads={adList} />
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
