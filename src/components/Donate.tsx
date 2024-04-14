import { getPlaystatSize, getVsearchCount } from '@/utils/dbUtil'
import { Box, Button, Typography } from '@mui/material'
import NotFound from './NotFound'
import { DisplayQR } from './DisplayQR'

export default function Donate() {
    const total = getVsearchCount()?.total || getPlaystatSize()

    if (total < 3) {
        return <NotFound />
    }

    return (
        <>
            <Box display={"flex"} alignItems={"center"}>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={() => history.go(-1)}> 返回</Button>
                前一个页面
            </Box>
            <Typography textAlign={"center"} margin={1} variant="h5">
                勤劳如山王，不如积微福。<br />
            </Typography>
            <DisplayQR name='微信/支付宝' url="/images/donate-ua.png" />
            <Typography textAlign={"center"} sx={{ mt: 2 }} variant="subtitle2">
                我们能使用网站，来自老师和师兄们的布施<p />
                愿浏览过此网站的人都能发起殊胜菩提心<br />
            </Typography>
        </>
    )
}
