import { getVsearchCount } from '@/utils/dbUtil'
import { Box, Button, Link, Typography } from '@mui/material'
import NotFound from './NotFound'

export default function Donate() {
    localStorage.setItem("visit_date", new Date().getDate() + "_visit")
    const count: number = (getVsearchCount()?.total) || 10
    if (count < 7) {
        return <NotFound />
    }

    return (
        <>
            <Box display={"flex"} alignItems={"center"}>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={() => history.go(-1)}> 返回</Button>
                上一个页面
            </Box>
            <Typography variant='h5' textAlign={"center"}>本站已帮您搜索关键字{count}次</Typography>
            <Typography textAlign={"center"} margin={1} variant="h6">
                内容来自老师的布施和师兄们的整理<br />
                因维护搜索功能、积累功德开放了打赏<br />
                参考 <Link href="/video/PTEwNTcw?t=10">10570
                    《不要拜金了》</Link><br />
            </Typography>
            <Box sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-evenly",

            }}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <span>微信支付</span>
                    <img src="/images/wechatpay.jpg" alt="wechatpay" height={120} />
                    <p>善愿心</p>
                    <Button variant="contained" color="inherit">
                        <Link underline="none" href="/images/wechatpay.jpg" download="wechatpay.jpg">保存二维码</Link>
                    </Button>
                    <Button sx={{ mt: 2 }} variant="contained" color="success">
                        微信扫一扫
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <span>支付宝（荐）</span>
                    <img src="/images/alipay.jpg" alt="alipay" height={120} />
                    <p>善愿心</p>
                    <Button variant="contained" color="inherit">
                        <Link underline="none" href="/images/alipay.jpg" download="alipay.jpg">保存二维码</Link>
                    </Button>
                    <Button variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => {
                            let open_url = "alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx11682leyfqxykxltho4c"
                            if (open_url) open_url && location.assign(open_url)
                        }}
                        color="info">
                        打开支付宝
                    </Button>
                    <Button onClick={() => alert('PayPal捐赠请联系邮箱')}> PayPal</Button>
                </Box>
            </Box>
            <Typography textAlign={"center"} sx={{ mt: 2 }} variant="subtitle2">
                自己能用搜索时，会想办法让大家也能用，平等共享给需要的人<br />
                本站免费使用，为避免新师兄误会，多次使用搜索才会展示打赏
            </Typography>
        </>
    )
}
