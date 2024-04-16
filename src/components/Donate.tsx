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
            <Box component='ol' margin='0 auto' maxWidth='fit-content'>
                <i>提示：为了更好地为您服务，请在支付时备注</i>
                <li>留言时用的昵称或法名</li>
                <li>您所在的城市</li>
                <li>您使用的网络运营商（移动、电信等）</li>
            </Box>
            <Typography textAlign={"center"} sx={{ mt: 5 }} variant="subtitle2">
                愿访此网人，悉发菩提心。
            </Typography>
        </>
    )
}
